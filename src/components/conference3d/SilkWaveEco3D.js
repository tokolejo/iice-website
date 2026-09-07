'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function SilkWaveEco3D({ className = '' }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let width = container.clientWidth || window.innerWidth;
        let height = container.clientHeight || 450;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 1000);
        camera.position.set(0, -1, 23);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
        scene.add(ambientLight);

        const purpleLight = new THREE.PointLight(0xa855f7, 3, 50);
        purpleLight.position.set(-15, 8, 12);
        scene.add(purpleLight);

        const emeraldLight = new THREE.PointLight(0x10b981, 4, 50);
        emeraldLight.position.set(12, -6, 12);
        scene.add(emeraldLight);

        const goldLight = new THREE.PointLight(0xf59e0b, 2.5, 40);
        goldLight.position.set(5, 10, 10);
        scene.add(goldLight);

        // 1. Multi-layered Flowing Silk Ribbon Waves (Purple & Emerald ribbons)
        const ribbonGroup = new THREE.Group();
        scene.add(ribbonGroup);

        const ribbonConfigs = [
            { color: 0x8b5cf6, yBase: -8.0, zBase: 3, amp: 2.6, freq: 0.14, speed: 1.2, width: 0.5, op: 0.9 }, // Royal Purple
            { color: 0x10b981, yBase: -9.2, zBase: 5, amp: 2.2, freq: 0.16, speed: 1.5, width: 0.55, op: 0.95 }, // Emerald Eco Green
            { color: 0x059669, yBase: -10.0, zBase: 1, amp: 1.8, freq: 0.18, speed: 1.0, width: 0.4, op: 0.7 }, // Forest Green
            { color: 0xf59e0b, yBase: -7.2, zBase: 0, amp: 1.4, freq: 0.20, speed: 1.8, width: 0.25, op: 0.65 }, // Gold accent line
        ];

        const activeRibbons = [];
        const segments = 64;
        const startX = -28;
        const endX = 28;
        const step = (endX - startX) / segments;

        ribbonConfigs.forEach(cfg => {
            const curvePoints = [];
            for (let i = 0; i <= segments; i++) {
                const x = startX + i * step;
                curvePoints.push(new THREE.Vector3(x, cfg.yBase, cfg.zBase));
            }

            const curve = new THREE.CatmullRomCurve3(curvePoints);
            const tubeGeo = new THREE.TubeGeometry(curve, 70, cfg.width, 8, false);

            const mat = new THREE.MeshStandardMaterial({
                color: cfg.color,
                emissive: new THREE.Color(cfg.color).multiplyScalar(0.25),
                roughness: 0.25,
                metalness: 0.45,
                transparent: true,
                opacity: cfg.op,
                side: THREE.DoubleSide
            });

            const mesh = new THREE.Mesh(tubeGeo, mat);
            ribbonGroup.add(mesh);

            activeRibbons.push({
                mesh,
                cfg,
                curvePoints,
                tubeGeo
            });
        });

        // 2. 3D Wind Turbine on the far right horizon
        const turbineGroup = new THREE.Group();
        turbineGroup.position.set(width > 1024 ? 14 : 6, -3.5, -2);
        scene.add(turbineGroup);

        const turbineMat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.1,
            roughness: 0.4,
        });

        // Tower
        const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.2, 7.5, 16), turbineMat);
        tower.position.y = 3.75;
        turbineGroup.add(tower);

        // Nacelle
        const nacelle = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.9), turbineMat);
        nacelle.position.set(0, 7.5, 0.2);
        turbineGroup.add(nacelle);

        // Rotor Hub & 3 Blades
        const rotor = new THREE.Group();
        rotor.position.set(0, 7.5, 0.7);
        turbineGroup.add(rotor);

        const hub = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12), turbineMat);
        rotor.add(hub);

        const bladeGeo = new THREE.BoxGeometry(0.12, 3.4, 0.03);
        bladeGeo.translate(0, 1.7, 0);
        for (let i = 0; i < 3; i++) {
            const b = new THREE.Mesh(bladeGeo, turbineMat);
            b.rotation.z = (i * 2 * Math.PI) / 3;
            rotor.add(b);
        }

        // 3. Orbiting Atomic Rings around the 70th Logo area
        const orbitalGroup = new THREE.Group();
        orbitalGroup.position.set(width > 1024 ? 9.5 : 2, 0, 1);
        scene.add(orbitalGroup);

        const orbitCurves = [
            { rx: 6.5, ry: 4.2, rot: [0.6, 0.2, 0.3], col: 0xa855f7, spd: 1.6 },
            { rx: 7.2, ry: 3.6, rot: [-0.5, 0.6, -0.2], col: 0x10b981, spd: -2.0 },
            { rx: 6.8, ry: 4.8, rot: [0.2, -0.7, 0.8], col: 0xf59e0b, spd: 2.4 }
        ];

        const orbits = [];
        orbitCurves.forEach(c => {
            const curve = new THREE.EllipseCurve(0, 0, c.rx, c.ry, 0, 2 * Math.PI);
            const pts = curve.getPoints(80);
            const ringGeo = new THREE.BufferGeometry().setFromPoints(pts);
            const ringMat = new THREE.LineBasicMaterial({
                color: c.col,
                transparent: true,
                opacity: 0.55,
                blending: THREE.AdditiveBlending
            });
            const ring = new THREE.LineLoop(ringGeo, ringMat);
            ring.rotation.set(c.rot[0], c.rot[1], c.rot[2]);
            orbitalGroup.add(ring);

            // Orbiting electron bead
            const bead = new THREE.Mesh(
                new THREE.SphereGeometry(0.28, 12, 12),
                new THREE.MeshBasicMaterial({ color: c.col })
            );
            orbitalGroup.add(bead);

            orbits.push({ curve, bead, rot: c.rot, spd: c.spd });
        });

        // 4. Stream of Clean Energy Breeze Particles
        const pCount = 140;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(pCount * 3);
        const pCol = new Float32Array(pCount * 3);

        const colGreen = new THREE.Color(0x34d399);
        const colPurple = new THREE.Color(0xc084fc);
        const colGold = new THREE.Color(0xfde047);

        for (let i = 0; i < pCount; i++) {
            pPos[i * 3] = (Math.random() - 0.5) * 50;
            pPos[i * 3 + 1] = (Math.random() - 0.5) * 18 - 2;
            pPos[i * 3 + 2] = (Math.random() - 0.5) * 16;

            const rnd = Math.random();
            const col = rnd < 0.5 ? colGreen : rnd < 0.8 ? colPurple : colGold;
            pCol[i * 3] = col.r;
            pCol[i * 3 + 1] = col.g;
            pCol[i * 3 + 2] = col.b;
        }

        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));

        const pMat = new THREE.PointsMaterial({
            size: 0.28,
            vertexColors: true,
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(pGeo, pMat);
        scene.add(particles);

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
            orbitalGroup.position.x = width > 1024 ? 9.5 : 2;
            turbineGroup.position.x = width > 1024 ? 14 : 6;
        };

        window.addEventListener('resize', handleResize);

        let animId;
        let clock = new THREE.Clock();

        const animate = () => {
            animId = requestAnimationFrame(animate);
            const time = clock.getElapsedTime();

            curMouseX += (targetMouseX - curMouseX) * 0.05;
            curMouseY += (targetMouseY - curMouseY) * 0.05;

            // Spin turbine blades
            rotor.rotation.z += 0.032;

            // Animate electron beads
            orbits.forEach(o => {
                const angle = (time * o.spd) % (2 * Math.PI);
                const pt = o.curve.getPoint(angle / (2 * Math.PI));
                const v = new THREE.Vector3(pt.x, pt.y, 0);
                v.applyEuler(new THREE.Euler(o.rot[0], o.rot[1], o.rot[2]));
                o.bead.position.copy(v);
            });

            // Parallax
            orbitalGroup.rotation.y = time * 0.1 + curMouseX * 0.08;
            orbitalGroup.rotation.x = -curMouseY * 0.05;

            ribbonGroup.position.y = Math.sin(time * 0.7) * 0.25;
            ribbonGroup.rotation.y = curMouseX * 0.03;

            // Particle breeze drifting horizontally
            const pArray = pGeo.attributes.position.array;
            for (let i = 0; i < pCount; i++) {
                pArray[i * 3] += 0.04;
                pArray[i * 3 + 1] += Math.sin(time * 1.5 + i) * 0.01;
                if (pArray[i * 3] > 26) {
                    pArray[i * 3] = -26;
                }
            }
            pGeo.attributes.position.needsUpdate = true;

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
            turbineMat.dispose();
            pGeo.dispose();
            pMat.dispose();
            activeRibbons.forEach(r => {
                r.tubeGeo.dispose();
                r.mesh.material.dispose();
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
