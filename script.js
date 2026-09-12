(() => {
  const root = document.documentElement;
  root.classList.add('js');

  const safeStorage = {
    get(key) {
      try { return window.localStorage.getItem(key); } catch { return null; }
    },
    set(key, value) {
      try { window.localStorage.setItem(key, value); } catch { /* storage is optional */ }
    },
  };

  const themeToggle = document.querySelector('[data-theme-toggle]');
  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    if (themeToggle) {
      const isLight = theme === 'light';
      themeToggle.setAttribute('aria-pressed', String(isLight));
      themeToggle.querySelector('.theme-label').textContent = isLight ? 'Modo escuro' : 'Modo claro';
      themeToggle.querySelector('.theme-icon').textContent = isLight ? '◐' : '☼';
    }
  };

  applyTheme(safeStorage.get('orbitops-theme') || 'dark');
  themeToggle?.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
    safeStorage.set('orbitops-theme', nextTheme);
  });

  const header = document.querySelector('[data-header]');
  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const closeMenu = () => {
    mobileMenu?.classList.remove('is-open');
    mobileMenu?.setAttribute('aria-hidden', 'true');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) menuToggle.querySelector('.sr-only').textContent = 'Abrir menu';
  };
  menuToggle?.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.querySelector('.sr-only').textContent = isOpen ? 'Fechar menu' : 'Abrir menu';
  });
  mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const tabs = [...document.querySelectorAll('[data-demo]')];
  const panels = [...document.querySelectorAll('[data-panel]')];
  const activateTab = (tab) => {
    const key = tab.dataset.demo;
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel) => {
      const active = panel.dataset.panel === key;
      panel.hidden = !active;
      panel.classList.toggle('is-active', active);
    });
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === 'ArrowLeft' ? -1 : 1;
      const targetIndex = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + direction + tabs.length) % tabs.length;
      tabs[targetIndex].focus();
      activateTab(tabs[targetIndex]);
    });
  });

  const range = document.querySelector('#teamRange');
  const teamValue = document.querySelector('[data-team-value]');
  const hoursValue = document.querySelector('[data-hours-value]');
  const savingsValue = document.querySelector('[data-savings-value]');
  const teamSteps = [1, 10, 25, 50, 100];
  const hoursPerPerson = [1.7, 1.7, 1.65, 1.6, 1.55];
  const formatCurrency = (value) => value >= 1000 ? `R$ ${(value / 1000).toFixed(0)}k` : `R$ ${value}`;
  const updateCalculator = () => {
    if (!range || !teamValue || !hoursValue || !savingsValue) return;
    const step = Number(range.value);
    const people = teamSteps[step - 1];
    const hours = Math.round(people * hoursPerPerson[step - 1] * 4);
    const savings = hours * 12 * 180;
    teamValue.value = people === 100 ? '100+ pessoas' : `${people} ${people === 1 ? 'pessoa' : 'pessoas'}`;
    teamValue.textContent = teamValue.value;
    hoursValue.textContent = hours.toLocaleString('pt-BR');
    savingsValue.textContent = formatCurrency(savings);
  };
  range?.addEventListener('input', updateCalculator);
  updateCalculator();

  const consoleAction = document.querySelector('[data-console-action]');
  const consoleToast = document.querySelector('[data-console-toast]');
  let consoleToastTimer;
  consoleAction?.addEventListener('click', () => {
    window.clearTimeout(consoleToastTimer);
    consoleToast.textContent = 'Atualizado · nenhum alerta novo';
    consoleToast.classList.add('is-visible');
    consoleToastTimer = window.setTimeout(() => consoleToast.classList.remove('is-visible'), 2600);
  });

  const toast = document.querySelector('[data-toast]');
  const demoForm = document.querySelector('#demoForm');
  let toastTimer;
  const showToast = (message) => {
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('is-visible');
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 5200);
  };
  demoForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!demoForm.checkValidity()) {
      demoForm.reportValidity();
      return;
    }
    const button = demoForm.querySelector('.button-submit');
    button.disabled = true;
    button.innerHTML = 'Pedido recebido <span aria-hidden="true">✓</span>';
    showToast('Órbita confirmada. A equipe OrbitOps entra em contato em breve.');
    window.setTimeout(() => {
      demoForm.reset();
      button.disabled = false;
      button.innerHTML = 'Quero conhecer o OrbitOps <span aria-hidden="true">↗</span>';
    }, 3200);
  });

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
