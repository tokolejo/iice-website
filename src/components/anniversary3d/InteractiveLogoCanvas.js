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

        // Dynamic elements for animation
        const animators = [];

        // Helper: Create Laurel Wreath Canvas Texture
        const createLaurelTexture = () => {
            const c = document.createElement('canvas');
            c.width = 512;
            c.height = 512;
            const ctx = c.getContext('2d');
            ctx.clearRect(0, 0, 512, 512);

            // Draw circular laurel branch wreath
            ctx.save();
            ctx.translate(256, 256);
            ctx.strokeStyle = '#f59e0b';
            ctx.fillStyle = '#fbbf24';
            ctx.lineWidth = 4;

            for (let side = -1; side <= 1; side += 2) {
                ctx.save();
                ctx.scale(side, 1);
                ctx.beginPath();
                ctx.arc(0, 0, 190, Math.PI * 0.25, Math.PI * 0.85);
                ctx.stroke();

                // Draw leaves along the arc
                for (let a = Math.PI * 0.25; a <= Math.PI * 0.85; a += 0.08) {
                    const lx = Math.cos(a) * 190;
                    const ly = Math.sin(a) * 190;
                    ctx.save();
                    ctx.translate(lx, ly);
                    ctx.rotate(a + Math.PI / 2 + 0.3);
                    ctx.beginPath();
                    ctx.ellipse(0, 0, 16, 7, 0, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                    ctx.restore();
                }
                ctx.restore();
            }
            ctx.restore();
            return new THREE.CanvasTexture(c);
        };

        // ==========================================
        // BUILD SPECIFIC SCENE ACCORDING TO VARIANT
        // ==========================================
        switch (variantId) {
            // ----------------------------------------------------
            // VARIANT 1: Academic Jubilee Medal & Laurel Wreath (User's Exact Motif)
            // ----------------------------------------------------
            case 1: {
                // Gold Embossed Medal Disc
                const discGeo = new THREE.CylinderGeometry(2.1, 2.1, 0.12, 64);
                discGeo.rotateX(Math.PI / 2);
                const discMat = new THREE.MeshStandardMaterial({
                    color: theme === 'dark' ? 0x2e0d42 : 0xffffff,
                    metalness: 0.8,
                    roughness: 0.2
                });
                const disc = new THREE.Mesh(discGeo, discMat);
                rootGroup.add(disc);

                // Golden Beveled Outer Rim
                const rimGeo = new THREE.TorusGeometry(2.12, 0.06, 16, 64);
                const rimMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.2 });
                const rim = new THREE.Mesh(rimGeo, rimMat);
                rootGroup.add(rim);

                // Golden Laurel Wreath Plane
                const laurelTex = createLaurelTexture();
                const laurelGeo = new THREE.PlaneGeometry(3.9, 3.9);
                const laurelMat = new THREE.MeshBasicMaterial({ map: laurelTex, transparent: true, opacity: 0.95 });
                const laurel = new THREE.Mesh(laurelGeo, laurelMat);
                laurel.position.z = 0.07;
                rootGroup.add(laurel);

                // Central Official Institute Logo
                const logoGeo = new THREE.CircleGeometry(0.95, 48);
                const logoMat = new THREE.MeshBasicMaterial({ map: logoTex, transparent: true });
                const logoMesh = new THREE.Mesh(logoGeo, logoMat);
                logoMesh.position.z = 0.09;
                rootGroup.add(logoMesh);

                // "70" Monogram at Top of Wreath
                const top70Canvas = document.createElement('canvas');
                top70Canvas.width = 256;
                top70Canvas.height = 128;
                const tCtx = top70Canvas.getContext('2d');
                tCtx.fillStyle = '#f59e0b';
                tCtx.font = '900 52px "Segoe UI", sans-serif';
                tCtx.textAlign = 'center';
                tCtx.fillText('70', 128, 60);
                tCtx.font = 'bold 20px "Segoe UI", sans-serif';
                tCtx.fillStyle = theme === 'dark' ? '#EBD3F8' : '#7A1CAC';
                tCtx.fillText(lang === 'en' ? 'ANNIVERSARY' : 'საიუბილეო', 128, 95);

                const top70Tex = new THREE.CanvasTexture(top70Canvas);
                const top70Geo = new THREE.PlaneGeometry(1.6, 0.8);
                const top70Mat = new THREE.MeshBasicMaterial({ map: top70Tex, transparent: true });
                const top70Mesh = new THREE.Mesh(top70Geo, top70Mat);
                top70Mesh.position.set(0, 1.45, 0.1);
                rootGroup.add(top70Mesh);

                animators.push((elapsed) => {
                    disc.rotation.z = Math.sin(elapsed * 0.5) * 0.03;
                    rim.material.opacity = 0.85 + Math.sin(elapsed * 2) * 0.15;
                });
                break;
            }

            // ----------------------------------------------------
            // VARIANT 2: Architectural Elevation & Golden Seal
            // ----------------------------------------------------
            case 2: {
                // The Clean Institute Building as Centerpiece
                const bWidth = 4.2;
                const bHeight = bWidth / (552 / 327);
                const bGeo = new THREE.PlaneGeometry(bWidth, bHeight);
                const bMat = new THREE.MeshStandardMaterial({
                    map: buildingTex,
                    transparent: true,
                    roughness: 0.25,
                    metalness: 0.1
                });
                const bMesh = new THREE.Mesh(bGeo, bMat);
                bMesh.position.set(0, -0.2, 0);
                rootGroup.add(bMesh);

                // Golden Laurel Seal (Top Right corner)
                const sealGroup = new THREE.Group();
                sealGroup.position.set(1.9, 1.25, 0.3);
                rootGroup.add(sealGroup);

                const laurelTex = createLaurelTexture();
                const sealLaurelGeo = new THREE.PlaneGeometry(1.5, 1.5);
                const sealLaurelMat = new THREE.MeshBasicMaterial({ map: laurelTex, transparent: true });
                const sealLaurel = new THREE.Mesh(sealLaurelGeo, sealLaurelMat);
                sealGroup.add(sealLaurel);

                const sLogoGeo = new THREE.CircleGeometry(0.48, 36);
                const sLogoMat = new THREE.MeshBasicMaterial({ map: logoTex, transparent: true });
                const sLogo = new THREE.Mesh(sLogoGeo, sLogoMat);
                sLogo.position.z = 0.02;
                sealGroup.add(sLogo);

                // Elegant Base 70 Bar
                const baseCanvas = document.createElement('canvas');
                baseCanvas.width = 512;
                baseCanvas.height = 96;
                const bctx = baseCanvas.getContext('2d');
                bctx.fillStyle = theme === 'dark' ? '#2e0d42' : '#ffffff';
                bctx.strokeStyle = '#f59e0b';
                bctx.lineWidth = 3;
                bctx.beginPath();
                bctx.roundRect(8, 8, 496, 80, 20);
                bctx.fill();
                bctx.stroke();

                bctx.fillStyle = '#f59e0b';
                bctx.font = '900 36px "Segoe UI", sans-serif';
                bctx.textAlign = 'center';
                bctx.fillText(lang === 'en' ? '70 YEARS • 1956 — 2026' : '70 წელი • 1956 — 2026', 256, 58);

                const baseTex = new THREE.CanvasTexture(baseCanvas);
                const baseGeo = new THREE.PlaneGeometry(3.0, 0.58);
                const baseMat = new THREE.MeshBasicMaterial({ map: baseTex, transparent: true });
                const baseMesh = new THREE.Mesh(baseGeo, baseMat);
                baseMesh.position.set(0, -1.35, 0.15);
                rootGroup.add(baseMesh);

                animators.push((elapsed) => {
                    sealGroup.position.y = 1.25 + Math.sin(elapsed * 1.5) * 0.06;
                    sealGroup.rotation.y = Math.sin(elapsed * 1.0) * 0.15;
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
