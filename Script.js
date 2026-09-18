// Maputo Rent & Sales — interações básicas

document.addEventListener('DOMContentLoaded', () => {

  // Menu mobile
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });
  }

  // Guardar imóvel (favoritos)
  document.querySelectorAll('.fav-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      const icon = btn.querySelector('i');
      icon.classList.toggle('fa-regular');
      icon.classList.toggle('fa-solid');
    });
  });

  // Pesquisa (por agora só recolhe os filtros — liga isto ao teu backend/API de imóveis)
  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const dados = Object.fromEntries(new FormData(searchForm).entries());
      console.log('Filtros de pesquisa:', dados);
      // TODO: substituir por chamada real à tua fonte de dados de imóveis
    });
  }

  // =====================================================
  // Página "Anunciar Imóvel" — planos + pagamento
  // =====================================================
  const planCards = document.querySelectorAll('[data-plan-card]');
  const summaryPlan = document.getElementById('summaryPlan');
  const summaryTotal = document.getElementById('summaryTotal');

  function formatMT(valor) {
    return valor.toLocaleString('pt-PT') + ' MT';
  }

  if (planCards.length) {
    planCards.forEach((card) => {
      card.addEventListener('click', () => {
        planCards.forEach((c) => c.classList.remove('is-selected'));
        card.classList.add('is-selected');

        const input = card.querySelector('input[type="radio"]');
        input.checked = true;

        const nome = card.querySelector('.plan-name').textContent;
        const preco = Number(input.dataset.price);

        summaryPlan.textContent = nome;
        summaryTotal.textContent = formatMT(preco);

        const refBanco = document.getElementById('refBanco');
        if (refBanco) {
          refBanco.textContent = 'AN-' + input.value.toUpperCase() + '-' + Date.now().toString().slice(-6);
        }
      });
    });
  }

  // Métodos de pagamento
  const paymentMethods = document.querySelectorAll('.payment-method');
  const paymentFieldGroups = document.querySelectorAll('.payment-fields');
  const noMethodHint = document.getElementById('noMethodHint');

  if (paymentMethods.length) {
    paymentMethods.forEach((method) => {
      method.addEventListener('click', () => {
        paymentMethods.forEach((m) => m.classList.remove('is-selected'));
        method.classList.add('is-selected');
        method.querySelector('input[type="radio"]').checked = true;

        const selected = method.dataset.method;
        paymentFieldGroups.forEach((group) => {
          group.classList.toggle('is-active', group.dataset.fields === selected);
        });
        if (noMethodHint) noMethodHint.style.display = 'none';
      });
    });
  }

  // Confirmar pagamento (simulação — sem backend/gateway ligado)
  const confirmPayment = document.getElementById('confirmPayment');
  if (confirmPayment) {
    confirmPayment.addEventListener('click', () => {
      const planoSelecionado = document.querySelector('input[name="plano"]:checked');
      const metodoSelecionado = document.querySelector('input[name="metodo"]:checked');

      if (!planoSelecionado) {
        alert('Por favor, escolha um plano de anúncio.');
        return;
      }
      if (!metodoSelecionado) {
        alert('Por favor, escolha um método de pagamento.');
        return;
      }

      // TODO: substituir este bloco pela chamada real à gateway de pagamento
      // (ex: API M-Pesa/e-Mola, ou o teu backend que trata a transferência/cartão).
      console.log('Pedido de pagamento:', {
        plano: planoSelecionado.value,
        metodo: metodoSelecionado.value,
      });

      alert('Pedido de anúncio recebido! (Isto é uma simulação — ainda falta ligar a um backend/gateway de pagamento real.)');
    });
  }

});
