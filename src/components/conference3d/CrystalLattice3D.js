'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CrystalLattice3D({ className = '' }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let width = container.clientWidth || window.innerWidth;
        let height = container.clientHeight || 450;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
        camera.position.set(0, -6, 20);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
        scene.add(ambientLight);

        const purpleLight = new THREE.PointLight(0xa855f7, 4, 60);
        purpleLight.position.set(12, 10, 15);
        scene.add(purpleLight);

        const emeraldLight = new THREE.PointLight(0x10b981, 4, 60);
        emeraldLight.position.set(-14, -10, 15);
        scene.add(emeraldLight);

        // 1. Undulating Crystal Lattice Plane (Grid of connected vertices)
        const gridX = 40;
        const gridY = 24;
        const planeGeo = new THREE.PlaneGeometry(60, 36, gridX - 1, gridY - 1);
        
        // Save initial vertex positions
        const posAttr = planeGeo.attributes.position;
        const initialZ = new Float32Array(posAttr.count);
        for (let i = 0; i < posAttr.count; i++) {
            initialZ[i] = posAttr.getZ(i);
        }

        const latticeWireMat = new THREE.MeshBasicMaterial({
            color: 0x7c3aed,
            wireframe: true,
            transparent: true,
            opacity: 0.35,
        });

        const latticePlane = new THREE.Mesh(planeGeo, latticeWireMat);
        latticePlane.rotation.x = -Math.PI * 0.28;
        latticePlane.position.set(0, -5, -4);
        scene.add(latticePlane);

        // Nodes on lattice vertices
        const nodeGeo = new THREE.BufferGeometry();
        const nodePos = new Float32Array(posAttr.count * 3);
        const nodeColors = new Float32Array(posAttr.count * 3);

        const emeraldColor = new THREE.Color(0x34d399);
        const goldColor = new THREE.Color(0xfbbf24);

        for (let i = 0; i < posAttr.count; i++) {
            nodePos[i * 3] = posAttr.getX(i);
            nodePos[i * 3 + 1] = posAttr.getY(i);
            nodePos[i * 3 + 2] = posAttr.getZ(i);

            const c = (i % 7 === 0) ? goldColor : emeraldColor;
            nodeColors[i * 3] = c.r;
            nodeColors[i * 3 + 1] = c.g;
            nodeColors[i * 3 + 2] = c.b;
        }

        nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePos, 3));
        nodeGeo.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));

        const nodeMat = new THREE.PointsMaterial({
            size: 0.35,
            vertexColors: true,
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending
        });

        const nodePoints = new THREE.Points(nodeGeo, nodeMat);
        latticePlane.add(nodePoints);

        // 2. Floating 3D Polyhedral Crystals (Octahedrons & Icosahedrons)
        const polyGroup = new THREE.Group();
        scene.add(polyGroup);

        const crystalMats = [
            new THREE.MeshStandardMaterial({
                color: 0x9333ea,
                emissive: 0x3b0764,
                roughness: 0.2,
                metalness: 0.8,
                wireframe: true,
            }),
            new THREE.MeshStandardMaterial({
                color: 0x10b981,
                emissive: 0x064e3b,
                roughness: 0.3,
                metalness: 0.7,
                wireframe: true,
            }),
            new THREE.MeshStandardMaterial({
                color: 0xf59e0b,
                emissive: 0x78350f,
                roughness: 0.2,
                metalness: 0.9,
                wireframe: true,
            })
        ];

        const crystals = [];
        const crystalDefs = [
            { type: 'ico', pos: [-16, 6, 2], scale: 2.2, matIdx: 0, rot: [0.008, 0.012] },
            { type: 'octa', pos: [15, 7, -1], scale: 2.5, matIdx: 1, rot: [-0.01, 0.007] },
            { type: 'ico', pos: [18, -3, 3], scale: 1.8, matIdx: 2, rot: [0.012, -0.008] },
            { type: 'octa', pos: [-18, -4, 1], scale: 2.0, matIdx: 1, rot: [-0.007, 0.01] },
            { type: 'ico', pos: [0, 8, -6], scale: 2.8, matIdx: 0, rot: [0.005, 0.009] }
        ];

        crystalDefs.forEach(def => {
            const geo = def.type === 'ico' ? new THREE.IcosahedronGeometry(def.scale, 0) : new THREE.OctahedronGeometry(def.scale, 0);
            const mesh = new THREE.Mesh(geo, crystalMats[def.matIdx]);
            mesh.position.set(def.pos[0], def.pos[1], def.pos[2]);

            // Inner solid glowing core
            const innerGeo = new THREE.SphereGeometry(def.scale * 0.35, 12, 12);
            const innerMat = new THREE.MeshBasicMaterial({
                color: def.matIdx === 1 ? 0x6ee7b7 : def.matIdx === 2 ? 0xfef08a : 0xd8b4fe,
            });
            const innerMesh = new THREE.Mesh(innerGeo, innerMat);
            mesh.add(innerMesh);

            mesh.userData = {
                rotX: def.rot[0],
                rotY: def.rot[1],
                baseY: def.pos[1]
            };

            polyGroup.add(mesh);
            crystals.push(mesh);
        });

        // Mouse Parallax
        let targetMouseX = 0;
        let targetMouseY = 0;
        let curMouseX = 0;
        let curMouseY = 0;

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            targetMouseX = (x - 0.5) * 5;
            targetMouseY = (y - 0.5) * -4;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const handleResize = () => {
            if (!container) return;
            width = container.clientWidth;
            height = container.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        let animId;
        let clock = new THREE.Clock();

        const animate = () => {
            animId = requestAnimationFrame(animate);
            const time = clock.getElapsedTime();

            curMouseX += (targetMouseX - curMouseX) * 0.04;
            curMouseY += (targetMouseY - curMouseY) * 0.04;

            polyGroup.rotation.y = curMouseX * 0.12;
            polyGroup.rotation.x = -curMouseY * 0.08;

            latticePlane.rotation.z = Math.sin(time * 0.15) * 0.05 + curMouseX * 0.02;

            // Undulate lattice grid vertices
            const pos = planeGeo.attributes.position;
            const nodeAttr = nodeGeo.attributes.position;

            for (let i = 0; i < pos.count; i++) {
                const u = pos.getX(i);
                const v = pos.getY(i);
                // 3D Sine-Cosine wave
                const wave = Math.sin(u * 0.25 + time * 1.6) * Math.cos(v * 0.25 + time * 1.2) * 1.8;
                pos.setZ(i, wave);
                nodeAttr.setZ(i, wave);
            }
            pos.needsUpdate = true;
            nodeAttr.needsUpdate = true;

            // Rotate Crystals & gently float
            crystals.forEach((cry, idx) => {
                cry.rotation.x += cry.userData.rotX;
                cry.rotation.y += cry.userData.rotY;
                cry.position.y = cry.userData.baseY + Math.sin(time * 1.2 + idx * 1.5) * 0.5;
            });

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
            planeGeo.dispose();
            latticeWireMat.dispose();
            nodeGeo.dispose();
            nodeMat.dispose();
            crystalMats.forEach(m => m.dispose());
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
