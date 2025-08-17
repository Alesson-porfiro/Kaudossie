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

  document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  const produtos = Array.from(document.querySelectorAll('.produto'));

  // helper: pega texto pesquisável (nome, data-name ou alt da imagem)
  const getProdutoTexto = (el) => {
    const nome = el.querySelector('.nomeProduto')?.textContent?.toLowerCase() || '';
    const dataName = el.getAttribute('data-name')?.toLowerCase() || '';
    const alt = el.querySelector('img')?.getAttribute('alt')?.toLowerCase() || '';
    return `${nome} ${dataName} ${alt}`.trim();
  };

  function aplicarBusca(termo) {
    const t = termo.trim().toLowerCase();
    let primeiroMatch = null;

    produtos.forEach(prod => {
      const texto = getProdutoTexto(prod);
      const match = t === '' || texto.includes(t);

      // mostra/esconde mantendo o display original
      prod.style.display = match ? '' : 'none';

      // highlight opcional
      prod.classList.toggle('produto-highlight', match && t.length > 0);

      if (match && !primeiroMatch) primeiroMatch = prod;
    });

    // rola até o primeiro resultado
    if (primeiroMatch && t.length > 0) {
      primeiroMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // filtra em tempo real
  searchInput.addEventListener('input', () => aplicarBusca(searchInput.value));

  // Enter também aplica/rola
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      aplicarBusca(searchInput.value);
    }
  });

  // estado inicial (sem filtro)
  aplicarBusca('');
});


