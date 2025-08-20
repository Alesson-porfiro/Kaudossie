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

// Seleciona produtos e carrinho
const products = document.querySelectorAll('.produto');
const cartButton = document.getElementById('cartButton');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');

let cart = [];

// Abre/fecha o modal ao clicar no carrinho
cartButton.addEventListener("click", (e) => {
    e.stopPropagation(); // evita que o clique propague para a janela
    cartModal.style.display = "block";
});

// Fecha o modal ao clicar no botão
closeCart.addEventListener("click", () => {
    cartModal.style.display = "none";
});

// Fecha o modal ao clicar fora dele
window.addEventListener("click", (e) => {
    if (cartModal.style.display === "block" && !cartModal.contains(e.target) && e.target !== cartButton && !cartButton.contains(e.target)) {
        cartModal.style.display = "none";
    }
});

// Adiciona produto ao carrinho
products.forEach(product => {
    const btn = product.querySelector('.btnComprar');
    btn.addEventListener('click', () => {
        const nome = product.querySelector('.nomeProduto').textContent;
        const preco = parseFloat(product.querySelector('.precoProduto').textContent.replace('R$', '').replace(',', '.'));
        const existing = cart.find(item => item.nome === nome);

        if(existing){
            existing.quantidade += 1;
        } else {
            cart.push({nome, preco, quantidade: 1});
        }

        updateCartUI();
    });
});

// Atualiza interface do carrinho
function updateCartUI() {
    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.preco * item.quantidade;
        count += item.quantidade;

        const li = document.createElement('li');
        li.textContent = `${item.nome} x${item.quantidade} - R$ ${ (item.preco * item.quantidade).toFixed(2) }`;
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remover';
        removeBtn.onclick = () => {
            cart = cart.filter(i => i.nome !== item.nome);
            updateCartUI();
        };
        
        li.appendChild(removeBtn);
        cartItems.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = count;
}

// Abrir e fechar modal
cartButton.addEventListener('click', () => {
    cartModal.style.display = 'block';
});

closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

const sendCartButton = document.getElementById("sendCart");
const cartItemsList = document.getElementById("cartItems");


// Enviar pedido para WhatsApp
sendCartButton.addEventListener('click', () => {
    if (cart.length === 0) return alert('O carrinho está vazio!');

    let message = 'Olá! Gostaria de fazer o pedido:\n';
    cart.forEach((item, i) => {
        message += `${i + 1}. ${item.nome} x${item.quantidade} - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
    });
    message += `Total: R$ ${cartTotal.textContent}`;

    const phone = '5511962048118';
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
});