document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    let current = 0;
    let interval = setInterval(nextSlide, 2000);
  
    function showSlide(idx) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === idx);
      });
    }
    function nextSlide() {
      current = (current + 1) % slides.length;
      showSlide(current);
    }
    function prevSlide() {
      current = (current - 1 + slides.length) % slides.length;
      showSlide(current);
    }
    document.querySelector('.next-slide').onclick = () => { nextSlide(); resetInterval(); };
    document.querySelector('.prev-slide').onclick = () => { prevSlide(); resetInterval(); };
    function resetInterval() {
      clearInterval(interval);
      interval = setInterval(nextSlide, 2000);
    }
    showSlide(current);
  });