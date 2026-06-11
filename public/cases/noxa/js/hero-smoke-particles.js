(function () {
  var canvas = document.getElementById('hero-smoke-particles');
  if (!canvas) return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduceMotion && reduceMotion.matches) return;

  var isMobileViewport = window.matchMedia && window.matchMedia('(max-width: 820px)').matches;
  var isCoarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  var saveData = !!(connection && connection.saveData);
  var lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4;
  var lowCpu = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;
  if (isMobileViewport || isCoarsePointer || saveData || lowMemory || lowCpu) {
    canvas.style.display = 'none';
    return;
  }

  var hero = canvas.closest('.hero');
  var gl = canvas.getContext('webgl', {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    preserveDrawingBuffer: false,
    powerPreference: 'low-power'
  });
  if (!gl || !hero) return;

  var vertexSource = [
    'attribute vec2 a_corner;',
    'attribute vec2 a_center;',
    'attribute float a_size;',
    'attribute float a_rotation;',
    'attribute float a_alpha;',
    'attribute float a_seed;',
    'attribute vec3 a_color;',
    'uniform float u_aspect;',
    'varying vec2 v_uv;',
    'varying float v_alpha;',
    'varying float v_seed;',
    'varying vec3 v_color;',
    'void main(){',
    '  float s=sin(a_rotation), c=cos(a_rotation);',
    '  vec2 q=vec2(a_corner.x*c-a_corner.y*s,a_corner.x*s+a_corner.y*c);',
    '  vec2 pos=a_center+vec2(q.x*a_size/u_aspect,q.y*a_size);',
    '  gl_Position=vec4(pos,0.,1.);',
    '  v_uv=a_corner*.5+.5;',
    '  v_alpha=a_alpha;',
    '  v_seed=a_seed;',
    '  v_color=a_color;',
    '}'
  ].join('\n');

  var fragmentSource = [
    'precision mediump float;',
    'uniform float u_time;',
    'varying vec2 v_uv;',
    'varying float v_alpha;',
    'varying float v_seed;',
    'varying vec3 v_color;',
    'float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}',
    'float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}',
    'float fbm(vec2 p){float v=0.,a=.55;mat2 r=mat2(.8,-.6,.6,.8);for(int i=0;i<3;i++){v+=noise(p)*a;p=r*p*2.03+11.7;a*=.52;}return v;}',
    'void main(){',
    '  vec2 p=v_uv-.5;',
    '  float r=length(p)*2.;',
    '  float body=smoothstep(1.05,.18,r)*smoothstep(1.,.58,r);',
    '  vec2 q=v_uv*3.2;',
    '  q.x+=sin(v_uv.y*6.+v_seed*8.+u_time*.06)*.28;',
    '  q.y+=cos(v_uv.x*5.+v_seed*6.-u_time*.05)*.22;',
    '  float d=fbm(q+vec2(v_seed*13.,u_time*.025))*.66+fbm(q*2.0+vec2(-u_time*.02,v_seed*17.))*.34;',
    '  d=smoothstep(.24,.7,d);',
    '  float holes=smoothstep(.12,.66,fbm(q*1.25+vec2(v_seed*4.,u_time*.018)));',
    '  float a=body*d*holes*v_alpha*1.45;',
    '  if(a<.005) discard;',
    '  gl_FragColor=vec4(v_color+d*.12,a);',
    '}'
  ].join('\n');

  function compile(type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  var vs = compile(gl.VERTEX_SHADER, vertexSource);
  var fs = compile(gl.FRAGMENT_SHADER, fragmentSource);
  if (!vs || !fs) return;

  var program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    return;
  }

  var loc = {
    corner: gl.getAttribLocation(program, 'a_corner'),
    center: gl.getAttribLocation(program, 'a_center'),
    size: gl.getAttribLocation(program, 'a_size'),
    rotation: gl.getAttribLocation(program, 'a_rotation'),
    alpha: gl.getAttribLocation(program, 'a_alpha'),
    seed: gl.getAttribLocation(program, 'a_seed'),
    color: gl.getAttribLocation(program, 'a_color'),
    aspect: gl.getUniformLocation(program, 'u_aspect'),
    time: gl.getUniformLocation(program, 'u_time')
  };

  var isMobile = window.matchMedia && window.matchMedia('(max-width: 820px)').matches;
  var PARTICLES = isMobile ? 18 : 22;
  var VERTICES = 6;
  var FLOATS = 11;
  var data = new Float32Array(PARTICLES * VERTICES * FLOATS);
  var buffer = gl.createBuffer();
  var particles = [];
  var corners = [[-1,-1],[1,-1],[-1,1],[-1,1],[1,-1],[1,1]];
  var running = true;
  var raf = 0;
  var last = performance.now();
  var start = last;

  function rand(min, max) { return min + Math.random() * (max - min); }

  function reset(p, initial) {
    var lane = Math.random();
    if (lane < .46) {
      p.x = rand(-.15, .58);
      p.y = initial ? rand(-.78, .72) : rand(-1.12, -.94);
      p.size = rand(.32, .68);
      p.vx = rand(.004, .018);
      p.vy = rand(.004, .015);
      p.alpha = rand(.04, .09);
      p.color = [rand(.12,.22), rand(.34,.5), rand(.42,.6)];
    } else {
      p.x = rand(.48, 1.18);
      p.y = initial ? rand(-.86, .68) : rand(-1.14, -.96);
      p.size = rand(.28, .6);
      p.vx = rand(-.014, -.002);
      p.vy = rand(.003, .012);
      p.alpha = rand(.035, .08);
      p.color = [rand(.62,.96), rand(.09,.2), rand(.06,.12)];
    }
    p.rotation = rand(0, Math.PI * 2);
    p.spin = rand(-.08, .08);
    p.seed = rand(0, 1000);
    p.phase = rand(0, Math.PI * 2);
  }

  for (var i = 0; i < PARTICLES; i++) {
    var p = {};
    reset(p, true);
    particles.push(p);
  }

  function resize() {
    var rect = hero.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 1);
    var w = Math.max(1, Math.floor(rect.width * dpr));
    var h = Math.max(1, Math.floor(rect.height * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
  }

  function fill(time) {
    var o = 0;
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      var waveX = Math.sin(time * .22 + p.phase) * .036;
      var waveY = Math.cos(time * .17 + p.phase * 1.7) * .03;
      var bottomFade = Math.min(1, Math.max(0, (p.y + 1.14) / .38));
      var topFade = 1 - Math.min(1, Math.max(0, (p.y - .62) / .7));
      var alpha = p.alpha * bottomFade * Math.max(0, topFade);
      for (var v = 0; v < VERTICES; v++) {
        var c = corners[v];
        data[o++] = c[0]; data[o++] = c[1];
        data[o++] = p.x + waveX; data[o++] = p.y + waveY;
        data[o++] = p.size; data[o++] = p.rotation; data[o++] = alpha; data[o++] = p.seed;
        data[o++] = p.color[0]; data[o++] = p.color[1]; data[o++] = p.color[2];
      }
    }
  }

  function bindAttributes() {
    var stride = FLOATS * 4;
    gl.enableVertexAttribArray(loc.corner);
    gl.vertexAttribPointer(loc.corner, 2, gl.FLOAT, false, stride, 0);
    gl.enableVertexAttribArray(loc.center);
    gl.vertexAttribPointer(loc.center, 2, gl.FLOAT, false, stride, 2 * 4);
    gl.enableVertexAttribArray(loc.size);
    gl.vertexAttribPointer(loc.size, 1, gl.FLOAT, false, stride, 4 * 4);
    gl.enableVertexAttribArray(loc.rotation);
    gl.vertexAttribPointer(loc.rotation, 1, gl.FLOAT, false, stride, 5 * 4);
    gl.enableVertexAttribArray(loc.alpha);
    gl.vertexAttribPointer(loc.alpha, 1, gl.FLOAT, false, stride, 6 * 4);
    gl.enableVertexAttribArray(loc.seed);
    gl.vertexAttribPointer(loc.seed, 1, gl.FLOAT, false, stride, 7 * 4);
    gl.enableVertexAttribArray(loc.color);
    gl.vertexAttribPointer(loc.color, 3, gl.FLOAT, false, stride, 8 * 4);
  }

  gl.useProgram(program);
  gl.disable(gl.DEPTH_TEST);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data.byteLength, gl.DYNAMIC_DRAW);
  bindAttributes();

  function draw(now) {
    if (!running) return;
    resize();
    var dt = Math.min(.05, (now - last) / 1000);
    last = now;
    var time = (now - start) / 1000;

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rotation += p.spin * dt;
      if (p.y - p.size > 1.22 || p.x - p.size > 1.45 || p.x + p.size < -1.45) reset(p, false);
    }

    fill(time);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(loc.aspect, canvas.width / canvas.height);
    gl.uniform1f(loc.time, time);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, data);
    gl.drawArrays(gl.TRIANGLES, 0, PARTICLES * VERTICES);
    raf = requestAnimationFrame(draw);
  }

  function startLoop() {
    if (running) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(draw);
  }

  function stopLoop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      if (entries[0] && entries[0].isIntersecting) startLoop(); else stopLoop();
    }, { threshold: 0.01 });
    observer.observe(hero);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();
  raf = requestAnimationFrame(draw);
})();

