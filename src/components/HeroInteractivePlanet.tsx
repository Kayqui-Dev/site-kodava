'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ExternalLink } from 'lucide-react';
import LogoSVG from './LogoSVG';

// Definition of nodes on the planet
const nodesData = [
  {
    id: 'nextjs',
    name: 'Next.js',
    type: 'tech',
    desc: 'Arquitetura de ponta para aplicações web e portais institucionais com renderização no servidor (SSR) de alta performance e SEO otimizado.',
    tags: ['Frontend', 'SSR', 'React', 'Vercel'],
    color: '#00e5ff',
    details: 'Contamos com especialistas seniores focados no ecossistema Next.js. Garantimos velocidade máxima no Core Web Vitals, carregamento instantâneo de páginas e ranqueamento superior no Google de forma nativa.'
  },
  {
    id: 'reactnative',
    name: 'React Native',
    type: 'tech',
    desc: 'Desenvolvimento de aplicativos móveis nativos para iOS e Android compartilhando a mesma base de código com alta performance.',
    tags: ['Mobile', 'App Store', 'Expo', 'TypeScript'],
    color: '#0084ff',
    details: 'Desenvolvemos apps móveis corporativos de alta fidelidade e fluidos. Integramos com hardware (câmera, GPS, biometria), notificações push e sincronização offline segura.'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    type: 'tech',
    desc: 'Construção de APIs Restful/GraphQL robustas, arquiteturas de microsserviços escaláveis e servidores orientados a eventos.',
    tags: ['Backend', 'Express', 'NestJS', 'API'],
    color: '#00ffcc',
    details: 'Engenharia de backend robusta projetada para lidar com requisições massivas. Foco em APIs seguras, criptografia, escalabilidade horizontal e integrações complexas.'
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    type: 'saas',
    desc: 'Modelagem de bancos de dados relacionais robustos, transações ACID complexas e arquiteturas de dados de alta integridade.',
    tags: ['Database', 'SQL', 'ACID', 'Enterprise'],
    color: '#0084ff',
    details: 'Bancos de dados projetados com arquiteturas otimizadas para consultas complexas, indexação profunda, triggers e backup redundante para segurança total das informações.'
  },
  {
    id: 'n8n',
    name: 'N8N & Automations',
    type: 'tech',
    desc: 'Integração de APIs, CRMs, ERPs e ferramentas proprietárias em fluxos de trabalho 100% automatizados e livres de erros.',
    tags: ['Automação', 'n8n', 'Zapier', 'Webhooks'],
    color: '#00ffcc',
    details: 'Eliminamos o trabalho manual e repetitivo que drena o tempo da equipe. Desenvolvemos automações autônomas que operam 24/7 com auditoria e notificações de status.'
  },
  {
    id: 'pythonai',
    name: 'Python & IA',
    type: 'tech',
    desc: 'Desenvolvimento de inteligência artificial sob medida, agentes cognitivos autônomos e sistemas RAG integrados.',
    tags: ['IA', 'Python', 'LLMs', 'RAG'],
    color: '#00e5ff',
    details: 'Criamos inteligência artificial privada para empresas. Treinamento de dados específicos, integrações de APIs do Gemini/OpenAI e processamento inteligente de texto, voz e imagens.'
  },
  {
    id: 'clyver',
    name: 'Clyver Hub',
    type: 'project',
    desc: 'Hub operacional de marketplaces, unificação de estoque, atendimento integrado por WhatsApp e análise de crédito em tempo real.',
    tags: ['Cases', 'SaaS', 'Fintech', 'E-commerce'],
    image: '/images/projects/clyver.png',
    link: 'https://clyver.com.br',
    color: '#00e5ff',
    details: 'Um ecossistema extremamente complexo que unifica canais de vendas, otimiza processos logísticos e disponibiliza capital de giro sob medida com análise dinâmica de riscos.'
  },
  {
    id: 'centurion',
    name: 'Centurion Scout',
    type: 'project',
    desc: 'Sistema avançado e painel administrativo para gestão de atletas, controle de scout de combates e performance esportiva.',
    tags: ['Cases', 'Sistema', 'MMA', 'Dashboard'],
    image: '/images/projects/centurion-scout.png',
    link: 'https://www.centurionfight.shop/auth/login',
    color: '#0084ff',
    details: 'Dashboard analítico desenvolvido para monitorar o rendimento físico, histórico de lutas e gestão de atletas profissionais em grandes eventos de artes marciais.'
  },
  {
    id: 'lovekodava',
    name: 'Love Kodava',
    type: 'project',
    desc: 'Plataforma interativa voltada para presentes digitais personalizados, retrospectivas animadas e timelines românticas.',
    tags: ['Cases', 'SaaS B2C', 'Animação', 'Escala'],
    image: '/images/projects/love-kodava.png',
    link: 'https://www.love-kodava.shop/',
    color: '#00ffcc',
    details: 'SaaS B2C de tráfego em larga escala desenvolvido com foco em performance visual impecável, transições animadas personalizadas e checkout rápido integrado.'
  },
  {
    id: 'logguard',
    name: 'LogGuard',
    type: 'project',
    desc: 'Plataforma SaaS corporativa para monitoramento, agregação de logs e observabilidade de infraestruturas cloud.',
    tags: ['Cases', 'SaaS', 'DevOps', 'Security'],
    image: '/images/projects/logguard.png',
    link: 'https://logguard.clyver.com.br/',
    color: '#00e5ff',
    details: 'Sistema de monitoramento contínuo de erros e logs de segurança. Alertas em tempo real integrados com canais corporativos e relatórios de conformidade e integridade.'
  },
  {
    id: 'faculdadedaluta',
    name: 'Faculdade da Luta',
    type: 'project',
    desc: 'Plataforma para gestão de alunos, treinos e eventos de artes marciais com dashboards integrados.',
    tags: ['Cases', 'EdTech', 'Esportes', 'SaaS'],
    image: '/images/projects/faculdade-da-luta.png',
    link: 'https://v0-faculdade-da-luta-sandy.vercel.app/',
    color: '#00ffcc',
    details: 'Uma plataforma sob medida criada para automatizar a gestão de academias de luta, inscrições em campeonatos, e acompanhamento pedagógico/esportivo dos alunos.'
  },
  {
    id: 'esportentg',
    name: 'Esporte NTG',
    type: 'project',
    desc: 'Portal institucional e painel administrativo para gestão de torneios esportivos e resultados em tempo real.',
    tags: ['Cases', 'Portal', 'Esportes', 'CMS'],
    image: '/images/projects/esportentg.png',
    link: 'https://esportentg.com.br/',
    color: '#0084ff',
    details: 'Portal de alta performance para torneios regionais. Conta com chaves de campeonatos geradas dinamicamente, tabelas de classificação automatizadas e transmissão de resultados.'
  },
  {
    id: 'caprilsparta',
    name: 'Capril Sparta',
    type: 'project',
    desc: 'E-commerce e sistema de controle de rebanho para pecuária caprina premium com rastreabilidade.',
    tags: ['Cases', 'AgroTech', 'E-commerce', 'SaaS'],
    image: '/images/projects/capril-sparta.png',
    link: 'https://v0-capril-sparta.vercel.app/',
    color: '#00e5ff',
    details: 'Integração de loja virtual de produtos caprinos finos com sistema interno de rastreabilidade genética e produção leiteira em tempo real.'
  },
  {
    id: 'acaiprototipo',
    name: 'Açaí Delivery',
    type: 'project',
    desc: 'Aplicativo de delivery e cardápio digital interativo para franquias de açaí com pedidos diretos.',
    tags: ['Cases', 'Delivery', 'PWA', 'FastFood'],
    image: '/images/projects/acai-prototipo.png',
    link: 'https://v0-acai-prototipo.vercel.app/',
    color: '#00ffcc',
    details: 'Aplicativo web progressivo (PWA) de alta conversão para pedidos automatizados, customização de ingredientes em tempo real e integração com PDV.'
  },
  {
    id: 'evolaristech',
    name: 'Evolaris Tech',
    type: 'project',
    desc: 'Landing page corporativa de tecnologia e consultoria de software para transformação digital.',
    tags: ['Cases', 'Web', 'Corporate', 'Tech'],
    image: '/images/projects/evolaris.png',
    link: 'https://evolaris.tech/',
    color: '#0084ff',
    details: 'Design minimalista e interativo focado na apresentação de soluções tecnológicas robustas e captação de leads empresariais qualificados.'
  },
  {
    id: 'visaodoproduto',
    name: 'Visão do Produto',
    type: 'project',
    desc: 'Portal de conteúdo e ferramentas interativas sobre gestão de produto e estratégias ágeis.',
    tags: ['Cases', 'EdTech', 'Agile', 'Product'],
    image: '/images/projects/visao-do-produto.png',
    link: 'https://visaodoproduto.com.br/',
    color: '#00e5ff',
    details: 'Hub completo de aprendizagem e frameworks práticos para Product Managers e Product Owners com dinâmicas colaborativas integradas.'
  },
  {
    id: 'micdog',
    name: 'Mic Dog Cloud',
    type: 'project',
    desc: 'SaaS completo para gestão de pet shops, clínicas veterinárias e controle de prontuários.',
    tags: ['Cases', 'SaaS', 'HealthTech', 'ERP'],
    image: '/images/projects/micdog.png',
    link: 'https://micdog.cloud/',
    color: '#00ffcc',
    details: 'Sistema de gestão na nuvem para clínicas pet, contemplando agenda inteligente de banho e tosa, prontuário médico de animais, faturamento e controle de estoque.'
  }
];

