function initScripts() {
    // Mobile menu toggle
    document.querySelector('.menu-toggle').addEventListener('click', function() {
        document.querySelector('.left-nav').classList.toggle('show');
        document.querySelector('.right-nav').classList.toggle('show');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        const navLinks = document.querySelector('.nav-container');
        const menuToggle = document.querySelector('.menu-toggle');
        if (navLinks && menuToggle) {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('show');
                menuToggle.classList.remove('active');
            }
        }
    });

    // Image slider for properties
    let currentSlide = 0;
    const slides = document.querySelectorAll('.property-slide');
    if (slides.length > 0) {
        showSlide(currentSlide);
        document.querySelector('.next-slide').addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
        document.querySelector('.prev-slide').addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
    }

    // Property filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterProperties(filter);
        });
    });

    // Lazy load images
    initLazyLoading();

}