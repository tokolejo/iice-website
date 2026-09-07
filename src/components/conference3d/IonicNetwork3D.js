'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function IonicNetwork3D({ className = '' }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let width = container.clientWidth || window.innerWidth;
        let height = container.clientHeight || 450;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
        camera.position.z = 25;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Particle system setup
        const particleCount = 110;
        const maxDistance = 6.2;
        const positions = new Float32Array(particleCount * 3);
        const velocities = [];
        const colors = new Float32Array(particleCount * 3);

        const colPurple = new THREE.Color(0xad49e1);
        const colEmerald = new THREE.Color(0x10b981);
        const colCyan = new THREE.Color(0x38bdf8);

        const boundsX = 24;
        const boundsY = 13;
        const boundsZ = 12;

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * boundsX * 2;
            positions[i * 3 + 1] = (Math.random() - 0.5) * boundsY * 2;
            positions[i * 3 + 2] = (Math.random() - 0.5) * boundsZ * 2;

            velocities.push({
                x: (Math.random() - 0.5) * 0.045,
                y: (Math.random() - 0.5) * 0.045,
                z: (Math.random() - 0.5) * 0.035
            });

            const pColor = i % 3 === 0 ? colPurple : i % 3 === 1 ? colEmerald : colCyan;
            colors[i * 3] = pColor.r;
            colors[i * 3 + 1] = pColor.g;
            colors[i * 3 + 2] = pColor.b;
        }

        const particlesGeo = new THREE.BufferGeometry();
        particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particlesMat = new THREE.PointsMaterial({
            size: 0.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending
        });

        const particleSystem = new THREE.Points(particlesGeo, particlesMat);
        scene.add(particleSystem);

        // Dynamic Line Connections Geometry
        const maxLines = 450;
        const linePositions = new Float32Array(maxLines * 6);
        const lineColors = new Float32Array(maxLines * 6);

        const linesGeo = new THREE.BufferGeometry();
        linesGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
        linesGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

        const linesMat = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.45,
            blending: THREE.AdditiveBlending
        });

        const lineSystem = new THREE.LineSegments(linesGeo, linesMat);
        scene.add(lineSystem);

        // Mouse Electrode
        let mouseX = 9999;
        let mouseY = 9999;
        let targetElectrode = { x: 0, y: 0, active: false };

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
            mouseX = normX * boundsX;
            mouseY = normY * boundsY;
            targetElectrode.active = true;
        };

        const handleMouseLeave = () => {
            targetElectrode.active = false;
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

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

        const animate = () => {
            animId = requestAnimationFrame(animate);

            const posArray = particlesGeo.attributes.position.array;
            let lineIdx = 0;

            // Move ions
            for (let i = 0; i < particleCount; i++) {
                const ix = i * 3;
                const iy = i * 3 + 1;
                const iz = i * 3 + 2;

                posArray[ix] += velocities[i].x;
                posArray[iy] += velocities[i].y;
                posArray[iz] += velocities[i].z;

                // Electrode attraction / repulsion effect
                if (targetElectrode.active) {
                    const dx = mouseX - posArray[ix];
                    const dy = mouseY - posArray[iy];
                    const distSq = dx * dx + dy * dy;
                    if (distSq < 60 && distSq > 0.5) {
                        const force = (1 - Math.sqrt(distSq) / 7.7) * 0.05;
                        posArray[ix] += dx * force;
                        posArray[iy] += dy * force;
                    }
                }

                // Bounce at bounds
                if (posArray[ix] > boundsX || posArray[ix] < -boundsX) velocities[i].x = -velocities[i].x;
                if (posArray[iy] > boundsY || posArray[iy] < -boundsY) velocities[i].y = -velocities[i].y;
                if (posArray[iz] > boundsZ || posArray[iz] < -boundsZ) velocities[i].z = -velocities[i].z;
            }
            particlesGeo.attributes.position.needsUpdate = true;

            // Build dynamic lines between neighboring ions
            const lPos = linesGeo.attributes.position.array;
            const lCol = linesGeo.attributes.color.array;

            for (let i = 0; i < particleCount && lineIdx < maxLines; i++) {
                const ix = i * 3;
                const iy = i * 3 + 1;
                const iz = i * 3 + 2;

                for (let j = i + 1; j < particleCount && lineIdx < maxLines; j++) {
                    const jx = j * 3;
                    const jy = j * 3 + 1;
                    const jz = j * 3 + 2;

                    const dx = posArray[ix] - posArray[jx];
                    const dy = posArray[iy] - posArray[jy];
                    const dz = posArray[iz] - posArray[jz];
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (dist < maxDistance) {
                        const alpha = 1 - dist / maxDistance;
                        const ptr = lineIdx * 6;

                        lPos[ptr] = posArray[ix];
                        lPos[ptr + 1] = posArray[iy];
                        lPos[ptr + 2] = posArray[iz];
                        lPos[ptr + 3] = posArray[jx];
                        lPos[ptr + 4] = posArray[jy];
                        lPos[ptr + 5] = posArray[jz];

                        const colR = i % 2 === 0 ? 0.68 : 0.06;
                        const colG = i % 2 === 0 ? 0.28 : 0.72;
                        const colB = i % 2 === 0 ? 0.88 : 0.50;

                        lCol[ptr] = colR * alpha;
                        lCol[ptr + 1] = colG * alpha;
                        lCol[ptr + 2] = colB * alpha;
                        lCol[ptr + 3] = colR * alpha;
                        lCol[ptr + 4] = colG * alpha;
                        lCol[ptr + 5] = colB * alpha;

                        lineIdx++;
                    }
                }
            }

            linesGeo.setDrawRange(0, lineIdx * 2);
            linesGeo.attributes.position.needsUpdate = true;
            linesGeo.attributes.color.needsUpdate = true;

            // Gentle slow scene sway
            scene.rotation.y += 0.001;

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            cancelAnimationFrame(animId);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('resize', handleResize);

            if (container && renderer.domElement && container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();
            particlesGeo.dispose();
            particlesMat.dispose();
            linesGeo.dispose();
            linesMat.dispose();
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
