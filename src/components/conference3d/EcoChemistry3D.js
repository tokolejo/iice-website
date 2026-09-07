'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function EcoChemistry3D({ className = '' }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let width = container.clientWidth || window.innerWidth;
        let height = container.clientHeight || 450;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(0, 0, 24);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        scene.add(ambientLight);

        const purpleLight = new THREE.PointLight(0xa855f7, 3, 50);
        purpleLight.position.set(-10, 8, 12);
        scene.add(purpleLight);

        const emeraldLight = new THREE.PointLight(0x10b981, 4, 50);
        emeraldLight.position.set(10, -5, 12);
        scene.add(emeraldLight);

        // Group positioned towards the right side of the banner
        const centerGroup = new THREE.Group();
        centerGroup.position.set(width > 1024 ? 8.5 : 2, -1, 0);
        scene.add(centerGroup);

        // 1. Stylized 3D Green Eco Drop (Water / Hydrogen energy drop)
        const dropGroup = new THREE.Group();
        dropGroup.position.set(3.5, 0.5, 2);
        centerGroup.add(dropGroup);

        // Lathe geometry for smooth water drop
        const dropPoints = [];
        for (let i = 0; i <= 20; i++) {
            const t = i / 20;
            const y = (t - 0.5) * 4.0;
            // Teardrop profile formula
            const radius = Math.sin(t * Math.PI) * Math.pow(1 - t * 0.7, 0.5) * 1.5;
            dropPoints.push(new THREE.Vector2(Math.max(0, radius), y));
        }
        const dropGeo = new THREE.LatheGeometry(dropPoints, 32);
        const dropMat = new THREE.MeshPhysicalMaterial({
            color: 0x10b981,
            emissive: 0x064e3b,
            roughness: 0.1,
            transmission: 0.85, // glass/water drop effect
            thickness: 1.2,
            ior: 1.33,
            transparent: true,
            opacity: 0.88,
        });
        const dropMesh = new THREE.Mesh(dropGeo, dropMat);
        dropMesh.rotation.z = Math.PI; // pointy side up
        dropMesh.scale.set(0.9, 0.9, 0.9);
        dropGroup.add(dropMesh);

        // Stylized Leaf inside/beside the drop
        const leafShape = new THREE.Shape();
        leafShape.moveTo(0, 0);
        leafShape.quadraticCurveTo(0.8, 1.0, 0, 2.2);
        leafShape.quadraticCurveTo(-0.8, 1.0, 0, 0);

        const extrudeSettings = { depth: 0.15, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.05, bevelThickness: 0.05 };
        const leafGeo = new THREE.ExtrudeGeometry(leafShape, extrudeSettings);
        const leafMat = new THREE.MeshStandardMaterial({
            color: 0x34d399,
            emissive: 0x059669,
            roughness: 0.3,
            metalness: 0.2
        });
        const leafMesh = new THREE.Mesh(leafGeo, leafMat);
        leafMesh.scale.set(0.65, 0.65, 0.65);
        leafMesh.position.set(0, -0.7, 0.2);
        leafMesh.rotation.z = -0.2;
        dropGroup.add(leafMesh);

        // 2. 3D Laboratory Flask / Electrochemical Beaker (inspired by the banner beaker)
        const flaskGroup = new THREE.Group();
        flaskGroup.position.set(-3.5, -2.5, 1);
        centerGroup.add(flaskGroup);

        // Conical flask body
        const flaskGeo = new THREE.CylinderGeometry(0.5, 2.2, 4.0, 32, 1, true);
        const glassMat = new THREE.MeshPhysicalMaterial({
            color: 0xa855f7,
            emissive: 0x3b0764,
            roughness: 0.05,
            transmission: 0.9,
            thickness: 0.8,
            transparent: true,
            opacity: 0.75,
            side: THREE.DoubleSide
        });
        const flaskMesh = new THREE.Mesh(flaskGeo, glassMat);
        flaskMesh.position.y = 2.0;
        flaskGroup.add(flaskMesh);

        // Flask neck
        const neckGeo = new THREE.CylinderGeometry(0.5, 0.5, 1.8, 32, 1, true);
        const neckMesh = new THREE.Mesh(neckGeo, glassMat);
        neckMesh.position.y = 4.8;
        flaskGroup.add(neckMesh);

        // Liquid inside flask (glowing purple-green electrolyte)
        const liquidGeo = new THREE.CylinderGeometry(0.45, 1.9, 2.5, 32);
        const liquidMat = new THREE.MeshStandardMaterial({
            color: 0x9333ea,
            emissive: 0x581c87,
            roughness: 0.2,
            metalness: 0.3,
            transparent: true,
            opacity: 0.8,
        });
        const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
        liquidMesh.position.y = 1.3;
        flaskGroup.add(liquidMesh);

        // 3. Effervescent Bubbles (Hydrogen generation in electrochemical synthesis)
        const bubbleCount = 45;
        const bubbles = [];
        const bubbleGeo = new THREE.SphereGeometry(0.12, 12, 12);
        const bubbleMat = new THREE.MeshStandardMaterial({
            color: 0x6ee7b7,
            emissive: 0x059669,
            roughness: 0.1,
            metalness: 0.8,
            transparent: true,
            opacity: 0.9
        });

        for (let i = 0; i < bubbleCount; i++) {
            const b = new THREE.Mesh(bubbleGeo, bubbleMat);
            b.position.set(
                (Math.random() - 0.5) * 1.6,
                Math.random() * 3.5 + 0.5,
                (Math.random() - 0.5) * 1.6
            );
            b.userData = {
                speedY: 0.02 + Math.random() * 0.035,
                swayFreq: 1 + Math.random() * 3,
                swayAmp: 0.01 + Math.random() * 0.02,
                baseX: b.position.x
            };
            flaskGroup.add(b);
            bubbles.push(b);
        }

        // 4. Elegant Dual-Color Ribbon Waves (Purple on left, green on right)
        const ribbonGroup = new THREE.Group();
        scene.add(ribbonGroup);

        const curvePts1 = [];
        const curvePts2 = [];
        const segments = 60;
        const startX = -28;
        const endX = 28;
        const step = (endX - startX) / segments;

        for (let i = 0; i <= segments; i++) {
            const x = startX + i * step;
            const norm = (x - startX) / (endX - startX);
            const y1 = -7.5 + Math.sin(norm * Math.PI * 2.2) * 2.5 + Math.cos(norm * Math.PI * 1.5) * 1.2;
            const y2 = -8.8 + Math.sin(norm * Math.PI * 2.0 + 0.8) * 2.2;
            curvePts1.push(new THREE.Vector3(x, y1, Math.sin(norm * Math.PI * 2) * 3));
            curvePts2.push(new THREE.Vector3(x, y2, Math.cos(norm * Math.PI * 2) * 2));
        }

        const tube1 = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(curvePts1), 70, 0.45, 8, false);
        const tube2 = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(curvePts2), 70, 0.35, 8, false);

        const matPurple = new THREE.MeshStandardMaterial({
            color: 0x7c3aed,
            emissive: 0x3b0764,
            roughness: 0.3,
            metalness: 0.4,
            transparent: true,
            opacity: 0.85
        });

        const matGreen = new THREE.MeshStandardMaterial({
            color: 0x10b981,
            emissive: 0x064e3b,
            roughness: 0.3,
            metalness: 0.4,
            transparent: true,
            opacity: 0.85
        });

        const mesh1 = new THREE.Mesh(tube1, matPurple);
        const mesh2 = new THREE.Mesh(tube2, matGreen);
        ribbonGroup.add(mesh1);
        ribbonGroup.add(mesh2);

        // 5. Ambient Photons
        const pCount = 90;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount; i++) {
            pPos[i * 3] = (Math.random() - 0.5) * 46;
            pPos[i * 3 + 1] = (Math.random() - 0.5) * 16 - 2;
            pPos[i * 3 + 2] = (Math.random() - 0.5) * 16;
        }
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const pMat = new THREE.PointsMaterial({
            color: 0x34d399,
            size: 0.28,
            transparent: true,
            opacity: 0.8,
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
            centerGroup.position.x = width > 1024 ? 8.5 : 2;
        };

        window.addEventListener('resize', handleResize);

        let animId;
        let clock = new THREE.Clock();

        const animate = () => {
            animId = requestAnimationFrame(animate);
            const time = clock.getElapsedTime();

            curMouseX += (targetMouseX - curMouseX) * 0.05;
            curMouseY += (targetMouseY - curMouseY) * 0.05;

            // Hover drop gently
            dropGroup.position.y = 0.5 + Math.sin(time * 1.5) * 0.4;
            dropGroup.rotation.y = time * 0.4 + curMouseX * 0.1;

            // Tilt flask gently with parallax
            flaskGroup.rotation.z = Math.sin(time * 0.8) * 0.05 + curMouseX * 0.02;

            // Animate effervescent bubbles rising
            bubbles.forEach((b, idx) => {
                b.position.y += b.userData.speedY;
                b.position.x = b.userData.baseX + Math.sin(time * b.userData.swayFreq + idx) * b.userData.swayAmp;
                // If bubble reaches top of neck, reset to bottom
                if (b.position.y > 6.0) {
                    b.position.y = 0.8;
                    b.position.x = (Math.random() - 0.5) * 1.5;
                    b.userData.baseX = b.position.x;
                }
            });

            // Parallax on main group
            centerGroup.rotation.y = curMouseX * 0.08;
            centerGroup.rotation.x = -curMouseY * 0.05;

            ribbonGroup.position.y = Math.sin(time * 0.6) * 0.2;

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
            dropGeo.dispose();
            dropMat.dispose();
            leafGeo.dispose();
            leafMat.dispose();
            flaskGeo.dispose();
            neckGeo.dispose();
            liquidGeo.dispose();
            glassMat.dispose();
            liquidMat.dispose();
            bubbleGeo.dispose();
            bubbleMat.dispose();
            tube1.dispose();
            tube2.dispose();
            matPurple.dispose();
            matGreen.dispose();
            pGeo.dispose();
            pMat.dispose();
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
