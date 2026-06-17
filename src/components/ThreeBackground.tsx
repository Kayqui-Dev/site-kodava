'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene, Camera, Renderer setup
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

    // Helpers to create glowing particle textures
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

    // 1. Particle System (Background data flow)
    const particleCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    const color1 = new THREE.Color(0x0084ff); // Royal Blue
    const color2 = new THREE.Color(0x00e5ff); // Cyan
    const color3 = new THREE.Color(0x032e6a); // Deep Blue

    for (let i = 0; i < particleCount; i++) {
      // Position points randomly in a box
      positions[i * 3] = (Math.random() - 0.5) * 300;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 300;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200 - 50;

      // Color interpolation
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
      size: 2.2,
      map: particleTexture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });

    const starField = new THREE.Points(geometry, material);
    scene.add(starField);

    // 2. Central Wireframe Network Sphere
    const sphereGeom = new THREE.IcosahedronGeometry(22, 2);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x0084ff,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
    });
    const networkSphere = new THREE.Mesh(sphereGeom, sphereMat);
    scene.add(networkSphere);

    // Adding secondary nodes to vertices for detail
    const nodesGeom = new THREE.BufferGeometry();
    const nodePositions = sphereGeom.attributes.position.clone();
    nodesGeom.setAttribute('position', nodePositions);
    const nodesMat = new THREE.PointsMaterial({
      size: 1.0,
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.4,
    });
    const networkNodes = new THREE.Points(nodesGeom, nodesMat);
    networkSphere.add(networkNodes);

    // 3. Volumetric lighting simulation via PointLights
    const ambientLight = new THREE.AmbientLight(0x020210);
    scene.add(ambientLight);

    const godLight = new THREE.PointLight(0x0084ff, 8, 250);
    godLight.position.set(0, 0, -20);
    scene.add(godLight);

    const backGlowLight = new THREE.PointLight(0x00e5ff, 5, 150);
    backGlowLight.position.set(40, -20, -40);
    scene.add(backGlowLight);

    // Scroll and Mouse tracking
    let scrollPercent = 0;
    let targetX = 0;
    let targetY = 0;

    const handleScroll = () => {
      const h = document.documentElement;
      const b = document.body;
      const st = 'scrollTop';
      const sh = 'scrollHeight';
      scrollPercent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX - window.innerWidth / 2) * 0.03;
      targetY = (e.clientY - window.innerHeight / 2) * 0.03;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation loop
    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Smooth camera and light movement based on scroll/mouse
      const targetCamY = -scrollPercent * 80;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.position.x += (targetX - camera.position.x) * 0.05;
      
      // Look at center lightly offset by mouse
      camera.lookAt(targetX * 0.2, targetCamY * 0.2, 0);

      // Rotate particle systems and central globe
      starField.rotation.y = time * 0.012;
      starField.rotation.x = scrollPercent * 0.6;

      networkSphere.rotation.y = -time * 0.04;
      networkSphere.rotation.x = time * 0.02;

      // Animate volumetric point lights to simulate flickering/moving rays
      godLight.position.x = Math.sin(time * 0.5) * 50;
      godLight.position.y = Math.cos(time * 0.3) * 30 + (targetCamY * 0.5);
      godLight.position.z = -15 + Math.sin(time * 0.8) * 10;

      // Slowly float particles up and down
      const positionsAttr = starField.geometry.attributes.position as THREE.BufferAttribute;
      const array = positionsAttr.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const speed = speeds[i];
        // Move y slowly
        array[i * 3 + 1] += Math.sin(time + i) * speed * 0.1;
      }
      positionsAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      // Traverse and dispose Three resources
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      sphereGeom.dispose();
      sphereMat.dispose();
      nodesGeom.dispose();
      nodesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={mountRef}
      className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none bg-black block"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
