import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const Animation = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Scene, Camera, Renderer
        const scene = new THREE.Scene();

        const aspect = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        // Resizing
        window.addEventListener("resize", () => {
            // update size 
            aspect.width = window.innerWidth;
            aspect.height = window.innerHeight;

            // new aspect ration
            camera.aspect = aspect.width / aspect.height;
            camera.updateProjectionMatrix();

            // new rendersize
            renderer.setSize(aspect.width, aspect.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        })


        const camera = new THREE.PerspectiveCamera(
            75,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );

        // camera.position.x = 2;
        // camera.position.y = 2;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Cube Geometry
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshBasicMaterial({ color: "red" });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        camera.position.z = 5;

        // Clock 
        // const clock = new THREE.Clock();

        const orbitControls = new OrbitControls(camera, renderer.domElement);
        // orbitControls.enableDamping = true;
        // orbitControls.autoRotate = true;
        // orbitControls.autoRotateSpeed = 60;
        orbitControls.enableDamping = true;
        console.log(orbitControls.dampingFactor);
        // orbitControls.dampingFactor = 0.01;

        // Animation Loop
        const animate = () => {
            // const elapsedTime = clock.getElapsedTime();
            requestAnimationFrame(animate);

            // Rotation Animation
            // mesh.rotation.x = elapsedTime;
            // mesh.rotation.y = elapsedTime;

            // update Orbit Controls
            orbitControls.update();

            renderer.render(scene, camera);
        };

        animate();

        // Cleanup on Component Unmount
        return () => {
            orbitControls.dispose();
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default Animation;