// js/animation.js
import * as THREE from 'three';

const canvasContainer = document.getElementById('canvas-container');
if (canvasContainer) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
    camera.position.z = 2.5;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.appendChild(renderer.domElement);
    
    const lightThemeColor = 0x005ae0;
    const darkThemeColor = 0x0066ff;

    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const material = new THREE.MeshStandardMaterial({
        color: document.body.classList.contains('dark-theme') ? darkThemeColor : lightThemeColor,
        wireframe: true,
        roughness: 0.1,
        metalness: 0.5
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    window.addEventListener('themeChanged', (event) => {
        const newColor = event.detail.theme === 'dark' ? darkThemeColor : lightThemeColor;
        material.color.set(newColor);
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    let isMouseDown = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    const onMouseDown = (e) => { isMouseDown = true; previousMousePosition.x = e.clientX; previousMousePosition.y = e.clientY; };
    const onMouseUp = () => isMouseDown = false;
    const onMouseMove = (e) => {
        if (!isMouseDown) return;
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        cube.rotation.y += deltaX * 0.005;
        cube.rotation.x += deltaY * 0.005;
        previousMousePosition.x = e.clientX;
        previousMousePosition.y = e.clientY;
    };
    
    canvasContainer.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
        requestAnimationFrame(animate);
        if (!isMouseDown) { cube.rotation.x += 0.001; cube.rotation.y += 0.001; }
        renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
}