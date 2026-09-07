'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function GreenHorizon3D({ className = '', theme = 'light' }) {
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
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
        scene.add(ambientLight);

        const sunLight = new THREE.DirectionalLight(0xfef08a, 2.0);
        sunLight.position.set(15, 20, 15);
        scene.add(sunLight);

        const purpleFill = new THREE.PointLight(0xa855f7, 2.5, 50);
        purpleFill.position.set(-15, -5, 10);
        scene.add(purpleFill);

        const greenFill = new THREE.PointLight(0x10b981, 3.0, 50);
        greenFill.position.set(12, -8, 12);
        scene.add(greenFill);

        // Horizon & Eco Scene Group (positioned towards the right/bottom)
        const ecoGroup = new THREE.Group();
        ecoGroup.position.set(width > 1024 ? 9 : 3, -4, 0);
        scene.add(ecoGroup);

        // 1. Interactive 3D Wind Turbines
        const turbines = [];
        const turbineMat = new THREE.MeshStandardMaterial({
            color: 0xf8fafc,
            metalness: 0.2,
            roughness: 0.3,
        });

        function createWindTurbine(scale = 1.0, speed = 0.035) {
            const turbine = new THREE.Group();

            // Tower
            const towerGeo = new THREE.CylinderGeometry(0.08 * scale, 0.18 * scale, 7 * scale, 16);
            const tower = new THREE.Mesh(towerGeo, turbineMat);
            tower.position.y = 3.5 * scale;
            turbine.add(tower);

            // Nacelle (Head)
            const nacelleGeo = new THREE.BoxGeometry(0.35 * scale, 0.35 * scale, 0.8 * scale);
            const nacelle = new THREE.Mesh(nacelleGeo, turbineMat);
            nacelle.position.set(0, 7 * scale, 0.2 * scale);
            turbine.add(nacelle);

            // Rotor Hub
            const rotorHub = new THREE.Group();
            rotorHub.position.set(0, 7 * scale, 0.65 * scale);
            turbine.add(rotorHub);

            const hubSphereGeo = new THREE.SphereGeometry(0.2 * scale, 12, 12);
            const hubSphere = new THREE.Mesh(hubSphereGeo, turbineMat);
            rotorHub.add(hubSphere);

            // 3 Blades
            const bladeLen = 3.2 * scale;
            const bladeGeo = new THREE.BoxGeometry(0.12 * scale, bladeLen, 0.03 * scale);
            // shift blade pivot to base
            bladeGeo.translate(0, bladeLen / 2, 0);

            for (let b = 0; b < 3; b++) {
                const blade = new THREE.Mesh(bladeGeo, turbineMat);
                blade.rotation.z = (b * 2 * Math.PI) / 3;
                rotorHub.add(blade);
            }

            turbine.userData = { rotorHub, speed };
            return turbine;
        }

        // Add 3 Wind Turbines at varied depths and scales
        const turbine1 = createWindTurbine(1.1, 0.028);
        turbine1.position.set(-2, 0, 1);
        ecoGroup.add(turbine1);
        turbines.push(turbine1);

        const turbine2 = createWindTurbine(0.85, 0.034);
        turbine2.position.set(3, 0.5, -2);
        ecoGroup.add(turbine2);
        turbines.push(turbine2);

        const turbine3 = createWindTurbine(0.65, 0.022);
        turbine3.position.set(-5, 0.8, -4);
        ecoGroup.add(turbine3);
        turbines.push(turbine3);

        // 2. 3D Solar Panels
        const solarGroup = new THREE.Group();
        solarGroup.position.set(-0.5, 0.2, 3);
        ecoGroup.add(solarGroup);

        const panelMat = new THREE.MeshStandardMaterial({
            color: 0x1e3a8a,
            metalness: 0.85,
            roughness: 0.15,
            emissive: 0x0f172a,
        });

        const frameMat = new THREE.MeshStandardMaterial({
            color: 0x94a3b8,
            metalness: 0.5,
            roughness: 0.5
        });

        function createSolarArray(x, z, scale = 1.0) {
            const array = new THREE.Group();
            array.position.set(x, 0, z);

            // Stand
            const poleGeo = new THREE.CylinderGeometry(0.04 * scale, 0.04 * scale, 0.8 * scale, 8);
            const pole = new THREE.Mesh(poleGeo, frameMat);
            pole.position.y = 0.4 * scale;
            array.add(pole);

            // Tilted PV Panel
            const pvGeo = new THREE.BoxGeometry(2.0 * scale, 1.2 * scale, 0.04 * scale);
            const pv = new THREE.Mesh(pvGeo, panelMat);
            pv.position.set(0, 0.8 * scale, 0);
            pv.rotation.x = -Math.PI * 0.25; // 45 degree tilt
            pv.rotation.y = -Math.PI * 0.08;
            array.add(pv);

            return array;
        }

        solarGroup.add(createSolarArray(1.5, 1.2, 0.9));
        solarGroup.add(createSolarArray(3.8, 1.5, 0.85));

        // 3. Flowing 3D Ribbon Swooshes (Purple & Eco Green, matching the banner)
        const ribbonGroup = new THREE.Group();
        scene.add(ribbonGroup);

        function createFlowingRibbon(color, yOffset, zOffset, opacity = 0.85, widthScale = 1.0) {
            const curvePoints = [];
            const segments = 60;
            const startX = -26;
            const endX = 26;
            const step = (endX - startX) / segments;

            for (let i = 0; i <= segments; i++) {
                const x = startX + i * step;
                // smooth S-curve swoosh across banner bottom
                const prog = (x - startX) / (endX - startX);
                const y = yOffset + Math.sin(prog * Math.PI * 2) * 2.2 + Math.cos(prog * Math.PI * 3) * 0.9;
                const z = zOffset + Math.sin(prog * Math.PI * 2) * 3;
                curvePoints.push(new THREE.Vector3(x, y, z));
            }

            const curve = new THREE.CatmullRomCurve3(curvePoints);
            const ribbonGeo = new THREE.TubeGeometry(curve, 70, 0.35 * widthScale, 8, false);

            const ribbonMat = new THREE.MeshStandardMaterial({
                color: color,
                emissive: new THREE.Color(color).multiplyScalar(0.3),
                roughness: 0.3,
                metalness: 0.4,
                transparent: true,
                opacity: opacity,
                side: THREE.DoubleSide
            });

            const mesh = new THREE.Mesh(ribbonGeo, ribbonMat);
            return { mesh, curvePoints, yOffset, zOffset, curve };
        }

        // Purple swoosh on left, Emerald green swoosh on right
        const ribbon1 = createFlowingRibbon(0x8b5cf6, -8.5, 2, 0.75, 1.2); // Purple
        const ribbon2 = createFlowingRibbon(0x10b981, -9.2, 4, 0.85, 1.4); // Emerald Green
        const ribbon3 = createFlowingRibbon(0x34d399, -7.8, -1, 0.6, 0.8);  // Light mint

        ribbonGroup.add(ribbon1.mesh);
        ribbonGroup.add(ribbon2.mesh);
        ribbonGroup.add(ribbon3.mesh);

        // 4. Floating Green Eco Photons / Wind Spores
        const particleCount = 120;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(particleCount * 3);
        const pColors = new Float32Array(particleCount * 3);

        const greenC = new THREE.Color(0x10b981);
        const purpleC = new THREE.Color(0xa855f7);
        const goldC = new THREE.Color(0xfde047);

        for (let i = 0; i < particleCount; i++) {
            pPos[i * 3] = (Math.random() - 0.5) * 48;
            pPos[i * 3 + 1] = (Math.random() - 0.5) * 16 - 2;
            pPos[i * 3 + 2] = (Math.random() - 0.5) * 16;

            const r = Math.random();
            const col = r < 0.5 ? greenC : r < 0.85 ? purpleC : goldC;
            pColors[i * 3] = col.r;
            pColors[i * 3 + 1] = col.g;
            pColors[i * 3 + 2] = col.b;
        }

        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

        const pMat = new THREE.PointsMaterial({
            size: 0.3,
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
            ecoGroup.position.x = width > 1024 ? 9 : 3;
        };

        window.addEventListener('resize', handleResize);

        let animId;
        let clock = new THREE.Clock();

        const animate = () => {
            animId = requestAnimationFrame(animate);
            const time = clock.getElapsedTime();

            curMouseX += (targetMouseX - curMouseX) * 0.05;
            curMouseY += (targetMouseY - curMouseY) * 0.05;

            // Rotate wind turbines
            turbines.forEach(t => {
                t.userData.rotorHub.rotation.z += t.userData.speed;
            });

            // Gentle parallax
            ecoGroup.rotation.y = curMouseX * 0.08;
            ecoGroup.rotation.x = -curMouseY * 0.05;

            ribbonGroup.position.y = Math.sin(time * 0.8) * 0.3;
            ribbonGroup.rotation.y = curMouseX * 0.04;

            // Particles drifting gently along wind direction
            const pArray = pGeo.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                pArray[i * 3] += 0.035; // wind from left to right
                pArray[i * 3 + 1] += Math.sin(time + i) * 0.01;
                if (pArray[i * 3] > 25) {
                    pArray[i * 3] = -25;
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
            panelMat.dispose();
            frameMat.dispose();
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
