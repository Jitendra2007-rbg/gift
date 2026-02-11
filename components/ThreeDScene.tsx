import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeDScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    // Transparent background
    scene.background = null; 
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // 2. Create Geometry - Intertwined Torus Knots representing eternal connection
    const geometry1 = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material1 = new THREE.MeshPhysicalMaterial({
      color: 0xf472b6, // Pink
      metalness: 0.3,
      roughness: 0.4,
      transparent: true,
      opacity: 0.9,
      transmission: 0.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });
    const knot1 = new THREE.Mesh(geometry1, material1);
    scene.add(knot1);

    const geometry2 = new THREE.TorusKnotGeometry(1.2, 0.2, 100, 16);
    const material2 = new THREE.MeshPhysicalMaterial({
      color: 0xfbcfe8, // Lighter pink
      metalness: 0.5,
      roughness: 0.2,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const knot2 = new THREE.Mesh(geometry2, material2);
    scene.add(knot2);

    // Add floating particles around the knots
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xfce7f3, // Very light pink
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xff007f, 2, 50);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00ffff, 1, 50);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    // 4. Animation Loop
    let clock = new THREE.Clock();
    let reqId: number;

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle rotation and floating
      knot1.rotation.y = elapsedTime * 0.2;
      knot1.rotation.x = elapsedTime * 0.1;
      knot1.position.y = Math.sin(elapsedTime * 0.5) * 0.2;

      knot2.rotation.y = -elapsedTime * 0.15;
      knot2.rotation.x = -elapsedTime * 0.2;
      knot2.position.y = Math.sin(elapsedTime * 0.5 + Math.PI) * 0.2;

      particlesMesh.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // 5. Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(reqId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry1.dispose();
      material1.dispose();
      geometry2.dispose();
      material2.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 z-0 pointer-events-none opacity-60"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
};
