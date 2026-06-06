'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './CinematicLayer.module.css';

const PARTICLE_COUNT = 180;

export default function CinematicLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;

    // Particle geometry
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const speeds = new Float32Array(PARTICLE_COUNT);
    const offsets = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;

      sizes[i] = Math.random() * 18 + 4;
      speeds[i] = Math.random() * 0.4 + 0.15;
      offsets[i] = Math.random() * Math.PI * 2;

      // Warm orange to soft white palette
      const t = Math.random();
      if (t < 0.55) {
        // warm orange
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.45 + Math.random() * 0.2;
        colors[i * 3 + 2] = 0.05 + Math.random() * 0.15;
      } else if (t < 0.8) {
        // soft golden white
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
        colors[i * 3 + 2] = 0.7 + Math.random() * 0.2;
      } else {
        // cool blue-white (monitor glow)
        colors[i * 3] = 0.55 + Math.random() * 0.2;
        colors[i * 3 + 1] = 0.7 + Math.random() * 0.2;
        colors[i * 3 + 2] = 1.0;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Soft bokeh texture
    const bokehSize = 64;
    const bokehCanvas = document.createElement('canvas');
    bokehCanvas.width = bokehSize;
    bokehCanvas.height = bokehSize;
    const ctx = bokehCanvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(
      bokehSize / 2, bokehSize / 2, 0,
      bokehSize / 2, bokehSize / 2, bokehSize / 2
    );
    gradient.addColorStop(0, 'rgba(255,255,255,0.95)');
    gradient.addColorStop(0.35, 'rgba(255,255,255,0.55)');
    gradient.addColorStop(0.7, 'rgba(255,255,255,0.12)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, bokehSize, bokehSize);
    const bokehTex = new THREE.CanvasTexture(bokehCanvas);

    const material = new THREE.PointsMaterial({
      size: 0.22,
      map: bokehTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse parallax
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    let raf: number;
    const posArr = geometry.attributes.position.array as Float32Array;
    const basePositions = Float32Array.from(posArr);

    const animate = (time: number) => {
      raf = requestAnimationFrame(animate);
      const t = time * 0.001;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const s = speeds[i];
        const o = offsets[i];
        posArr[i * 3] = basePositions[i * 3] + Math.sin(t * s + o) * 0.18;
        posArr[i * 3 + 1] = basePositions[i * 3 + 1] + Math.cos(t * s * 0.7 + o) * 0.14;
        posArr[i * 3 + 2] = basePositions[i * 3 + 2] + Math.sin(t * s * 0.5 + o * 1.3) * 0.1;
      }
      geometry.attributes.position.needsUpdate = true;

      // Smooth camera parallax
      target.x += (mouse.x * 0.3 - target.x) * 0.04;
      target.y += (mouse.y * 0.2 - target.y) * 0.04;
      camera.position.x = target.x;
      camera.position.y = target.y;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate(0);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      bokehTex.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
