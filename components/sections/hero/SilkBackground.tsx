"use client";

import { useEffect, useRef } from "react";

type SilkBackgroundProps = {
  className?: string;
  color?: `#${string}`;
  noiseIntensity?: number;
  rotation?: number;
  scale?: number;
  speed?: number;
};

const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;

  varying vec2 v_uv;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec3 u_color;
  uniform float u_noiseIntensity;
  uniform float u_rotation;
  uniform float u_scale;
  uniform float u_speed;

  mat2 rotate2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }

  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  void main() {
    vec2 centered = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    vec2 uv = rotate2d(u_rotation) * (centered * u_scale);
    float time = u_time * 0.001 * u_speed;

    vec2 flow = uv;
    flow.x += 0.14 * sin(flow.y * 4.6 + time * 0.72);
    flow.y += 0.1 * cos(flow.x * 3.4 - time * 0.45);

    float waveA = sin(8.0 * flow.x - time);
    float waveB = sin(5.0 * (flow.x + flow.y + cos(time + flow.x * 3.0 + flow.y * 2.2)));
    float waveC = sin(20.0 * (flow.x + flow.y - 0.1 * time));
    float weave = waveA * 0.52 + waveB * 0.32 + waveC * 0.1;

    float highlight = sin(length(flow * vec2(1.0, 1.4)) * 10.0 - time * 0.9) * 0.24;
    float sheen = sin((flow.x - flow.y) * 11.0 + time * 0.35) * 0.18;
    float grain = (hash(gl_FragCoord.xy + time) - 0.5) * (0.12 * u_noiseIntensity);

    float intensity = smoothstep(-1.1, 1.35, weave + highlight + sheen + grain);
    float rim = smoothstep(1.25, 0.18, length(uv + vec2(-0.08, 0.02)));

    vec3 shadow = u_color * 0.36;
    vec3 midtone = u_color * (0.68 + intensity * 0.32);
    vec3 specular = vec3(1.0) * pow(max(intensity, 0.0), 2.8) * 0.16;
    vec3 finalColor = mix(shadow, midtone, intensity) + specular * rim;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function hexToRgb(hex: `#${string}`) {
  const normalized = hex.slice(1);
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : normalized;

  const value = Number.parseInt(expanded, 16);

  return {
    b: (value & 255) / 255,
    g: ((value >> 8) & 255) / 255,
    r: ((value >> 16) & 255) / 255,
  };
}

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);

  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader;
  }

  gl.deleteShader(shader);
  return null;
}

function createProgram(gl: WebGLRenderingContext) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  if (!vertexShader || !fragmentShader) {
    if (vertexShader) {
      gl.deleteShader(vertexShader);
    }

    if (fragmentShader) {
      gl.deleteShader(fragmentShader);
    }

    return null;
  }

  const program = gl.createProgram();

  if (!program) {
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return program;
  }

  gl.deleteProgram(program);
  return null;
}

export function SilkBackground({
  className,
  color = "#242229",
  noiseIntensity = 1.5,
  rotation = 0,
  scale = 1.1,
  speed = 5,
}: SilkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: true,
      depth: false,
      powerPreference: "high-performance",
      premultipliedAlpha: false,
      stencil: false,
    });

    if (!gl) {
      return;
    }

    const program = createProgram(gl);

    if (!program) {
      return;
    }

    const positionBuffer = gl.createBuffer();

    if (!positionBuffer) {
      gl.deleteProgram(program);
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
        1, -1,
        -1, 1,
        -1, 1,
        1, -1,
        1, 1,
      ]),
      gl.STATIC_DRAW,
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const colorLocation = gl.getUniformLocation(program, "u_color");
    const noiseLocation = gl.getUniformLocation(program, "u_noiseIntensity");
    const rotationLocation = gl.getUniformLocation(program, "u_rotation");
    const scaleLocation = gl.getUniformLocation(program, "u_scale");
    const speedLocation = gl.getUniformLocation(program, "u_speed");

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      gl.viewport(0, 0, width, height);
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    let frameId = 0;
    const startedAt = performance.now();
    const rgb = hexToRgb(color);

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const render = (now: number) => {
      resize();
      gl.useProgram(program);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, now - startedAt);
      gl.uniform3f(colorLocation, rgb.r, rgb.g, rgb.b);
      gl.uniform1f(noiseLocation, noiseIntensity);
      gl.uniform1f(rotationLocation, rotation);
      gl.uniform1f(scaleLocation, scale);
      gl.uniform1f(speedLocation, speed);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frameId = window.requestAnimationFrame(render);
    };

    frameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
    };
  }, [color, noiseIntensity, rotation, scale, speed]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
