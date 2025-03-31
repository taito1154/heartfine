"use client";

// src/shaders/backscreenshader.tsx
import * as THREE from "three";
import React, { useEffect, useRef } from "react";

// vertexShader remains the same
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// フラグメントシェーダー（明るいグレーの背景を不規則に変化させる）
const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  varying vec2 vUv;

  // 疑似乱数関数
  float random(in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  // スムーズな2Dノイズ関数
  float noise(in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  // フラクタル・ブラウン運動 (fbm)
  float fbm(in vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(st);
      st *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    // UV座標の取得とアスペクト比補正
    vec2 uv = vUv;
    float aspect = u_resolution.x / u_resolution.y;
    uv.x = (uv.x - 0.5) * aspect + 0.5;

    // fbm を使って滑らかなノイズを生成
    float n = fbm(uv * 5.0 + u_time * 0.3);

    // 明るいグレーの2色を定義（0.6 と 0.95 のグレー）
    vec3 color1 = vec3(0.6);
    vec3 color2 = vec3(0.95);
    // ノイズにより2色を補間して不規則な変化を実現
    vec3 color = mix(color1, color2, n);

    // 最終的な色を出力（alphaは不透明）
    gl_FragColor = vec4(color, 0.8);
  }
`;

const BackScreenShader: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // コンテナ内にcanvasを作成
    const canvas = document.createElement("canvas");
    container.appendChild(canvas);

    // シーンとOrthographicCamera（全画面Quad用）の設定
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true, // 背景を透明に
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // クリアカラーも透明

    // 全画面Quad用のジオメトリとシェーダーマテリアルを作成
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0.0 },
        u_resolution: {
          value: new THREE.Vector2(
            container.clientWidth,
            container.clientHeight
          ),
        },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationFrameId: number;
    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);
      // time はミリ秒単位なので秒単位に変換して u_time に設定
      material.uniforms.u_time.value = time * 0.001;
      renderer.render(scene, camera);
    };
    animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      material.uniforms.u_resolution.value.set(width, height);
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
};

export default BackScreenShader;
