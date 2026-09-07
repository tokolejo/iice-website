'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * 10 Distinct Interactive Three.js / Canvas Scenes for IICE 70th Anniversary
 * Each variant features the institute identity, logo, 70 years, and unique scientific interactions.
 */

export default function InteractiveLogoCanvas({ variantId = 1, theme = 'dark', lang = 'ka' }) {
    const mountRef = useRef(null);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        const width = container.clientWidth || 550;
        const height = container.clientHeight || 420;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
        camera.position.set(0, 0, 7.5);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        container.appendChild(renderer.domElement);

        // Ambient Light
        const ambientLight = new THREE.AmbientLight(0xffffff, theme === 'dark' ? 1.6 : 2.0);
        scene.add(ambientLight);

        // Directional Light
        const dirLight = new THREE.DirectionalLight(0xfffbeb, 2.5);
        dirLight.position.set(4, 6, 5);
        scene.add(dirLight);

        // Accent Point Lights (Purple & Gold)
        const purpleLight = new THREE.PointLight(0xAD49E1, 3.5, 15);
        purpleLight.position.set(-4, 2, 3);
        scene.add(purpleLight);

        const goldLight = new THREE.PointLight(0xf59e0b, 3.0, 14);
        goldLight.position.set(4, -2, 3);
        scene.add(goldLight);

        // Root Group with Mouse Parallax
        const rootGroup = new THREE.Group();
        scene.add(rootGroup);

        const textureLoader = new THREE.TextureLoader();
        const logoTex = textureLoader.load('/logo.png');
        logoTex.colorSpace = THREE.SRGBColorSpace;
        const buildingTex = textureLoader.load('/conference-2026/building-clean.png');
        buildingTex.colorSpace = THREE.SRGBColorSpace;

        const geoEmblemTex = textureLoader.load('/conference-2026/iice-70-emblem-geo.png');
        geoEmblemTex.colorSpace = THREE.SRGBColorSpace;
        const engEmblemTex = textureLoader.load('/conference-2026/iice-70-emblem-eng.png');
        engEmblemTex.colorSpace = THREE.SRGBColorSpace;
        const darkEmblemTex = textureLoader.load('/conference-2026/iice-70-emblem-dark.jpg');
        darkEmblemTex.colorSpace = THREE.SRGBColorSpace;
        const classicEmblemTex = textureLoader.load('/conference-2026/iice-70-emblem-classic.jpg');
        classicEmblemTex.colorSpace = THREE.SRGBColorSpace;

        // Dynamic elements for animation
        const animators = [];

        // Helper: Create Golden Particle Ring
        const createGoldenParticles = (count = 40, radius = 2.4) => {
            const pGeo = new THREE.BufferGeometry();
            const pos = new Float32Array(count * 3);
            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 2;
                pos[i * 3] = Math.cos(angle) * (radius + (Math.random() - 0.5) * 0.4);
                pos[i * 3 + 1] = Math.sin(angle) * (radius + (Math.random() - 0.5) * 0.4);
                pos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
            }
            pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
            const pMat = new THREE.PointsMaterial({
                color: 0xf59e0b,
                size: 0.04,
                transparent: true,
                opacity: 0.75,
                blending: THREE.AdditiveBlending
            });
            return new THREE.Points(pGeo, pMat);
        };

        // ==========================================
        // BUILD SPECIFIC SCENE ACCORDING TO VARIANT
        // ==========================================
        switch (variantId) {
            // ----------------------------------------------------
            // VARIANT 1: Official Georgian TSU IICE Jubilee Emblem (Realistic Building & Trees, No Wheat)
            // ----------------------------------------------------
            case 1: {
                // High-Res Official Georgian Emblem Plane
                const emblemGeo = new THREE.PlaneGeometry(5.0, 5.0);
                const emblemMat = new THREE.MeshStandardMaterial({
                    map: geoEmblemTex,
                    transparent: true,
                    roughness: 0.25,
                    metalness: 0.25
                });
                const emblemMesh = new THREE.Mesh(emblemGeo, emblemMat);
                emblemMesh.position.set(0, 0, 0);
                rootGroup.add(emblemMesh);

                // Subtle 3D Depth Golden Halo Ring in Background
                const haloGeo = new THREE.TorusGeometry(2.25, 0.02, 16, 64);
                const haloMat = new THREE.MeshStandardMaterial({
                    color: 0xf59e0b,
                    metalness: 0.9,
                    roughness: 0.2,
                    transparent: true,
                    opacity: 0.6
                });
                const halo = new THREE.Mesh(haloGeo, haloMat);
                halo.position.set(0.65, 0.1, -0.08);
                rootGroup.add(halo);

                // Orbiting Golden Sparkle Points
                const particles = createGoldenParticles(50, 2.3);
                particles.position.set(0.65, 0.1, -0.05);
                rootGroup.add(particles);

                animators.push((elapsed) => {
                    halo.rotation.z = elapsed * 0.15;
                    particles.rotation.z = -elapsed * 0.08;
                    emblemMesh.position.y = Math.sin(elapsed * 1.5) * 0.04;
                });
                break;
            }

            // ----------------------------------------------------
            // VARIANT 2: Official English TSU IICE Jubilee Emblem (International Edition)
            // ----------------------------------------------------
            case 2: {
                const emblemGeo = new THREE.PlaneGeometry(5.0, 5.0);
                const emblemMat = new THREE.MeshStandardMaterial({
                    map: engEmblemTex,
                    transparent: true,
                    roughness: 0.25,
                    metalness: 0.25
                });
                const emblemMesh = new THREE.Mesh(emblemGeo, emblemMat);
                emblemMesh.position.set(0, 0, 0);
                rootGroup.add(emblemMesh);

                // Elegant Atomic Orbital Ring
                const ringGeo = new THREE.TorusGeometry(2.35, 0.02, 16, 80);
                const ringMat = new THREE.MeshStandardMaterial({
                    color: 0xAD49E1,
                    metalness: 0.8,
                    roughness: 0.3,
                    transparent: true,
                    opacity: 0.7
                });
                const ring = new THREE.Mesh(ringGeo, ringMat);
                ring.rotation.x = Math.PI / 4;
                ring.position.set(0.65, 0.1, -0.08);
                rootGroup.add(ring);

                const particles = createGoldenParticles(40, 2.35);
                particles.position.set(0.65, 0.1, -0.05);
                rootGroup.add(particles);

                animators.push((elapsed) => {
                    ring.rotation.z = elapsed * 0.2;
                    particles.rotation.z = -elapsed * 0.1;
                    emblemMesh.position.y = Math.sin(elapsed * 1.5) * 0.04;
                });
                break;
            }

            // ----------------------------------------------------
            // VARIANT 3: Dark Mode Luxury Keynote Edition (Luminescent 3D)
            // ----------------------------------------------------
            case 3: {
                const emblemGeo = new THREE.PlaneGeometry(5.0, 5.0);
                const emblemMat = new THREE.MeshStandardMaterial({
                    map: darkEmblemTex,
                    roughness: 0.2,
                    metalness: 0.4
                });
                const emblemMesh = new THREE.Mesh(emblemGeo, emblemMat);
                emblemMesh.position.set(0, 0, 0);
                rootGroup.add(emblemMesh);

                const particles = createGoldenParticles(60, 2.4);
                particles.position.set(0, 0, 0.05);
                rootGroup.add(particles);

                animators.push((elapsed) => {
                    particles.rotation.z = elapsed * 0.06;
                    emblemMesh.position.y = Math.sin(elapsed * 1.2) * 0.03;
                });
                break;
            }

            // ----------------------------------------------------
            // VARIANT 4: Classic Gold Academic Jubilee Ring
            // ----------------------------------------------------
            case 4: {
                const emblemGeo = new THREE.PlaneGeometry(5.0, 5.0);
                const emblemMat = new THREE.MeshStandardMaterial({
                    map: classicEmblemTex,
                    roughness: 0.3,
                    metalness: 0.2
                });
                const emblemMesh = new THREE.Mesh(emblemGeo, emblemMat);
                emblemMesh.position.set(0, 0, 0);
                rootGroup.add(emblemMesh);

                animators.push((elapsed) => {
                    emblemMesh.position.y = Math.sin(elapsed * 1.2) * 0.03;
                });
                break;
            }

            // ----------------------------------------------------
            // VARIANT 3: Atomic Orbitals & Electrochemistry
            // ----------------------------------------------------
            case 3: {
                // Central Institute Emblem Disc
                const coreGeo = new THREE.CircleGeometry(1.2, 48);
                const coreMat = new THREE.MeshBasicMaterial({ map: logoTex, transparent: true });
                const coreMesh = new THREE.Mesh(coreGeo, coreMat);
                rootGroup.add(coreMesh);

                // Multi-Axis Glowing Torus Orbitals
                const createRing = (rx, ry, rz, color) => {
                    const geo = new THREE.TorusGeometry(2.3, 0.025, 16, 80);
                    const mat = new THREE.MeshStandardMaterial({
                        color,
                        metalness: 0.9,
                        roughness: 0.2,
                        transparent: true,
                        opacity: 0.85
                    });
                    const m = new THREE.Mesh(geo, mat);
                    m.rotation.set(rx, ry, rz);
                    rootGroup.add(m);
                    return m;
                };

                const r1 = createRing(0.4, 0.3, 0.6, 0xAD49E1);
                const r2 = createRing(-0.5, 0.4, -0.7, 0xf59e0b);
                const r3 = createRing(1.1, 0.2, 0.1, 0x10b981);

                // Orbiting Electrons
                const eGeo = new THREE.SphereGeometry(0.1, 16, 16);
                const eMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
                const electron1 = new THREE.Mesh(eGeo, eMat);
                const electron2 = new THREE.Mesh(eGeo, eMat);
                rootGroup.add(electron1);
                rootGroup.add(electron2);

                animators.push((elapsed) => {
                    r1.rotation.z = 0.6 + elapsed * 0.25;
                    r2.rotation.z = -0.7 - elapsed * 0.2;
                    r3.rotation.y = 0.2 + elapsed * 0.18;

                    electron1.position.set(Math.cos(elapsed * 2) * 2.3, Math.sin(elapsed * 2) * 1.5, Math.sin(elapsed * 2) * 0.8);
                    electron2.position.set(Math.cos(elapsed * 1.7 + Math.PI) * 2.1, Math.sin(elapsed * 1.7 + Math.PI) * 1.8, Math.cos(elapsed * 1.7) * 0.9);
                });
                break;
            }

            // ----------------------------------------------------
            // VARIANT 4: Electrochemical Cell & Ionic Flow
            // ----------------------------------------------------
            case 4: {
                // Central Emblem
                const logoMesh = new THREE.Mesh(new THREE.CircleGeometry(1.1, 48), new THREE.MeshBasicMaterial({ map: logoTex, transparent: true }));
                rootGroup.add(logoMesh);

                // Dual Cathode / Anode Energy Arcs (Electrochemistry)
                const arcGeo = new THREE.TorusGeometry(2.0, 0.04, 16, 64, Math.PI * 0.9);
                const arcMat1 = new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.9, roughness: 0.2 });
                const arc1 = new THREE.Mesh(arcGeo, arcMat1);
                arc1.rotation.z = Math.PI * 0.05;
                rootGroup.add(arc1);

                const arcMat2 = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.2 });
                const arc2 = new THREE.Mesh(arcGeo, arcMat2);
                arc2.rotation.z = Math.PI * 1.05;
                rootGroup.add(arc2);

                // Rising electrochemical ion bubbles
                const bubbleCount = 24;
                const bubbleGeo = new THREE.BufferGeometry();
                const pos = new Float32Array(bubbleCount * 3);
                for (let i = 0; i < bubbleCount; i++) {
                    pos[i * 3] = (Math.random() - 0.5) * 3.5;
                    pos[i * 3 + 1] = (Math.random() - 0.5) * 3;
                    pos[i * 3 + 2] = (Math.random() - 0.5) * 2;
                }
                bubbleGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
                const bubbleMat = new THREE.PointsMaterial({ color: 0x67e8f9, size: 0.08, transparent: true, opacity: 0.8 });
                const bubbles = new THREE.Points(bubbleGeo, bubbleMat);
                rootGroup.add(bubbles);

                animators.push((elapsed) => {
                    arc1.rotation.z += 0.005;
                    arc2.rotation.z -= 0.005;
                    const p = bubbleGeo.attributes.position;
                    for (let i = 0; i < bubbleCount; i++) {
                        let y = p.getY(i) + 0.01;
                        if (y > 2.2) y = -2.2;
                        p.setY(i, y);
                    }
                    p.needsUpdate = true;
                });
                break;
            }

            // ----------------------------------------------------
            // VARIANT 5: Inorganic Crystal Lattice (Octahedron & Bonds)
            // ----------------------------------------------------
            case 5: {
                // Central Logo Disc
                const logoMesh = new THREE.Mesh(new THREE.CircleGeometry(1.0, 48), new THREE.MeshBasicMaterial({ map: logoTex, transparent: true }));
                rootGroup.add(logoMesh);

                // Rotating Wireframe Octahedron (Coordination chemistry)
                const octGeo = new THREE.OctahedronGeometry(2.5, 0);
                const octEdges = new THREE.EdgesGeometry(octGeo);
                const octMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, linewidth: 2 });
                const octLines = new THREE.LineSegments(octEdges, octMat);
                rootGroup.add(octLines);

                // Outer Icosahedron Wireframe
                const icoGeo = new THREE.IcosahedronGeometry(2.8, 0);
                const icoEdges = new THREE.EdgesGeometry(icoGeo);
                const icoMat = new THREE.LineBasicMaterial({ color: 0xAD49E1, transparent: true, opacity: 0.6 });
                const icoLines = new THREE.LineSegments(icoEdges, icoMat);
                rootGroup.add(icoLines);

                animators.push((elapsed) => {
                    octLines.rotation.x = elapsed * 0.3;
                    octLines.rotation.y = elapsed * 0.4;
                    icoLines.rotation.x = -elapsed * 0.2;
                    icoLines.rotation.y = -elapsed * 0.25;
                });
                break;
            }

            // ----------------------------------------------------
            // VARIANT 6: Green Hydrogen & Clean Energy Wave
            // ----------------------------------------------------
            case 6: {
                // Central Logo
                const logoMesh = new THREE.Mesh(new THREE.CircleGeometry(1.05, 48), new THREE.MeshBasicMaterial({ map: logoTex, transparent: true }));
                rootGroup.add(logoMesh);

                // Flowing Eco Wave Ribbons
                const waveGroup = new THREE.Group();
                rootGroup.add(waveGroup);

                const ringGeo = new THREE.TorusGeometry(2.2, 0.04, 16, 100);
                const ringMat = new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.8, roughness: 0.2 });
                const waveRing1 = new THREE.Mesh(ringGeo, ringMat);
                waveRing1.rotation.x = Math.PI / 2.5;
                waveGroup.add(waveRing1);

                const ringMat2 = new THREE.MeshStandardMaterial({ color: 0x06b6d4, metalness: 0.8, roughness: 0.2 });
                const waveRing2 = new THREE.Mesh(ringGeo, ringMat2);
                waveRing2.rotation.x = -Math.PI / 2.5;
                waveGroup.add(waveRing2);

                animators.push((elapsed) => {
                    waveRing1.rotation.z = elapsed * 0.4;
                    waveRing2.rotation.z = -elapsed * 0.35;
                    waveGroup.rotation.y = Math.sin(elapsed * 0.8) * 0.2;
                });
                break;
            }

            // ----------------------------------------------------
            // VARIANT 7: Glass Prism Monolith & Caustic Glint
            // ----------------------------------------------------
            case 7: {
                // Glass Slab
                const slabGeo = new THREE.BoxGeometry(4.4, 2.8, 0.15);
                const slabMat = new THREE.MeshPhysicalMaterial({
                    color: theme === 'dark' ? 0x2e0d42 : 0xffffff,
                    metalness: 0.1,
                    roughness: 0.1,
                    transmission: 0.8,
                    thickness: 0.8,
                    transparent: true,
                    opacity: 0.85,
                    clearcoat: 1.0
                });
                const slab = new THREE.Mesh(slabGeo, slabMat);
                rootGroup.add(slab);

                // Beveled Edges
                const edges = new THREE.LineSegments(new THREE.EdgesGeometry(slabGeo), new THREE.LineBasicMaterial({ color: 0xf59e0b }));
                rootGroup.add(edges);

                // Building inside
                const bWidth = 3.6;
                const bHeight = bWidth / (552 / 327);
                const bMesh = new THREE.Mesh(new THREE.PlaneGeometry(bWidth, bHeight), new THREE.MeshStandardMaterial({ map: buildingTex, transparent: true }));
                bMesh.position.set(0, 0, 0.08);
                rootGroup.add(bMesh);

                // Mini seal
                const sMesh = new THREE.Mesh(new THREE.CircleGeometry(0.45, 36), new THREE.MeshBasicMaterial({ map: logoTex, transparent: true }));
                sMesh.position.set(1.6, 0.9, 0.1);
                rootGroup.add(sMesh);

                animators.push((elapsed) => {
                    slab.position.z = Math.sin(elapsed * 1.5) * 0.02;
                });
                break;
            }

            // ----------------------------------------------------
            // VARIANT 8: Jubilee Chronometer 1956 — 2026
            // ----------------------------------------------------
            case 8: {
                // Center Logo
                const logoMesh = new THREE.Mesh(new THREE.CircleGeometry(1.0, 48), new THREE.MeshBasicMaterial({ map: logoTex, transparent: true }));
                rootGroup.add(logoMesh);

                // Chronometer Dial Rings with Tick marks
                const dialGeo1 = new THREE.RingGeometry(1.5, 1.58, 64);
                const dialMat1 = new THREE.MeshBasicMaterial({ color: 0xf59e0b, side: THREE.DoubleSide });
                const dial1 = new THREE.Mesh(dialGeo1, dialMat1);
                rootGroup.add(dial1);

                const dialGeo2 = new THREE.RingGeometry(2.0, 2.06, 64);
                const dialMat2 = new THREE.MeshBasicMaterial({ color: 0xAD49E1, side: THREE.DoubleSide });
                const dial2 = new THREE.Mesh(dialGeo2, dialMat2);
                rootGroup.add(dial2);

                animators.push((elapsed) => {
                    dial1.rotation.z = elapsed * 0.15;
                    dial2.rotation.z = -elapsed * 0.1;
                });
                break;
            }

            // ----------------------------------------------------
            // VARIANT 9: Holographic Science Sphere & Particle Cloud
            // ----------------------------------------------------
            case 9: {
                const logoMesh = new THREE.Mesh(new THREE.CircleGeometry(1.1, 48), new THREE.MeshBasicMaterial({ map: logoTex, transparent: true }));
                rootGroup.add(logoMesh);

                const sphereGeo = new THREE.SphereGeometry(2.2, 24, 24);
                const sphereMat = new THREE.MeshBasicMaterial({
                    color: 0xAD49E1,
                    wireframe: true,
                    transparent: true,
                    opacity: 0.35
                });
                const sphere = new THREE.Mesh(sphereGeo, sphereMat);
                rootGroup.add(sphere);

                animators.push((elapsed) => {
                    sphere.rotation.y = elapsed * 0.2;
                    sphere.rotation.x = Math.sin(elapsed * 0.3) * 0.2;
                });
                break;
            }

            // ----------------------------------------------------
            // VARIANT 10: Minimalist Royal Academic Crest (Clean Luxury)
            // ----------------------------------------------------
            case 10:
            default: {
                // Multi-layered Octagonal Academic Crest
                const crestGeo = new THREE.CylinderGeometry(2.0, 2.0, 0.08, 8);
                crestGeo.rotateX(Math.PI / 2);
                const crestMat = new THREE.MeshStandardMaterial({
                    color: theme === 'dark' ? 0x220735 : 0xffffff,
                    metalness: 0.85,
                    roughness: 0.25
                });
                const crest = new THREE.Mesh(crestGeo, crestMat);
                rootGroup.add(crest);

                const edgeLines = new THREE.LineSegments(
                    new THREE.EdgesGeometry(crestGeo),
                    new THREE.LineBasicMaterial({ color: 0xf59e0b, linewidth: 2 })
                );
                rootGroup.add(edgeLines);

                const laurelTex = createLaurelTexture();
                const laurelMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 3.2), new THREE.MeshBasicMaterial({ map: laurelTex, transparent: true }));
                laurelMesh.position.z = 0.05;
                rootGroup.add(laurelMesh);

                const logoMesh = new THREE.Mesh(new THREE.CircleGeometry(0.85, 48), new THREE.MeshBasicMaterial({ map: logoTex, transparent: true }));
                logoMesh.position.z = 0.07;
                rootGroup.add(logoMesh);

                animators.push((elapsed) => {
                    crest.rotation.z = Math.sin(elapsed * 0.4) * 0.02;
                    edgeLines.rotation.z = crest.rotation.z;
                });
                break;
            }
        }

        // Mouse Parallax Tilt
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

            rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.05;
            rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.05;

            // Execute component animators
            for (const fn of animators) {
                fn(elapsed);
            }

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
    }, [variantId, theme, lang]);

    return (
        <div className="relative w-full h-full min-h-[360px] sm:min-h-[420px] flex items-center justify-center select-none">
            <div ref={mountRef} className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing" />
        </div>
    );
}
