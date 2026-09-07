'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ArchitecturalStage3D({ theme = 'dark', className = '' }) {
    const mountRef = useRef(null);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        const width = container.clientWidth || 600;
        const height = container.clientHeight || 450;

        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
        camera.position.set(0, 0.4, 7.5);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1;
        container.appendChild(renderer.domElement);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, theme === 'dark' ? 1.4 : 1.7);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xfff5e6, 2.0);
        dirLight.position.set(5, 8, 5);
        scene.add(dirLight);

        const purpleGlowLight = new THREE.PointLight(0xAD49E1, 3.5, 15);
        purpleGlowLight.position.set(-3, 2, 2);
        scene.add(purpleGlowLight);

        const goldLight = new THREE.PointLight(0xf59e0b, 2.5, 12);
        goldLight.position.set(3, -1, 3);
        scene.add(goldLight);

        // Root Group with Mouse Parallax
        const rootGroup = new THREE.Group();
        scene.add(rootGroup);

        // Texture Loader
        const textureLoader = new THREE.TextureLoader();

        // 1. BEVELED ARCHITECTURAL PEDESTAL
        const pedestalGroup = new THREE.Group();
        pedestalGroup.position.set(0, -1.35, 0);
        rootGroup.add(pedestalGroup);

        // Top platform (Glass / Metallic slab)
        const slabGeo = new THREE.CylinderGeometry(3.6, 3.8, 0.22, 64);
        const slabMat = new THREE.MeshStandardMaterial({
            color: theme === 'dark' ? 0x1f0b35 : 0xf4f1fa,
            metalness: 0.6,
            roughness: 0.25,
            transparent: true,
            opacity: 0.95
        });
        const slab = new THREE.Mesh(slabGeo, slabMat);
        pedestalGroup.add(slab);

        // Glowing trim ring around pedestal
        const trimGeo = new THREE.TorusGeometry(3.62, 0.035, 16, 100);
        trimGeo.rotateX(Math.PI / 2);
        const trimMat = new THREE.MeshBasicMaterial({
            color: 0xAD49E1,
            transparent: true,
            opacity: 0.85
        });
        const trimMesh = new THREE.Mesh(trimGeo, trimMat);
        trimMesh.position.y = 0.11;
        pedestalGroup.add(trimMesh);

        // Outer Accent Ring (Gold)
        const goldTrimGeo = new THREE.TorusGeometry(3.78, 0.02, 16, 100);
        goldTrimGeo.rotateX(Math.PI / 2);
        const goldTrimMat = new THREE.MeshBasicMaterial({
            color: 0xf59e0b,
            transparent: true,
            opacity: 0.75
        });
        const goldTrim = new THREE.Mesh(goldTrimGeo, goldTrimMat);
        goldTrim.position.y = -0.05;
        pedestalGroup.add(goldTrim);

        // 2. THE BUILDING (Hero Element on Stage)
        const buildingGroup = new THREE.Group();
        buildingGroup.position.set(0, 0.1, 0.1);
        rootGroup.add(buildingGroup);

        const buildingTex = textureLoader.load('/conference-2026/building-clean.png');
        buildingTex.colorSpace = THREE.SRGBColorSpace;

        // Building Plane (Ratio: 552 x 327 -> ~1.688)
        const bWidth = 4.4;
        const bHeight = bWidth / (552 / 327);
        const buildingGeo = new THREE.PlaneGeometry(bWidth, bHeight);
        const buildingMat = new THREE.MeshStandardMaterial({
            map: buildingTex,
            transparent: true,
            roughness: 0.35,
            metalness: 0.15,
            side: THREE.DoubleSide
        });
        const buildingMesh = new THREE.Mesh(buildingGeo, buildingMat);
        buildingMesh.position.set(0, 0.15, 0);
        buildingGroup.add(buildingMesh);

        // Soft ground shadow beneath building
        const shadowTexCanvas = document.createElement('canvas');
        shadowTexCanvas.width = 256;
        shadowTexCanvas.height = 64;
        const sCtx = shadowTexCanvas.getContext('2d');
        const grad = sCtx.createRadialGradient(128, 32, 0, 128, 32, 128);
        grad.addColorStop(0, 'rgba(15, 5, 25, 0.65)');
        grad.addColorStop(0.6, 'rgba(15, 5, 25, 0.25)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        sCtx.fillStyle = grad;
        sCtx.fillRect(0, 0, 256, 64);
        const shadowTex = new THREE.CanvasTexture(shadowTexCanvas);

        const shadowGeo = new THREE.PlaneGeometry(4.2, 1.2);
        const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0.7 });
        const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
        shadowMesh.rotation.x = -Math.PI / 2;
        shadowMesh.position.set(0, -1.18, 0.2);
        rootGroup.add(shadowMesh);

        // 3. FLOATING INSTITUTE LOGO MEDALLION (Upper Right)
        const medallionGroup = new THREE.Group();
        medallionGroup.position.set(2.1, 1.35, 0.4);
        rootGroup.add(medallionGroup);

        // 3D Coin/Medallion Disc
        const coinGeo = new THREE.CylinderGeometry(0.58, 0.58, 0.07, 48);
        coinGeo.rotateX(Math.PI / 2);
        const coinMat = new THREE.MeshStandardMaterial({
            color: 0x2e0d42,
            metalness: 0.85,
            roughness: 0.2
        });
        const coinMesh = new THREE.Mesh(coinGeo, coinMat);
        medallionGroup.add(coinMesh);

        // Gold Bezel Ring
        const bezelGeo = new THREE.TorusGeometry(0.59, 0.035, 16, 48);
        const bezelMat = new THREE.MeshStandardMaterial({
            color: 0xf59e0b,
            metalness: 0.9,
            roughness: 0.2
        });
        const bezelMesh = new THREE.Mesh(bezelGeo, bezelMat);
        medallionGroup.add(bezelMesh);

        // Institute Logo Face Texture
        const logoTex = textureLoader.load('/logo.png');
        logoTex.colorSpace = THREE.SRGBColorSpace;
        const logoFaceGeo = new THREE.CircleGeometry(0.53, 36);
        const logoFaceMat = new THREE.MeshBasicMaterial({
            map: logoTex,
            transparent: true
        });
        const logoFace = new THREE.Mesh(logoFaceGeo, logoFaceMat);
        logoFace.position.z = 0.04;
        medallionGroup.add(logoFace);

        // 4. 70TH ANNIVERSARY LUXURY PEDESTAL PLAQUE (Center Front)
        const plaqueCanvas = document.createElement('canvas');
        plaqueCanvas.width = 512;
        plaqueCanvas.height = 128;
        const pCtx = plaqueCanvas.getContext('2d');

        // Draw Plaque Canvas
        pCtx.fillStyle = theme === 'dark' ? '#3c1356' : '#ffffff';
        pCtx.strokeStyle = '#d97706'; // Amber / Gold border
        pCtx.lineWidth = 4;
        pCtx.beginPath();
        pCtx.roundRect(10, 10, 492, 108, 24);
        pCtx.fill();
        pCtx.stroke();

        // 70 Graphic & Typography
        pCtx.fillStyle = '#f59e0b';
        pCtx.font = '900 40px "Segoe UI", sans-serif';
        pCtx.textAlign = 'center';
        pCtx.fillText('70 YEARS', 256, 54);

        pCtx.fillStyle = theme === 'dark' ? '#EBD3F8' : '#60318e';
        pCtx.font = 'bold 20px "Segoe UI", sans-serif';
        pCtx.fillText('1956 — 2026 • IICE TSU', 256, 92);

        const plaqueTex = new THREE.CanvasTexture(plaqueCanvas);
        const plaqueGeo = new THREE.PlaneGeometry(2.2, 0.55);
        const plaqueMat = new THREE.MeshBasicMaterial({ map: plaqueTex, transparent: true });
        const plaqueMesh = new THREE.Mesh(plaqueGeo, plaqueMat);
        plaqueMesh.position.set(0, -1.22, 1.6);
        plaqueMesh.rotation.x = -0.15; // Slanted up toward camera
        rootGroup.add(plaqueMesh);

        // 5. AMBIENT PARTICLES (Ion Sparkles)
        const particleCount = 45;
        const particleGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const speeds = [];

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 8;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
            speeds.push({
                y: 0.003 + Math.random() * 0.006,
                x: (Math.random() - 0.5) * 0.002
            });
        }
        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particleMat = new THREE.PointsMaterial({
            color: 0xf3e8ff,
            size: 0.07,
            transparent: true,
            opacity: 0.65,
            blending: THREE.AdditiveBlending
        });
        const particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);

        // Mouse Parallax
        let targetRotY = 0;
        let targetRotX = 0;

        const onMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
            targetRotY = x * 0.25;
            targetRotX = y * 0.15;
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });

        // Animation Loop
        let animId;
        let clock = new THREE.Clock();

        const animate = () => {
            animId = requestAnimationFrame(animate);
            const elapsed = clock.getElapsedTime();

            // Smooth parallax interpolation
            rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.05;
            rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.05;

            // Medallion gentle floating bobbing & tilt
            medallionGroup.position.y = 1.35 + Math.sin(elapsed * 1.8) * 0.07;
            medallionGroup.rotation.y = Math.sin(elapsed * 1.2) * 0.18;

            // Trim subtle pulse
            trimMesh.material.opacity = 0.65 + Math.sin(elapsed * 2) * 0.25;

            // Particle drift
            const posAttr = particleGeo.attributes.position;
            for (let i = 0; i < particleCount; i++) {
                let y = posAttr.getY(i) + speeds[i].y;
                let x = posAttr.getX(i) + speeds[i].x;
                if (y > 3) y = -2.5;
                posAttr.setY(i, y);
                posAttr.setX(i, x);
            }
            posAttr.needsUpdate = true;

            renderer.render(scene, camera);
        };
        animate();

        // Resize Observer
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