export default function HeroInteractivePlanet() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // SVG refs for high-performance direct DOM manipulation
  const svgRef = useRef<SVGSVGElement>(null);
  const lineBgRef = useRef<SVGLineElement>(null);
  const lineCoreRef = useRef<SVGLineElement>(null);
  const cursorDotRef = useRef<SVGCircleElement>(null);
  
  const [hoveredNode, setHoveredNode] = useState<typeof nodesData[0] | null>(null);
  const [clickedNode, setClickedNode] = useState<typeof nodesData[0] | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorStyle, setCursorStyle] = useState('cursor-grab');

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Width and height of the container
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 100);
    camera.position.z = 45;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Groups
    const planetGroup = new THREE.Group();
    scene.add(planetGroup);

    // Planet Particles (Wireframe / Points Globe)
    const particleCount = 450;
    const sphereGeo = new THREE.SphereGeometry(14, 24, 24);
    
    // Create random dot particles on the sphere surface
    const pointGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const posAttribute = sphereGeo.attributes.position;
    
    // Sample points from the sphere geometry
    for (let i = 0; i < particleCount; i++) {
      const idx = Math.floor(Math.random() * posAttribute.count);
      positions[i * 3] = posAttribute.getX(idx) + (Math.random() - 0.5) * 0.3;
      positions[i * 3 + 1] = posAttribute.getY(idx) + (Math.random() - 0.5) * 0.3;
      positions[i * 3 + 2] = posAttribute.getZ(idx) + (Math.random() - 0.5) * 0.3;
    }
    pointGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Create dot texture dynamically
    const createPointTexture = () => {
      const canvasTex = document.createElement('canvas');
      canvasTex.width = 16;
      canvasTex.height = 16;
      const ctx = canvasTex.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.3, 'rgba(0, 132, 255, 0.4)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 16, 16);
      }
      return new THREE.CanvasTexture(canvasTex);
    };

    const pointMaterial = new THREE.PointsMaterial({
      size: 0.8,
      map: createPointTexture(),
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    
    const planetPoints = new THREE.Points(pointGeo, pointMaterial);
    planetGroup.add(planetPoints);

    // Planet Subtle Wireframe Sphere
    const wireGeo = new THREE.IcosahedronGeometry(13.8, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x0084ff,
      wireframe: true,
      transparent: true,
      opacity: 0.04,
      blending: THREE.AdditiveBlending,
    });
    const planetWire = new THREE.Mesh(wireGeo, wireMat);
    planetGroup.add(planetWire);

    // Interactive Nodes (Mesh Spheres)
    const nodeMeshes: THREE.Mesh[] = [];
    const N = nodesData.length;
    const sphereRadius = 14;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden spiral angle

    nodesData.forEach((nodeData, idx) => {
      // Fibonacci distribution on sphere
      const y = 1 - (idx / (N - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * idx;
      
      const x = Math.cos(theta) * radiusAtY * sphereRadius;
      const z = Math.sin(theta) * radiusAtY * sphereRadius;

      // Invisible bubble for generous click/hover targeting
      const nodeGeo = new THREE.SphereGeometry(1.2, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(nodeData.color),
        transparent: true,
        opacity: 0,
        depthWrite: false
      });

      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, y * sphereRadius, z);
      nodeMesh.userData = { ...nodeData, index: idx };
      
      // 1. Beautiful glowing core sphere
      const coreGeo = new THREE.SphereGeometry(0.4, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(nodeData.color),
        transparent: true,
        opacity: 0.95,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      nodeMesh.add(coreMesh);

      // 2. Glowing glass atmospheric envelope
      const glowGeo = new THREE.SphereGeometry(0.65, 16, 16);
      const glowMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(nodeData.color),
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
      });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      nodeMesh.add(glowMesh);

      // 3. Rotating neon ring
      const ringGeo = new THREE.RingGeometry(0.85, 1.05, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(nodeData.color),
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      nodeMesh.add(ringMesh);

      planetGroup.add(nodeMesh);
      nodeMeshes.push(nodeMesh);
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    // Raycasting & Dragging Interaction variables
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let currentHoveredMesh: THREE.Mesh | null = null;
    let localMouse = { x: 0, y: 0 };
    let hoverActive = false;

    // Dragging physics state
    let isDragging = false;
    let dragDistance = 0;
    let previousMousePosition = { x: 0, y: 0 };
    let dragVelocity = { x: 0, y: 0 };
    const autoRotationSpeed = 0.07;

    const onContainerMouseDown = (e: MouseEvent) => {
      isDragging = true;
      dragDistance = 0;
      previousMousePosition = {
        x: e.clientX,
        y: e.clientY
      };
      setCursorStyle('cursor-grabbing');
    };

    const onContainerMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      localMouse.x = e.clientX - rect.left;
      localMouse.y = e.clientY - rect.top;
      setMousePos(localMouse);
      
      // Normalized coordinates
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        
        dragDistance += Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // Rotate planet group based on drag delta
        planetGroup.rotation.y += deltaX * 0.007;
        planetGroup.rotation.x += deltaY * 0.007;

        // Set drag velocity for inertia
        dragVelocity.x = deltaX * 0.007;
        dragVelocity.y = deltaY * 0.007;

        previousMousePosition = {
          x: e.clientX,
          y: e.clientY
        };

        // Disable hover raycasting when dragging
        hoverActive = false;
        currentHoveredMesh = null;
        setHoveredNode(null);

        // Hide laser SVG lines during drag
        if (lineBgRef.current) lineBgRef.current.style.opacity = '0';
        if (lineCoreRef.current) lineCoreRef.current.style.opacity = '0';
        if (cursorDotRef.current) cursorDotRef.current.style.opacity = '0';
      } else {
        hoverActive = true;
      }
    };

    const onContainerMouseUp = (e: MouseEvent) => {
      isDragging = false;
      setCursorStyle(currentHoveredMesh ? 'cursor-pointer' : 'cursor-grab');
      
      // Click detection if drag distance is tiny
      if (dragDistance < 5) {
        if (currentHoveredMesh) {
          setClickedNode(currentHoveredMesh.userData as any);
        }
      }
    };

    // Mobile touch events
    const onContainerTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        dragDistance = 0;
        previousMousePosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      }
    };

    const onContainerTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.y;
        
        dragDistance += Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        planetGroup.rotation.y += deltaX * 0.007;
        planetGroup.rotation.x += deltaY * 0.007;

        dragVelocity.x = deltaX * 0.007;
        dragVelocity.y = deltaY * 0.007;

        previousMousePosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
        
        hoverActive = false;
        currentHoveredMesh = null;
        setHoveredNode(null);

        if (lineBgRef.current) lineBgRef.current.style.opacity = '0';
        if (lineCoreRef.current) lineCoreRef.current.style.opacity = '0';
        if (cursorDotRef.current) cursorDotRef.current.style.opacity = '0';
      }
    };

    const onContainerTouchEnd = () => {
      isDragging = false;
    };

    const onContainerMouseEnter = () => {
      setIsHovering(true);
      if (!isDragging) {
        setCursorStyle('cursor-grab');
      }
    };

    const onContainerMouseLeave = () => {
      setIsHovering(false);
      isDragging = false;
      hoverActive = false;
      currentHoveredMesh = null;
      setHoveredNode(null);
      setCursorStyle('cursor-grab');
      
      // Clear SVG lines
      if (lineBgRef.current) lineBgRef.current.style.opacity = '0';
      if (lineCoreRef.current) lineCoreRef.current.style.opacity = '0';
      if (cursorDotRef.current) cursorDotRef.current.style.opacity = '0';
    };

    container.addEventListener('mousedown', onContainerMouseDown, { passive: true });
    container.addEventListener('mousemove', onContainerMouseMove, { passive: true });
    container.addEventListener('mouseup', onContainerMouseUp, { passive: true });
    container.addEventListener('touchstart', onContainerTouchStart, { passive: true });
    container.addEventListener('touchmove', onContainerTouchMove, { passive: true });
    container.addEventListener('touchend', onContainerTouchEnd, { passive: true });
    
    container.addEventListener('mouseenter', onContainerMouseEnter, { passive: true });
    container.addEventListener('mouseleave', onContainerMouseLeave, { passive: true });

    // Animation Loop
    let reqId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      if (isDragging) {
        // Rotations are handled directly in mousemove
      } else {
        // Apply inertia decay (damping velocity)
        dragVelocity.x *= 0.95;
        dragVelocity.y *= 0.95;

        planetGroup.rotation.y += dragVelocity.x;
        planetGroup.rotation.x += dragVelocity.y;

        // If drag velocity slows down, blend back to automatic rotation
        if (Math.abs(dragVelocity.x) < 0.001) {
          planetGroup.rotation.y += autoRotationSpeed * 0.05;
        }
        if (Math.abs(dragVelocity.y) < 0.001) {
          planetGroup.rotation.x += autoRotationSpeed * 0.025;
        }
      }

      // Rotate planet points separately for parallax depth
      planetPoints.rotation.y = time * -0.02;

      // Pulse auras and nodes
      nodeMeshes.forEach((mesh) => {
        const idx = mesh.userData.index;
        const scale = 1 + Math.sin(time * 3 + idx) * 0.08;
        
        // Scale inner core and outer glow bubble
        const core = mesh.children[0] as THREE.Mesh;
        const glow = mesh.children[1] as THREE.Mesh;
        if (core) core.scale.set(scale, scale, scale);
        if (glow) glow.scale.set(scale * 1.1, scale * 1.1, scale * 1.1);
        
        // Rotate and lookAt for rings
        const ring = mesh.children[2] as THREE.Mesh;
        if (ring) {
          ring.rotation.z += 0.02;
          ring.lookAt(camera.position);
        }
      });

      // Raycasting for mouse collision
      if (hoverActive && !isDragging) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(nodeMeshes);

        if (intersects.length > 0) {
          const hoveredObj = intersects[0].object as THREE.Mesh;
          
          if (currentHoveredMesh !== hoveredObj) {
            currentHoveredMesh = hoveredObj;
            setHoveredNode(hoveredObj.userData as any);
            setCursorStyle('cursor-pointer');
            
            // Trigger feedback haptic
            if (navigator.vibrate) navigator.vibrate(5);
          }

          // Projection coordinate calculations to update SVG line in real time
          const nodePos = new THREE.Vector3();
          hoveredObj.getWorldPosition(nodePos);
          
          // Map to projected coordinates
          nodePos.project(camera);
          const px = (nodePos.x * 0.5 + 0.5) * width;
          const py = (nodePos.y * -0.5 + 0.5) * height;

          // Directly update SVG attributes in DOM for 60fps performance without React re-render lag
          if (lineBgRef.current && lineCoreRef.current && cursorDotRef.current) {
            lineBgRef.current.setAttribute('x1', px.toString());
            lineBgRef.current.setAttribute('y1', py.toString());
            lineBgRef.current.setAttribute('x2', localMouse.x.toString());
            lineBgRef.current.setAttribute('y2', localMouse.y.toString());
            lineBgRef.current.style.opacity = '0.35';
            lineBgRef.current.setAttribute('stroke', hoveredObj.userData.color);

            lineCoreRef.current.setAttribute('x1', px.toString());
            lineCoreRef.current.setAttribute('y1', py.toString());
            lineCoreRef.current.setAttribute('x2', localMouse.x.toString());
            lineCoreRef.current.setAttribute('y2', localMouse.y.toString());
            lineCoreRef.current.style.opacity = '1';
            
            cursorDotRef.current.setAttribute('cx', localMouse.x.toString());
            cursorDotRef.current.setAttribute('cy', localMouse.y.toString());
            cursorDotRef.current.style.opacity = '1';
            cursorDotRef.current.setAttribute('fill', hoveredObj.userData.color);
          }
        } else {
          if (currentHoveredMesh) {
            currentHoveredMesh = null;
            setHoveredNode(null);
            setCursorStyle('cursor-grab');
          }

          // Hide laser SVG line
          if (lineBgRef.current) lineBgRef.current.style.opacity = '0';
          if (lineCoreRef.current) lineCoreRef.current.style.opacity = '0';
          if (cursorDotRef.current) cursorDotRef.current.style.opacity = '0';
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      
      container.removeEventListener('mousedown', onContainerMouseDown);
      container.removeEventListener('mousemove', onContainerMouseMove);
      container.removeEventListener('mouseup', onContainerMouseUp);
      container.removeEventListener('touchstart', onContainerTouchStart);
      container.removeEventListener('touchmove', onContainerTouchMove);
      container.removeEventListener('touchend', onContainerTouchEnd);
      container.removeEventListener('mouseenter', onContainerMouseEnter);
      container.removeEventListener('mouseleave', onContainerMouseLeave);
      
      // Clean up ThreeJS geometries
      sphereGeo.dispose();
      pointGeo.dispose();
      wireGeo.dispose();
      pointMaterial.dispose();
      wireMat.dispose();
      nodeMeshes.forEach((mesh) => {
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat: any) => mat.dispose());
        } else {
          mesh.material.dispose();
        }
        mesh.children.forEach((child: any) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat: any) => mat.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-full flex items-center justify-center select-none ${cursorStyle}`}
    >
      {/* ThreeJS WebGL canvas */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block" 
      />

      {/* SVG Laser lines overlay */}
      <svg 
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      >
        <defs>
          <filter id="laser-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Background thick glowing line */}
        <line
          ref={lineBgRef}
          x1="0" y1="0" x2="0" y2="0"
          stroke="#00e5ff"
          strokeWidth="3.5"
          opacity="0"
          filter="url(#laser-blur)"
          className="transition-opacity duration-300"
          style={{ mixBlendMode: 'screen' }}
        />

        {/* Core bright white line */}
        <line
          ref={lineCoreRef}
          x1="0" y1="0" x2="0" y2="0"
          stroke="#ffffff"
          strokeWidth="1.2"
          opacity="0"
          className="transition-opacity duration-300"
        />

        {/* Glowing dot on mouse cursor */}
        <circle
          ref={cursorDotRef}
          cx="0" cy="0" r="4.5"
          fill="#00e5ff"
          opacity="0"
          className="transition-opacity duration-300"
          style={{ filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.8))' }}
        />
      </svg>

      {/* Center Kodava glassmorphic logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-26 md:h-26 flex items-center justify-center bg-black/50 border border-white/5 backdrop-blur-xl rounded-2xl shadow-[0_0_40px_rgba(0,132,255,0.1)] pointer-events-none">
        <LogoSVG className="w-12 h-12 md:w-16 md:h-16 drop-shadow-[0_0_8px_rgba(0,132,255,0.3)] animate-pulse" />
      </div>

      {/* Hover Tooltip/Popover tracking mouse cursor */}
      <AnimatePresence>
        {isHovering && hoveredNode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-30 pointer-events-none p-4 w-[240px] backdrop-blur-lg bg-zinc-950/90 border border-white/10 rounded-xl shadow-2xl flex flex-col gap-2.5"
            style={{
              left: `${mousePos.x + 20}px`,
              top: `${mousePos.y + 20}px`,
              transform: 'translate(0, 0)',
            }}
          >
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-mono tracking-widest uppercase" style={{ color: hoveredNode.color }}>
                // {hoveredNode.type === 'tech' ? 'STACK' : 'PROJETO KODAVA'}
              </span>
              <span className="text-[8px] font-mono text-gray-500 uppercase">
                [ DETALHES ]
              </span>
            </div>
            
            <h4 className="font-serif font-black text-lg text-white leading-tight">
              {hoveredNode.name}
            </h4>
            
            <p className="font-sans text-[10px] text-gray-400 leading-normal">
              {hoveredNode.desc}
            </p>

            <span className="text-[8px] font-mono text-gray-500 mt-1 uppercase">
              Clique para expandir +
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rich Popup Modal on Click */}
      <AnimatePresence>
        {clickedNode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-md bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl p-8 overflow-hidden flex flex-col gap-6"
            >
              {/* Close Button */}
              <button 
                onClick={() => setClickedNode(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors cursor-pointer border border-white/5 hover:border-white/15 p-1.5 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] font-mono tracking-widest uppercase" style={{ color: clickedNode.color }}>
                  // {clickedNode.type === 'tech' ? 'ESPECIALIDADE TÉCNICA' : 'SISTEMA DESENVOLVIDO'}
                </span>
                <h3 className="font-serif font-black text-3xl text-white leading-none">
                  {clickedNode.name}
                </h3>
              </div>

              {/* Visual representation */}
              {clickedNode.type === 'project' && clickedNode.image ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/5 bg-zinc-900 group">
                  <img 
                    src={clickedNode.image} 
                    alt={clickedNode.name} 
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                </div>
              ) : (
                <div className="relative h-28 w-full overflow-hidden rounded-lg border border-white/5 bg-white/[0.01] flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,132,255,0.06),transparent_60%)]" />
                  <LogoSVG className="w-16 h-16 opacity-30 drop-shadow-[0_0_12px_rgba(0,132,255,0.2)]" />
                </div>
              )}

              {/* Description & Details */}
              <div className="flex flex-col gap-4">
                <p className="font-sans text-xs text-gray-400 leading-relaxed">
                  {clickedNode.details}
                </p>

                {/* Stacks/Tags */}
                <div className="flex gap-2 flex-wrap mt-1">
                  {clickedNode.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded bg-white/[0.02] border border-white/5 text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Link CTA for Projects */}
              {clickedNode.type === 'project' && clickedNode.link && (
                <a
                  href={clickedNode.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 text-xs font-mono tracking-widest bg-white text-black py-4 rounded-md font-bold hover:bg-zinc-200 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 cursor-pointer"
                >
                  ACESSAR PROJETO NO AR
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              
              {clickedNode.type === 'tech' && (
                <button
                  onClick={() => setClickedNode(null)}
                  className="w-full text-center text-xs font-mono tracking-widest text-brand-primary border border-brand-primary/30 py-4 rounded-md hover:bg-brand-primary hover:text-black transition-all duration-300 cursor-pointer font-bold"
                >
                  [ ENVOLVER TECNOLOGIA EM MEU PROJETO ]
                </button>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
