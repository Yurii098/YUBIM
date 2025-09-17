// js/main.js

// --- ГЛОБАЛЬНИЙ СЛОВНИК ДЛЯ ВСІХ СТОРІНОК ---
const translations = {
    en: {
        // Main page
        meta_title_main: "YUBIM - Engineering of the Future",
        nav_about: "About",
        nav_courses: "Courses",
        btn_get_started: "Get Started",
        hero_h1: "Engineering the Future.<br>Elevating Your Projects.",
        hero_subtitle: "A deep dive into BIM technologies. Bespoke courses and solutions for professionals who strive for excellence.",
        about_h2: "Mission & Expertise",
        about_subtitle: "My goal is to provide engineers with advanced knowledge and tools to execute the most ambitious projects. Combining the academic foundation of the University of Glasgow with practical experience, I create training programs that bridge the gaps in classical education.",
        courses_h2: "Flagship Courses",
        courses_subtitle: "Structured programs for the systematic mastery of key skills in BIM.",
        card1_h4: "Revit: Professional Reinforcement",
        card1_p: "A comprehensive course for experienced engineers that systematizes approaches to reinforcing RC structures.",
        card2_h4: "Revit: Architecture from Scratch",
        card2_p: "A fundamental course that builds a solid foundation for confident work in Revit for beginners.",
        card_btn: "View Program",
        footer_rights: "All rights reserved.",
        // Revit Reinforcement page
        meta_title_rr: "Revit: Reinforcement Course - YUBIM",
        page_rr_h1: "Revit: Professional Reinforcement",
        page_rr_subtitle: "An in-depth course for engineers who want to master all aspects of reinforcement in Revit.",
        lesson1_title: "Lesson 1: Introduction and Setup", // <-- Додано
        // Revit Beginners page
        meta_title_rb: "Revit: Architecture Course - YUBIM",
        page_rb_h1: "Revit: Architecture from Scratch",
        page_rb_subtitle: "A course for students and newcomers to help master the basic tools of Revit.",
        course_dev_notice: "Course in development. Stay tuned for updates!" // <-- Додано
    },
    uk: {
        // Main page
        meta_title_main: "YUBIM - Інженерія майбутнього",
        nav_about: "Про автора",
        nav_courses: "Курси",
        btn_get_started: "Почати навчання",
        hero_h1: "Інженерія майбутнього.<br>Ваші проєкти на новому рівні.",
        hero_subtitle: "Глибоке занурення у BIM-технології. Авторські курси та рішення для фахівців, що прагнуть досконалості.",
        about_h2: "Місія та експертиза",
        about_subtitle: "Моя мета — надати інженерам передові знання та інструменти для реалізації найамбітніших проєктів. Поєднуючи академічну базу Університету Глазго та практичний досвід, я створюю навчальні програми, що закривають прогалини класичної освіти.",
        courses_h2: "Флагманські курси",
        courses_subtitle: "Структуровані програми для системного освоєння ключових навичок у BIM.",
        card1_h4: "Revit: Професійне армування",
        card1_p: "Комплексний курс для досвідчених інженерів, що систематизує підходи до армування ЗБ конструкцій.",
        card2_h4: "Revit: Архітектура з нуля",
        card2_p: "Фундаментальний курс, що закладає міцну основу для впевненої роботи в Revit для початківців.",
        card_btn: "Переглянути програму",
        footer_rights: "Всі права захищено.",
        // Revit Reinforcement page
        meta_title_rr: "Курс Revit: Армування - YUBIM",
        page_rr_h1: "Revit: Професійне армування",
        page_rr_subtitle: "Поглиблений курс для інженерів, які бажають досконало опанувати всі аспекти армування у Revit.",
        lesson1_title: "Урок 1: Вступ та налаштування", // <-- Додано
        // Revit Beginners page
        meta_title_rb: "Курс Revit: Архітектура - YUBIM",
        page_rb_h1: "Revit: Архітектура з нуля",
        page_rb_subtitle: "Курс для студентів та новачків, що допоможе освоїти базові інструменти Revit.",
        course_dev_notice: "Курс у розробці. Слідкуйте за оновленнями!" // <-- Додано
    }
};

// --- УНІВЕРСАЛЬНА ЛОГІКА ПЕРЕКЛАДУ ---
document.addEventListener('DOMContentLoaded', () => {
    const setLanguage = (lang) => {
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);
        
        document.querySelectorAll('[data-lang]').forEach(el => {
            const key = el.getAttribute('data-lang');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        document.querySelectorAll('.lang-btn.active').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.lang-btn[data-lang-set="${lang}"]`)?.classList.add('active');
    };

    document.querySelector('.lang-switcher')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('lang-btn')) {
            setLanguage(e.target.dataset.langSet);
        }
    });

    setLanguage(localStorage.getItem('language') || 'uk');
});