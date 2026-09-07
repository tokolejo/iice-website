'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Molecules3D({ className = '' }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let width = container.clientWidth || window.innerWidth;
        let height = container.clientHeight || 450;

        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
        camera.position.z = 24;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xad49e1, 3, 50);
        pointLight1.position.set(10, 10, 10);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x10b981, 3, 50);
        pointLight2.position.set(-10, -10, 8);
        scene.add(pointLight2);

        // Materials
        const purpleMat = new THREE.MeshPhongMaterial({
            color: 0x9333ea,
            emissive: 0x581c87,
            specular: 0xffffff,
            shininess: 80,
            transparent: true,
            opacity: 0.92,
        });

        const emeraldMat = new THREE.MeshPhongMaterial({
            color: 0x10b981,
            emissive: 0x064e3b,
            specular: 0x6ee7b7,
            shininess: 90,
            transparent: true,
            opacity: 0.92,
        });

        const goldMat = new THREE.MeshPhongMaterial({
            color: 0xf59e0b,
            emissive: 0x78350f,
            specular: 0xfde68a,
            shininess: 100,
        });

        const bondMat = new THREE.MeshPhongMaterial({
            color: 0xc084fc,
            transparent: true,
            opacity: 0.65,
        });

        // Helper to build a 3D Molecule group
        function createMolecule(atomCount = 4, radius = 3.5, hasCenter = true) {
            const group = new THREE.Group();
            const sphereGeo = new THREE.SphereGeometry(0.7, 24, 24);
            const smallGeo = new THREE.SphereGeometry(0.45, 20, 20);

            let centerMesh;
            if (hasCenter) {
                centerMesh = new THREE.Mesh(sphereGeo, Math.random() > 0.5 ? purpleMat : goldMat);
                group.add(centerMesh);
            }

            const atoms = [];
            for (let i = 0; i < atomCount; i++) {
                const phi = Math.acos(-1 + (2 * i) / atomCount);
                const theta = Math.sqrt(atomCount * Math.PI) * phi;

                const x = radius * Math.cos(theta) * Math.sin(phi);
                const y = radius * Math.sin(theta) * Math.sin(phi);
                const z = radius * Math.cos(phi);

                const atomMesh = new THREE.Mesh(smallGeo, i % 2 === 0 ? emeraldMat : purpleMat);
                atomMesh.position.set(x, y, z);
                group.add(atomMesh);
                atoms.push(atomMesh.position);

                // Cylinder bond to center
                const bondLength = Math.sqrt(x * x + y * y + z * z);
                const bondGeo = new THREE.CylinderGeometry(0.1, 0.1, bondLength, 12);
                const bondMesh = new THREE.Mesh(bondGeo, bondMat);

                bondMesh.position.set(x / 2, y / 2, z / 2);
                bondMesh.quaternion.setFromUnitVectors(
                    new THREE.Vector3(0, 1, 0),
                    new THREE.Vector3(x, y, z).normalize()
                );
                group.add(bondMesh);
            }

            return group;
        }

        const molecules = [];
        const moleculeGroup = new THREE.Group();
        scene.add(moleculeGroup);

        // Position 5 different molecules around the canvas
        const positions = [
            { x: -14, y: 4, z: -2, scale: 1.1, rotSpeed: 0.006 },
            { x: -6, y: -5, z: 2, scale: 0.9, rotSpeed: -0.008 },
            { x: 12, y: 5, z: -4, scale: 1.2, rotSpeed: 0.005 },
            { x: 16, y: -4, z: 0, scale: 0.85, rotSpeed: -0.007 },
            { x: 0, y: 7, z: -8, scale: 1.0, rotSpeed: 0.004 }
        ];

        positions.forEach((pos, idx) => {
            const mol = createMolecule(idx % 2 === 0 ? 5 : 4, 2.5 + (idx % 3) * 0.8, true);
            mol.position.set(pos.x, pos.y, pos.z);
            mol.scale.setScalar(pos.scale);
            mol.userData = {
                rotSpeedX: pos.rotSpeed,
                rotSpeedY: pos.rotSpeed * 1.3,
                baseY: pos.y,
                floatOffset: idx * 1.2
            };
            molecules.push(mol);
            moleculeGroup.add(mol);
        });

        // Ambient Floating Micro-Ions (Particle Cloud)
        const particleCount = 200;
        const particleGeo = new THREE.BufferGeometry();
        const particlePos = new Float32Array(particleCount * 3);
        const particleColors = new Float32Array(particleCount * 3);

        const color1 = new THREE.Color(0xad49e1);
        const color2 = new THREE.Color(0x10b981);
        const color3 = new THREE.Color(0xfde047);

        for (let i = 0; i < particleCount; i++) {
            particlePos[i * 3] = (Math.random() - 0.5) * 50;
            particlePos[i * 3 + 1] = (Math.random() - 0.5) * 26;
            particlePos[i * 3 + 2] = (Math.random() - 0.5) * 20;

            const pick = Math.random();
            const col = pick < 0.4 ? color1 : pick < 0.8 ? color2 : color3;
            particleColors[i * 3] = col.r;
            particleColors[i * 3 + 1] = col.g;
            particleColors[i * 3 + 2] = col.b;
        }

        particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
        particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

        const particleMat = new THREE.PointsMaterial({
            size: 0.28,
            vertexColors: true,
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(particleGeo, particleMat);
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

        // Resize handler
        const handleResize = () => {
            if (!container) return;
            width = container.clientWidth;
            height = container.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        // Animation Loop
        let animId;
        let clock = new THREE.Clock();

        const animate = () => {
            animId = requestAnimationFrame(animate);
            const time = clock.getElapsedTime();

            // Smooth parallax interpolation
            curMouseX += (targetMouseX - curMouseX) * 0.05;
            curMouseY += (targetMouseY - curMouseY) * 0.05;

            moleculeGroup.rotation.y = curMouseX * 0.15;
            moleculeGroup.rotation.x = -curMouseY * 0.12;

            // Rotate individual molecules & float gently
            molecules.forEach(mol => {
                mol.rotation.x += mol.userData.rotSpeedX;
                mol.rotation.y += mol.userData.rotSpeedY;
                mol.position.y = mol.userData.baseY + Math.sin(time * 1.5 + mol.userData.floatOffset) * 0.6;
            });

            // Rotate particle cloud
            particles.rotation.y = time * 0.03 + curMouseX * 0.05;
            particles.rotation.x = Math.sin(time * 0.02) * 0.1;

            renderer.render(scene, camera);
        };

        animate();

        // Cleanup
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);

            if (container && renderer.domElement && container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();
            purpleMat.dispose();
            emeraldMat.dispose();
            goldMat.dispose();
            bondMat.dispose();
            particleMat.dispose();
            particleGeo.dispose();
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
