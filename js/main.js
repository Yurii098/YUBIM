import { Application } from 'https://unpkg.com/@splinetool/runtime@1.0.95/build/runtime.js';

// Знаходимо наш canvas елемент в HTML
const canvas = document.getElementById('canvas3d');

// Ініціалізуємо додаток Spline
const app = new Application(canvas);

// Завантажуємо 3D-сцену за посиланням
// Я підготував для тебе цю просту сцену. Ти можеш створити свою власну на сайті spline.design
app.load('https://prod.spline.design/iW9gFNw3h6KNV6a5/scene.splinecode');