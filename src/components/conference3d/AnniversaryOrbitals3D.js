'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AnniversaryOrbitals3D({ className = '' }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let width = container.clientWidth || window.innerWidth;
        let height = container.clientHeight || 450;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
        camera.position.z = 24;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
        scene.add(ambientLight);

        const goldLight = new THREE.PointLight(0xf59e0b, 3, 50);
        goldLight.position.set(10, 5, 10);
        scene.add(goldLight);

        const emeraldLight = new THREE.PointLight(0x10b981, 3, 50);
        emeraldLight.position.set(-10, -5, 10);
        scene.add(emeraldLight);

        // Group positioned toward the right (framing the 70th anniversary logo)
        const orbitalCenterGroup = new THREE.Group();
        // Slightly offset toward the right half of the banner
        orbitalCenterGroup.position.set(width > 1024 ? 9 : 0, 0, 0);
        scene.add(orbitalCenterGroup);

        // 1. Multi-axis Elliptical Atomic Orbitals
        const orbitalRings = [];
        const ringConfigs = [
            { radiusX: 6.8, radiusY: 4.2, tiltX: 0.6, tiltY: 0.3, tiltZ: 0.2, color: 0xf59e0b, speed: 1.8 },
            { radiusX: 7.2, radiusY: 3.8, tiltX: -0.7, tiltY: 0.5, tiltZ: -0.4, color: 0xad49e1, speed: -2.2 },
            { radiusX: 6.5, radiusY: 4.6, tiltX: 0.2, tiltY: -0.8, tiltZ: 0.9, color: 0x10b981, speed: 2.6 },
            { radiusX: 8.0, radiusY: 3.5, tiltX: -0.3, tiltY: -0.4, tiltZ: -0.8, color: 0x38bdf8, speed: -1.5 },
        ];

        ringConfigs.forEach(cfg => {
            const curve = new THREE.EllipseCurve(
                0, 0,
                cfg.radiusX, cfg.radiusY,
                0, 2 * Math.PI,
                false,
                0
            );

            const points = curve.getPoints(100);
            const ringGeo = new THREE.BufferGeometry().setFromPoints(points);
            const ringMat = new THREE.LineBasicMaterial({
                color: cfg.color,
                transparent: true,
                opacity: 0.55,
                blending: THREE.AdditiveBlending
            });

            const ringMesh = new THREE.LineLoop(ringGeo, ringMat);
            ringMesh.rotation.set(cfg.tiltX, cfg.tiltY, cfg.tiltZ);
            orbitalCenterGroup.add(ringMesh);

            // Orbiting electron bead
            const beadGeo = new THREE.SphereGeometry(0.32, 16, 16);
            const beadMat = new THREE.MeshBasicMaterial({
                color: cfg.color,
            });
            const bead = new THREE.Mesh(beadGeo, beadMat);
            orbitalCenterGroup.add(bead);

            orbitalRings.push({
                curve,
                bead,
                tilt: [cfg.tiltX, cfg.tiltY, cfg.tiltZ],
                speed: cfg.speed,
                ringMesh
            });
        });

        // 2. Green Energy Wave Ribbons (Wind / Clean Flux passing horizontally)
        const ribbonCount = 3;
        const ribbons = [];
        const ribbonSegments = 80;

        for (let r = 0; r < ribbonCount; r++) {
            const ribbonGeo = new THREE.BufferGeometry();
            const posArray = new Float32Array((ribbonSegments + 1) * 3);
            ribbonGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

            const ribbonColor = r === 0 ? 0x10b981 : r === 1 ? 0x34d399 : 0x059669;
            const ribbonMat = new THREE.LineBasicMaterial({
                color: ribbonColor,
                transparent: true,
                opacity: 0.45 - r * 0.1,
                linewidth: 2,
            });

            const line = new THREE.Line(ribbonGeo, ribbonMat);
            scene.add(line);

            ribbons.push({
                line,
                geo: ribbonGeo,
                offsetY: (r - 1) * 4 - 2,
                freq: 0.18 + r * 0.05,
                speed: 1.4 + r * 0.4,
            });
        }

        // 3. Sparkling Energy Particles
        const particleCount = 150;
        const particleGeo = new THREE.BufferGeometry();
        const pPositions = new Float32Array(particleCount * 3);
        const pColors = new Float32Array(particleCount * 3);

        const goldC = new THREE.Color(0xfde047);
        const emeraldC = new THREE.Color(0x34d399);

        for (let i = 0; i < particleCount; i++) {
            pPositions[i * 3] = (Math.random() - 0.5) * 44;
            pPositions[i * 3 + 1] = (Math.random() - 0.5) * 22;
            pPositions[i * 3 + 2] = (Math.random() - 0.5) * 16;

            const c = i % 2 === 0 ? goldC : emeraldC;
            pColors[i * 3] = c.r;
            pColors[i * 3 + 1] = c.g;
            pColors[i * 3 + 2] = c.b;
        }

        particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
        particleGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

        const pMat = new THREE.PointsMaterial({
            size: 0.25,
            vertexColors: true,
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending
        });

        const particleCloud = new THREE.Points(particleGeo, pMat);
        scene.add(particleCloud);

        // Mouse Parallax
        let targetMouseX = 0;
        let targetMouseY = 0;
        let curMouseX = 0;
        let curMouseY = 0;

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            targetMouseX = (x - 0.5) * 4;
            targetMouseY = (y - 0.5) * -3;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const handleResize = () => {
            if (!container) return;
            width = container.clientWidth;
            height = container.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
            orbitalCenterGroup.position.x = width > 1024 ? 9 : 0;
        };

        window.addEventListener('resize', handleResize);

        let animId;
        let clock = new THREE.Clock();

        const animate = () => {
            animId = requestAnimationFrame(animate);
            const time = clock.getElapsedTime();

            curMouseX += (targetMouseX - curMouseX) * 0.05;
            curMouseY += (targetMouseY - curMouseY) * 0.05;

            // Rotate orbital group slowly
            orbitalCenterGroup.rotation.y = time * 0.15 + curMouseX * 0.1;
            orbitalCenterGroup.rotation.x = Math.sin(time * 0.1) * 0.1 - curMouseY * 0.08;

            // Move electron beads along their elliptical orbits
            orbitalRings.forEach(ring => {
                const angle = (time * ring.speed) % (2 * Math.PI);
                const pt = ring.curve.getPoint(angle / (2 * Math.PI));

                // Transform point by ring's orientation
                const v = new THREE.Vector3(pt.x, pt.y, 0);
                const euler = new THREE.Euler(ring.tilt[0], ring.tilt[1], ring.tilt[2]);
                v.applyEuler(euler);

                ring.bead.position.copy(v);
            });

            // Animate Green Energy Wave Ribbons
            ribbons.forEach(ribbon => {
                const pos = ribbon.geo.attributes.position.array;
                const startX = -26;
                const endX = 26;
                const step = (endX - startX) / ribbonSegments;

                for (let i = 0; i <= ribbonSegments; i++) {
                    const x = startX + i * step;
                    const y = ribbon.offsetY + Math.sin(x * ribbon.freq + time * ribbon.speed) * 2.2 + Math.cos(x * 0.1 - time) * 0.8;
                    const z = Math.sin(x * 0.15 + time) * 3;

                    pos[i * 3] = x;
                    pos[i * 3 + 1] = y;
                    pos[i * 3 + 2] = z;
                }
                ribbon.geo.attributes.position.needsUpdate = true;
            });

            // Particles slow rotation
            particleCloud.rotation.y = time * 0.02 + curMouseX * 0.04;

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);

            if (container && renderer.domElement && container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();
            particleGeo.dispose();
            pMat.dispose();
            ribbons.forEach(r => {
                r.geo.dispose();
                r.line.material.dispose();
            });
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 w-full h-full pointer-events-auto overflow-hidden ${className}`}
            style={{ zIndex: 1 }}
        />
    );
}
