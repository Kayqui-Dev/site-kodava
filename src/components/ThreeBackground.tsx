'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.008);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({
      canvas: mountRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.2, 'rgba(0, 229, 255, 0.6)');
        grad.addColorStop(0.5, 'rgba(0, 132, 255, 0.25)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = createParticleTexture();

    // Particle System
    const particleCount = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    const color1 = new THREE.Color(0x0084ff);
    const color2 = new THREE.Color(0x00e5ff);
    const color3 = new THREE.Color(0x032e6a);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 300;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 300;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200 - 50;

      const rand = Math.random();
      let pColor = color1;
      if (rand > 0.66) pColor = color2;
      else if (rand > 0.33) pColor = color3;

      colors[i * 3] = pColor.r;
      colors[i * 3 + 1] = pColor.g;
      colors[i * 3 + 2] = pColor.b;

      speeds[i] = 0.05 + Math.random() * 0.15;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2.5,
      map: particleTexture,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });

    const starField = new THREE.Points(geometry, material);
    scene.add(starField);

    // Central Wireframe Globe removed - replaced by interactive 3D planet in Hero

    // Lights
    const ambientLight = new THREE.AmbientLight(0x020210);
    scene.add(ambientLight);

    const godLight = new THREE.PointLight(0x0084ff, 8, 250);
    godLight.position.set(0, 0, -20);
    scene.add(godLight);

    let scrollPercent = 0;
    let targetX = 0;
    let targetY = 0;

    const handleScroll = () => {
      const h = document.documentElement;
      const b = document.body;
      const st = 'scrollTop';
      const sh = 'scrollHeight';
      const scrollHeight = (h[sh] || b[sh]) - h.clientHeight;
      scrollPercent = scrollHeight > 0 ? (h[st] || b[st]) / scrollHeight : 0;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX - window.innerWidth / 2) * 0.02;
      targetY = (e.clientY - window.innerHeight / 2) * 0.02;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      const targetCamY = -scrollPercent * 70;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.lookAt(targetX * 0.1, targetCamY * 0.15, 0);

      starField.rotation.y = time * 0.01;
      starField.rotation.x = scrollPercent * 0.5;

      // networkSphere rotation removed

      godLight.position.x = Math.sin(time * 0.5) * 40;
      godLight.position.y = Math.cos(time * 0.3) * 20 + (targetCamY * 0.4);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      // Geometries and materials disposed elsewhere
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={mountRef}
      className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none block"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
