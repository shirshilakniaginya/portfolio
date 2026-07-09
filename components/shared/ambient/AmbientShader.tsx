"use client";

import { useEffect, useRef } from "react";
import styles from "./ambient.module.css";

const VERTEX_SHADER = `
  attribute vec2 aPosition;

  void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  uniform vec2 uResolution;

  float random(vec2 value) {
    return fract(sin(dot(value, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float noise(vec2 value) {
    vec2 cell = floor(value);
    vec2 local = fract(value);
    vec2 easing = local * local * (3.0 - 2.0 * local);

    return mix(
      mix(random(cell), random(cell + vec2(1.0, 0.0)), easing.x),
      mix(random(cell + vec2(0.0, 1.0)), random(cell + vec2(1.0, 1.0)), easing.x),
      easing.y
    );
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    float coarse = noise(uv * vec2(24.0, 14.0));
    float fine = noise(uv * vec2(180.0, 110.0));
    float grain = random(floor(gl_FragCoord.xy * 1.4));
    float roughness = coarse * 0.035 + fine * 0.024 + grain * 0.012;

    gl_FragColor = vec4(vec3(0.0), roughness);
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

export function AmbientShader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vertex = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertex || !fragment) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const position = gl.getAttribLocation(program, "aPosition");
    const resolution = gl.getUniformLocation(program, "uResolution");
    const buffer = gl.createBuffer();
    if (!buffer || position < 0 || !resolution) return;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.useProgram(program);
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const render = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 1) * 0.35;
      const width = Math.max(1, Math.round(canvas.clientWidth * scale));
      const height = Math.max(1, Math.round(canvas.clientHeight * scale));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      gl.viewport(0, 0, width, height);
      gl.uniform2f(resolution, width, height);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    render();
    window.addEventListener("resize", render, { passive: true });

    return () => {
      window.removeEventListener("resize", render);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
