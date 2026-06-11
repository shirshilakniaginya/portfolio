(function () {
  var canvas = document.getElementById('shader-bg');
  if (!canvas) return;

  canvas.style.opacity = '0';
  canvas.style.transition = 'opacity 0.35s ease';

  var gl = canvas.getContext('webgl', {
    alpha: false, antialias: false, depth: false, stencil: false,
    preserveDrawingBuffer: false, powerPreference: 'low-power'
  });
  if (!gl) return;

  var SCROLL_FACTOR = 0.16; // background moves at 16% of scroll speed
  var BAKE_SCALE = 0.5;     // smoke texture resolution vs canvas px; smoke is soft, 0.5 is invisible
  var BAKE_MARGIN = 256;    // extra baked page-px so mobile URL-bar viewport changes don't rebake

  var vertexSource = [
    'attribute vec2 a_position;',
    'void main() {',
    '  gl_Position = vec4(a_position, 0.0, 1.0);',
    '}'
  ].join('\n');

  // Heavy pass: procedural smoke in page space, rendered ONCE into a texture.
  var bakeFragSource = [
    'precision highp float;',
    'uniform vec2 uTexRes;',
    'uniform float uBakeH;',
    'uniform float uVw;',
    'uniform float uPageH;',

    'float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}',
    'float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);',
    '  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}',
    'float fbm(vec2 p){float v=0.,a=.52;mat2 r=mat2(.82,-.57,.57,.82);',
    '  for(int i=0;i<5;i++){v+=noise(p)*a;p=r*p*2.04+19.17;a*=.52;}return v;}',
    'float ridged(vec2 p){float n=fbm(p);return 1.-abs(n*2.-1.);}',
    'float smoke(vec2 p){',
    '  vec2 wA=vec2(fbm(p*1.15+vec2(3.7,8.1)),fbm(p*1.1+vec2(9.2,2.4)));',
    '  vec2 wB=vec2(ridged(p*1.8+wA*2.+vec2(5,1)),fbm(p*1.55+wA*1.7+vec2(1,6)));',
    '  p+=(wA-.5)*1.45+(wB-.5)*.92;',
    '  float d=fbm(p*1.1)*.56+ridged(p*2.3+wB*.8)*.32+fbm(p*4.4+wA*1.2)*.12;',
    '  d=smoothstep(.3,.82,d);',
    '  return d*smoothstep(.18,.68,fbm(p*1.7+vec2(12.5,4.1)));}',
    'float accent(vec2 q,float ph_w,vec2 c,float k){',
    '  vec2 cv=vec2(c.x,c.y*ph_w);return exp(-length((q-cv)*vec2(1.,.78))*k);}',

    'void main(){',
    '  float xn=gl_FragCoord.x/uTexRes.x;',
    '  float pageY=(1.-gl_FragCoord.y/uTexRes.y)*uBakeH;',
    '  vec2 pageUv=vec2(xn,pageY/uPageH);',
    '  float ph_w=uPageH/uVw;',
    '  vec2 q=vec2(xn,pageY/uVw);',
    '  vec3 base=mix(vec3(0.,.018,.016),vec3(.004,.095,.079),smoothstep(0.,1.,pageUv.y));',
    '  float sd=clamp(smoke(q*1.35)*.62+smoke(q*.76+vec2(5.,1.5))*.38,0.,.78);',
    '  float red=clamp(',
    '    accent(q,ph_w,vec2(.80,.10),5.5)+',
    '    accent(q,ph_w,vec2(.20,.38),5.5)+',
    '    accent(q,ph_w,vec2(.82,.72),5.0)+',
    '    accent(q,ph_w,vec2(.52,.93),5.0),0.,1.);',
    '  vec3 sg=mix(vec3(.05,.175,.15),vec3(.06,.14,.19),pageUv.y);',
    '  vec3 col=base;',
    '  col=mix(col,mix(sg,vec3(.45,.03,.018),red*.85),sd*.55);',
    '  col+=vec3(.40,.015,.008)*red*.20;',
    '  col-=smoothstep(.55,1.,abs(xn-.5)*2.)*vec3(.045,.052,.05);',
    '  gl_FragColor=vec4(clamp(col,0.,1.),1.);',
    '}'
  ].join('\n');

  // Cheap pass: one texture sample + dither per pixel, runs on scroll/resize.
  var displayFragSource = [
    'precision mediump float;',
    'uniform sampler2D uTex;',
    'uniform vec2 uRes;',
    'uniform float uSy;',
    'uniform float uBakeH;',
    'float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}',
    'void main(){',
    '  float pageY=uSy+(uRes.y-gl_FragCoord.y);',
    '  vec2 uv=vec2(gl_FragCoord.x/uRes.x,1.-pageY/uBakeH);',
    '  vec3 col=texture2D(uTex,uv).rgb;',
    '  col+=(hash(gl_FragCoord.xy)-.5)*.012;',
    '  gl_FragColor=vec4(col,1.);',
    '}'
  ].join('\n');

  function makeProgram(vsSrc, fsSrc) {
    var vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vsSrc); gl.compileShader(vs);
    var fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fsSrc); gl.compileShader(fs);
    var p = gl.createProgram();
    gl.attachShader(p, vs); gl.attachShader(p, fs);
    gl.bindAttribLocation(p, 0, 'a_position');
    gl.linkProgram(p);
    return p;
  }

  var bakeProg = makeProgram(vertexSource, bakeFragSource);
  var dispProg = makeProgram(vertexSource, displayFragSource);

  var uBake = {
    texRes: gl.getUniformLocation(bakeProg, 'uTexRes'),
    bakeH:  gl.getUniformLocation(bakeProg, 'uBakeH'),
    vw:     gl.getUniformLocation(bakeProg, 'uVw'),
    pageH:  gl.getUniformLocation(bakeProg, 'uPageH')
  };
  var uDisp = {
    tex:   gl.getUniformLocation(dispProg, 'uTex'),
    res:   gl.getUniformLocation(dispProg, 'uRes'),
    sy:    gl.getUniformLocation(dispProg, 'uSy'),
    bakeH: gl.getUniformLocation(dispProg, 'uBakeH')
  };

  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  var tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  var fbo = gl.createFramebuffer();

  var baked = { vw: 0, pageH: 0, bakeH: 0 };

  function pageH() {
    return Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, window.innerHeight);
  }

  function bake(vw, vh, ph) {
    var bakeH = Math.ceil(vh + SCROLL_FACTOR * (ph - vh) + BAKE_MARGIN);
    var maxTex = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    var texW = Math.min(maxTex, Math.max(1, Math.round(vw * BAKE_SCALE)));
    var texH = Math.min(maxTex, Math.max(1, Math.round(bakeH * BAKE_SCALE)));
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texW, texH, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.viewport(0, 0, texW, texH);
    gl.useProgram(bakeProg);
    gl.uniform2f(uBake.texRes, texW, texH);
    gl.uniform1f(uBake.bakeH, bakeH);
    gl.uniform1f(uBake.vw, vw);
    gl.uniform1f(uBake.pageH, ph);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    baked = { vw: vw, pageH: ph, bakeH: bakeH };
  }

  function render() {
    var dpr = Math.min(window.devicePixelRatio || 1, 1);
    var vw = Math.max(1, Math.floor(window.innerWidth * dpr));
    var vh = Math.max(1, Math.floor(window.innerHeight * dpr));
    if (canvas.width !== vw || canvas.height !== vh) { canvas.width = vw; canvas.height = vh; }
    var ph = Math.max(vh, Math.floor(pageH() * dpr));
    var needH = vh + SCROLL_FACTOR * (ph - vh);
    if (!baked.bakeH || baked.vw !== vw || needH > baked.bakeH ||
        Math.abs(ph - baked.pageH) > baked.pageH * 0.02) {
      bake(vw, vh, ph);
    }
    var sy = (window.scrollY || 0) * dpr * SCROLL_FACTOR;
    gl.viewport(0, 0, vw, vh);
    gl.useProgram(dispProg);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.uniform1i(uDisp.tex, 0);
    gl.uniform2f(uDisp.res, vw, vh);
    gl.uniform1f(uDisp.sy, sy);
    gl.uniform1f(uDisp.bakeH, baked.bakeH);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  var ticking = false;
  function tick() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () { ticking = false; render(); });
  }

  function onReady() {
    if (!gl.getProgramParameter(bakeProg, gl.LINK_STATUS)) { console.error(gl.getProgramInfoLog(bakeProg)); return; }
    if (!gl.getProgramParameter(dispProg, gl.LINK_STATUS)) { console.error(gl.getProgramInfoLog(dispProg)); return; }
    render();
    canvas.style.opacity = '1';
    window.dispatchEvent(new CustomEvent('noxa:shader-ready'));
    window.addEventListener('scroll', tick, { passive: true });
    window.addEventListener('resize', tick);
    window.addEventListener('load', tick);
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) tick();
    });
  }

  var ext = gl.getExtension('KHR_parallel_shader_compile');
  if (ext) {
    (function poll() {
      if (!gl.getProgramParameter(bakeProg, ext.COMPLETION_STATUS_KHR) ||
          !gl.getProgramParameter(dispProg, ext.COMPLETION_STATUS_KHR)) return requestAnimationFrame(poll);
      onReady();
    })();
  } else {
    setTimeout(onReady, 0);
  }
})();

