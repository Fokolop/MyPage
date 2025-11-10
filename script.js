// Основные функции сайта
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен');
    initializeNavigation();
    initializeBackToTop();
    initializeForm();
    initializeAnimations();
    
    // Показываем первую секцию при загрузке
    showSection('home');
});

// Простая функция для показа секций
function showSection(sectionId) {
    console.log('Показываем секцию:', sectionId);
    
    // Скрыть все секции
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Показать выбранную секцию
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Обновить активную ссылку в навигации
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
        }
    });

    // Прокрутить к верху страницы
    window.scrollTo(0, 0);
}

// Инициализация навигации
function initializeNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');

    // Переключение мобильного меню
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });
}

// Кнопка "Наверх"
function initializeBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.style.display = 'flex';
            } else {
                backToTop.style.display = 'none';
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Форма обратной связи
function initializeForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Имитация отправки формы
            showNotification('Сообщение отправлено! Я свяжусь с вами в ближайшее время.');
            contactForm.reset();
        });
    }
}

// Анимации
function initializeAnimations() {
    // Простые анимации при загрузке
    setTimeout(() => {
        const elements = document.querySelectorAll('.contact-item, .social-link, .contact-btn');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 500);
}

// Копирование в буфер обмена
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Скопировано: ' + text);
        }).catch(err => {
            console.error('Ошибка копирования: ', err);
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        showNotification('Скопировано: ' + text);
    } catch (err) {
        console.error('Ошибка копирования: ', err);
    }
    document.body.removeChild(textArea);
}

// Всплывающее уведомление
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Обработка ошибок загрузки изображений
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2NjciIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7Ql9C90LDRgTwvdGV4dD48L3N2Zz4=';
        });
    });
});
