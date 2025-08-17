let index = 0;
  const slidesContainer = document.querySelector('.slides');
  const slides = document.querySelectorAll('.slide');
  const total = slides.length;
  const indicatorsContainer = document.querySelector('.indicators');

  // Criar indicadores
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.addEventListener('click', () => showSlide(i));
    indicatorsContainer.appendChild(dot);
  });

  function showSlide(i) {
    index = (i + total) % total;
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    updateIndicators();
  }

  function updateIndicators() {
    const dots = indicatorsContainer.querySelectorAll('div');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
  }

  window.moveSlide = (direction) => showSlide(index + direction);

  showSlide(0);

  /* ======= CONTADORES ANIMADOS ======= */
  const counters = document.querySelectorAll('.numero');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const duration = 200; // 2 segundos
    const steps = 100;
    const increment = target / steps;
    const intervalTime = duration / steps;

    const updateCounter = () => {
      count += increment;
      if (count < target) {
        counter.textContent = Math.floor(count);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    updateCounter();
  });

