'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AtomicOrbitals3D({ theme = 'dark', className = '' }) {
    const mountRef = useRef(null);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        const width = container.clientWidth || 600;
        const height = container.clientHeight || 450;

        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
        camera.position.set(0, 0, 7.8);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.15;
        container.appendChild(renderer.domElement);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, theme === 'dark' ? 1.5 : 1.8);
        scene.add(ambientLight);

        const purpleLight = new THREE.PointLight(0xAD49E1, 4.0, 16);
        purpleLight.position.set(-3.5, 3, 3);
        scene.add(purpleLight);

        const goldLight = new THREE.PointLight(0xf59e0b, 3.0, 14);
        goldLight.position.set(3.5, -2, 3);
        scene.add(goldLight);

        const rootGroup = new THREE.Group();
        scene.add(rootGroup);

        const textureLoader = new THREE.TextureLoader();

        // 1. THE CENTRAL BUILDING
        const buildingGroup = new THREE.Group();
        buildingGroup.position.set(0, -0.2, 0);
        rootGroup.add(buildingGroup);

        const buildingTex = textureLoader.load('/conference-2026/building-clean.png');
        buildingTex.colorSpace = THREE.SRGBColorSpace;

        const bWidth = 4.2;
        const bHeight = bWidth / (552 / 327);
        const buildingGeo = new THREE.PlaneGeometry(bWidth, bHeight);
        const buildingMat = new THREE.MeshStandardMaterial({
            map: buildingTex,
            transparent: true,
            roughness: 0.3,
            metalness: 0.1,
            side: THREE.DoubleSide
        });
        const buildingMesh = new THREE.Mesh(buildingGeo, buildingMat);
        buildingGroup.add(buildingMesh);

        // 2. ATOMIC ORBITAL RINGS (Chemistry & Electrochemistry Symbolism)
        const orbitalsGroup = new THREE.Group();
        rootGroup.add(orbitalsGroup);

        // Helper to create elliptical glowing rings
        const createOrbitalRing = (radiusX, radiusY, tube, color, rotX, rotY, rotZ) => {
            const curve = new THREE.EllipseCurve(0, 0, radiusX, radiusY, 0, 2 * Math.PI, false, 0);
            const points = curve.getPoints(100);
            const ringGeo = new THREE.BufferGeometry().setFromPoints(points);
            
            // Tube mesh for 3D body
            const pts3D = points.map(p => new THREE.Vector3(p.x, p.y, 0));
            const catmull = new THREE.CatmullRomCurve3(pts3D, true);
            const tubeGeo = new THREE.TubeGeometry(catmull, 96, tube, 8, true);
            
            const tubeMat = new THREE.MeshStandardMaterial({
                color: color,
                metalness: 0.8,
                roughness: 0.2,
                transparent: true,
                opacity: 0.85
            });
            const mesh = new THREE.Mesh(tubeGeo, tubeMat);
            mesh.rotation.set(rotX, rotY, rotZ);
            return { mesh, curve, rotX, rotY, rotZ };
        };

        // Ring 1: Slanted Purple Ring
        const ring1 = createOrbitalRing(3.2, 1.8, 0.025, 0xAD49E1, 0.4, 0.3, 0.6);
        orbitalsGroup.add(ring1.mesh);

        // Ring 2: Opposing Gold Ring
        const ring2 = createOrbitalRing(3.1, 1.7, 0.025, 0xf59e0b, -0.5, 0.4, -0.7);
        orbitalsGroup.add(ring2.mesh);

        // Ring 3: Horizontal Equatorial Cyan/Emerald Ring
        const ring3 = createOrbitalRing(3.4, 2.0, 0.02, 0x10b981, 1.2, 0.1, 0.2);
        orbitalsGroup.add(ring3.mesh);

        // Orbiting Electrons / Ions (Glowing Spheres)
        const electronGeo = new THREE.SphereGeometry(0.09, 16, 16);
        const electronMat1 = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const electron1 = new THREE.Mesh(electronGeo, electronMat1);
        rootGroup.add(electron1);

        const electronMat2 = new THREE.MeshBasicMaterial({ color: 0xfef08a });
        const electron2 = new THREE.Mesh(electronGeo, electronMat2);
        rootGroup.add(electron2);

        // 3. FLOATING 70TH ANNIVERSARY BADGE (Top Center - Above Building)
        const badgeGroup = new THREE.Group();
        badgeGroup.position.set(0, 1.6, 0.3);
        rootGroup.add(badgeGroup);

        // Badge Canvas
        const badgeCanvas = document.createElement('canvas');
        badgeCanvas.width = 384;
        badgeCanvas.height = 120;
        const bCtx = badgeCanvas.getContext('2d');

        // Capsule Badge background
        bCtx.fillStyle = theme === 'dark' ? '#2e0d42' : '#ffffff';
        bCtx.strokeStyle = '#f59e0b';
        bCtx.lineWidth = 3.5;
        bCtx.beginPath();
        bCtx.roundRect(6, 6, 372, 108, 30);
        bCtx.fill();
        bCtx.stroke();

        // 70 Numeral in Gold
        bCtx.fillStyle = '#f59e0b';
        bCtx.font = '900 36px "Segoe UI", sans-serif';
        bCtx.textAlign = 'center';
        bCtx.fillText('70 YEARS', 192, 48);

        // Subtitle
        bCtx.fillStyle = theme === 'dark' ? '#EBD3F8' : '#7A1CAC';
        bCtx.font = 'bold 16px "Segoe UI", sans-serif';
        bCtx.fillText('ANNIVERSARY • 1956-2026', 192, 88);

        const badgeTex = new THREE.CanvasTexture(badgeCanvas);
        const badgePlaneGeo = new THREE.PlaneGeometry(2.0, 0.62);
        const badgePlaneMat = new THREE.MeshBasicMaterial({ map: badgeTex, transparent: true });
        const badgePlane = new THREE.Mesh(badgePlaneGeo, badgePlaneMat);
        badgeGroup.add(badgePlane);

        // 4. IICE OFFICIAL LOGO SEAL (Top Left)
        const logoGroup = new THREE.Group();
        logoGroup.position.set(-2.0, 1.45, 0.3);
        rootGroup.add(logoGroup);

        const logoTex = textureLoader.load('/logo.png');
        logoTex.colorSpace = THREE.SRGBColorSpace;
        const logoGeo = new THREE.CircleGeometry(0.5, 36);
        const logoMat = new THREE.MeshBasicMaterial({ map: logoTex, transparent: true });
        const logoMesh = new THREE.Mesh(logoGeo, logoMat);
        logoGroup.add(logoMesh);

        // Outer glow halo behind logo
        const haloGeo = new THREE.CircleGeometry(0.56, 36);
        const haloMat = new THREE.MeshBasicMaterial({
            color: 0xAD49E1,
            transparent: true,
            opacity: 0.3
        });
        const haloMesh = new THREE.Mesh(haloGeo, haloMat);
        haloMesh.position.z = -0.02;
        logoGroup.add(haloMesh);

        // Mouse Parallax
        let targetRotY = 0;
        let targetRotX = 0;

        const onMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
            targetRotY = x * 0.3;
            targetRotX = y * 0.18;
        };
        window.addEventListener('mousemove', onMouseMove, { passive: true });

        // Animation Loop
        let animId;
        const clock = new THREE.Clock();

        const animate = () => {
            animId = requestAnimationFrame(animate);
            const elapsed = clock.getElapsedTime();

            // Parallax interpolation
            rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.05;
            rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.05;

            // Slow gyroscopic orbital rotation
            ring1.mesh.rotation.z = 0.6 + elapsed * 0.18;
            ring2.mesh.rotation.z = -0.7 - elapsed * 0.14;
            ring3.mesh.rotation.y = 0.1 + elapsed * 0.12;

            // Animate electron 1 on Ring 1
            const t1 = (elapsed * 0.8) % (2 * Math.PI);
            const p1 = ring1.curve.getPoint(t1 / (2 * Math.PI));
            const v1 = new THREE.Vector3(p1.x, p1.y, 0).applyEuler(new THREE.Euler(ring1.rotX, ring1.rotY, ring1.mesh.rotation.z));
            electron1.position.copy(v1);

            // Animate electron 2 on Ring 2
            const t2 = ((elapsed * 0.65) + Math.PI) % (2 * Math.PI);
            const p2 = ring2.curve.getPoint(t2 / (2 * Math.PI));
            const v2 = new THREE.Vector3(p2.x, p2.y, 0).applyEuler(new THREE.Euler(ring2.rotX, ring2.rotY, ring2.mesh.rotation.z));
            electron2.position.copy(v2);

            // Subtle bobbing for logo & badge
            badgeGroup.position.y = 1.6 + Math.sin(elapsed * 1.5) * 0.05;
            logoGroup.position.y = 1.45 + Math.sin(elapsed * 1.5 + 0.5) * 0.05;

            renderer.render(scene, camera);
        };
        animate();

        // Resize
        const onResize = () => {
            if (!container) return;
            const newW = container.clientWidth;
            const newH = container.clientHeight;
            camera.aspect = newW / newH;
            camera.updateProjectionMatrix;
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
