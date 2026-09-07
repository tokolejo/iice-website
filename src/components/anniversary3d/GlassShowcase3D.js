'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function GlassShowcase3D({ theme = 'dark', className = '' }) {
    const mountRef = useRef(null);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        const width = container.clientWidth || 600;
        const height = container.clientHeight || 450;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
        camera.position.set(0, 0, 7.2);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        container.appendChild(renderer.domElement);

        // Ambient & Dynamic Cursor Light
        const ambientLight = new THREE.AmbientLight(0xffffff, theme === 'dark' ? 1.6 : 1.9);
        scene.add(ambientLight);

        // Dynamic mouse spotlight (gives rich glass glints and specular reflections)
        const spotLight = new THREE.SpotLight(0xffffff, 4.0, 15, Math.PI / 4, 0.4);
        spotLight.position.set(0, 3, 6);
        scene.add(spotLight);

        const purpleRim = new THREE.PointLight(0xAD49E1, 3.0, 10);
        purpleRim.position.set(-3, -2, 2);
        scene.add(purpleRim);

        const goldRim = new THREE.PointLight(0xf59e0b, 2.5, 10);
        goldRim.position.set(3, 2, 2);
        scene.add(goldRim);

        const rootGroup = new THREE.Group();
        scene.add(rootGroup);

        const textureLoader = new THREE.TextureLoader();

        // 1. REFINED GLASS CRYSTAL BACKDROP & FRAME
        // Back Glass Prism Panel
        const glassGeo = new THREE.BoxGeometry(4.8, 3.2, 0.12);
        const glassMat = new THREE.MeshPhysicalMaterial({
            color: theme === 'dark' ? 0x240938 : 0xffffff,
            metalness: 0.1,
            roughness: 0.1,
            transmission: 0.7,
            thickness: 0.5,
            transparent: true,
            opacity: theme === 'dark' ? 0.75 : 0.85,
            reflectivity: 0.9,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1
        });
        const glassMesh = new THREE.Mesh(glassGeo, glassMat);
        glassMesh.position.set(0, 0, -0.15);
        rootGroup.add(glassMesh);

        // Elegant Brushed Gold / Metallic Outer Trim
        const frameEdges = new THREE.EdgesGeometry(glassGeo);
        const frameLineMat = new THREE.LineBasicMaterial({
            color: theme === 'dark' ? 0xf59e0b : 0xAD49E1,
            linewidth: 2,
            transparent: true,
            opacity: 0.8
        });
        const frameLines = new THREE.LineSegments(frameEdges, frameLineMat);
        frameLines.position.set(0, 0, -0.15);
        rootGroup.add(frameLines);

        // 2. THE CLEAN BUILDING (Suspended inside crystal frame)
        const buildingTex = textureLoader.load('/conference-2026/building-clean.png');
        buildingTex.colorSpace = THREE.SRGBColorSpace;

        const bWidth = 4.1;
        const bHeight = bWidth / (552 / 327);
        const buildingGeo = new THREE.PlaneGeometry(bWidth, bHeight);
        const buildingMat = new THREE.MeshStandardMaterial({
            map: buildingTex,
            transparent: true,
            roughness: 0.25,
            metalness: 0.1,
            side: THREE.DoubleSide
        });
        const buildingMesh = new THREE.Mesh(buildingGeo, buildingMat);
        buildingMesh.position.set(0, 0.05, 0.05);
        rootGroup.add(buildingMesh);

        // 3. MINIMALIST EMBOSSED IICE SEAL (Top-Right Glass Corner)
        const sealGroup = new THREE.Group();
        sealGroup.position.set(1.9, 1.15, 0.12);
        rootGroup.add(sealGroup);

        const sealTex = textureLoader.load('/logo.png');
        sealTex.colorSpace = THREE.SRGBColorSpace;
        const sealGeo = new THREE.CircleGeometry(0.42, 36);
        const sealMat = new THREE.MeshBasicMaterial({ map: sealTex, transparent: true });
        const sealMesh = new THREE.Mesh(sealGeo, sealMat);
        sealGroup.add(sealMesh);

        // Thin Gold Outline around Seal
        const sealRingGeo = new THREE.RingGeometry(0.42, 0.44, 36);
        const sealRingMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, side: THREE.DoubleSide });
        const sealRing = new THREE.Mesh(sealRingGeo, sealRingMat);
        sealRing.position.z = 0.01;
        sealGroup.add(sealRing);

        // 4. PRECISION TYPOGRAPHY BAR (Bottom Edge of Crystal)
        const barCanvas = document.createElement('canvas');
        barCanvas.width = 600;
        barCanvas.height = 100;
        const bCtx = barCanvas.getContext('2d');

        bCtx.fillStyle = theme === 'dark' ? '#1f092e' : '#f8fafc';
        bCtx.strokeStyle = theme === 'dark' ? '#7A1CAC' : '#cbd5e1';
        bCtx.lineWidth = 2;
        bCtx.beginPath();
        bCtx.roundRect(4, 4, 592, 92, 16);
        bCtx.fill();
        bCtx.stroke();

        // 70 Monogram
        bCtx.fillStyle = '#f59e0b';
        bCtx.font = '900 34px "Segoe UI", sans-serif';
        bCtx.textAlign = 'left';
        bCtx.fillText('70 YEARS', 32, 58);

        // Vertical divider
        bCtx.fillStyle = '#cbd5e1';
        bCtx.fillRect(215, 20, 2, 60);

        // Clean Institutional Caption
        bCtx.fillStyle = theme === 'dark' ? '#ffffff' : '#1e293b';
        bCtx.font = 'bold 15px "Segoe UI", sans-serif';
        bCtx.fillText('RAFAEL AGLADZE INSTITUTE', 235, 45);

        bCtx.fillStyle = theme === 'dark' ? '#d8b4fe' : '#64748b';
        bCtx.font = '600 13px "Segoe UI", sans-serif';
        bCtx.fillText('TSU • 1956 — 2026', 235, 72);

        const barTex = new THREE.CanvasTexture(barCanvas);
        const barGeo = new THREE.PlaneGeometry(3.6, 0.6);
        const barMat = new THREE.MeshBasicMaterial({ map: barTex, transparent: true });
        const barMesh = new THREE.Mesh(barGeo, barMat);
        barMesh.position.set(0, -1.15, 0.12);
        rootGroup.add(barMesh);

        // Mouse Parallax & Spotlight Follow
        let targetRotY = 0;
        let targetRotX = 0;

        const onMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
            targetRotY = x * 0.22;
            targetRotX = y * 0.14;

            // SpotLight tracking
            spotLight.position.x = x * 4;
            spotLight.position.y = y * 3 + 2;
        };
        window.addEventListener('mousemove', onMouseMove, { passive: true });

        // Animation Loop
        let animId;
        const clock = new THREE.Clock();

        const animate = () => {
            animId = requestAnimationFrame(animate);
            const elapsed = clock.getElapsedTime();

            rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.05;
            rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.05;

            // Subtle glass refraction sheen
            glassMesh.position.z = -0.15 + Math.sin(elapsed * 1.2) * 0.01;
            frameLines.position.z = glassMesh.position.z;

            renderer.render(scene, camera);
        };
        animate();

        // Resize
        const onResize = () => {
            if (!container) return;
            const newW = container.clientWidth;
            const newH = container.clientHeight;
            camera.aspect = newW / newH;
            camera.updateProjectionMatrix();
            renderer.setSize(newW, newH);
        };
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
            cancelAnimationFrame(animId);
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, [theme]);

    return (
        <div className={`relative w-full h-full min-h-[380px] sm:min-h-[440px] flex items-center justify-center select-none ${className}`}>
            <div ref={mountRef} className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing" />
        </div>
    );
}
