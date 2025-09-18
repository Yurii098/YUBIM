import * as THREE from 'three';

// --- НАЛАШТУВАННЯ СЦЕНИ ---
const container = document.getElementById('scene-container');
if (container) {
    // Сцена, камера та рендерер
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true // Прозорий фон
    });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- СТВОРЕННЯ ОБ'ЄКТІВ ---

    const group = new THREE.Group();
    scene.add(group);

    // 1. Сітчаста площина (наша "земля")
    const gridColor = 0x008ac5;
    const grid = new THREE.GridHelper(40, 40, gridColor, gridColor); // Зробимо сітку трохи більшою
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    group.add(grid);


    // 2. Каркасні силуети будинків
    const buildingColor = new THREE.Color(0x008ac5);
    const buildingMaterial = new THREE.MeshBasicMaterial({
        color: buildingColor,
        wireframe: true
    });
    
    // Створюємо 50 "будинків"
    for (let i = 0; i < 5; i++) {
        // Випадкові розміри для кожної будівлі
        const height = Math.random() * 8 + 1; // Висота від 1 до 9
        const width = Math.random() * 1.5 + 0.5;
        const depth = Math.random() * 1.5 + 0.5;

        const buildingGeometry = new THREE.BoxGeometry(width, height, depth);
        const building = new THREE.Mesh(buildingGeometry, buildingMaterial);

        // Випадкова позиція на сітці
        building.position.x = (Math.random() - 0.5) * 40;
        building.position.z = (Math.random() - 0.5) * 40;
        
        // Ключовий момент: піднімаємо будівлю так, щоб її основа стояла на сітці (y=0)
        building.position.y = height / 2;

        group.add(building);
    }

    // --- ОНОВЛЕНЕ ПОЛОЖЕННЯ КАМЕРИ ---
    // Опускаємо камеру нижче для більш драматичного вигляду
    camera.position.set(0, 2.5, 9);
    camera.lookAt(0, 0, 0);


    // --- ІНТЕРАКТИВНІСТЬ ТА АНІМАЦІЯ ---

    const mouse = new THREE.Vector2();
    window.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    const animate = () => {
        // Будинки не обертаються, тому анімація тут не потрібна
        
        // Рух камери за мишкою для ефекту паралаксу
        const targetX = mouse.x * 1.5;
        const targetY = mouse.y * 1 + 2.5; // Базова висота камери + зміщення від миші

        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (targetY - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
        window.requestAnimationFrame(animate);
    };

    animate();

    // --- АДАПТИВНІСТЬ ---
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
}