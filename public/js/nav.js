function toggleMenu() {
    const nav = document.querySelector('nav');
    const toggle = document.querySelector('.nav-toggle');
    
    nav.classList.toggle('active');
    toggle.classList.toggle('active');
}

// Затваряне на менюто при клик върху линк (за мобилни устройства)
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        const nav = document.querySelector('nav');
        const toggle = document.querySelector('.nav-toggle');
        
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            toggle.classList.remove('active');
        }
    });
}); 