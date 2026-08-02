// KIR CAKRAWALA — shared interactions
document.addEventListener('DOMContentLoaded', () => {

  /* Mobile nav toggle */
  const navToggle = document.getElementById('navToggle');
  const notebookNav = document.getElementById('notebookNav');
  if (navToggle && notebookNav) {
    navToggle.addEventListener('click', () => {
      notebookNav.classList.toggle('open');
      navToggle.textContent = notebookNav.classList.contains('open') ? '✕' : '☰';
    });
    notebookNav.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        notebookNav.classList.remove('open');
        navToggle.textContent = '☰';
      });
    });
  }

  /* Accordion (FAQ, cara kerja alat) */
  document.querySelectorAll('.accordion-item').forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');
    if (!trigger || !panel) return;
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.accordion-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.accordion-panel').style.maxHeight = null;
        }
      });
      item.classList.toggle('open', !isOpen);
      panel.style.maxHeight = !isOpen ? panel.scrollHeight + 'px' : null;
    });
  });

  /* Filter bars (prestasi level, galeri kategori) */
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const buttons = group.querySelectorAll('.filter-btn');
    const targetSelector = group.dataset.filterGroup;
    const items = document.querySelectorAll(targetSelector);
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const val = btn.dataset.filter;
        items.forEach(el => {
          const show = val === 'semua' || el.dataset.category === val;
          el.style.display = show ? '' : 'none';
        });
      });
    });
  });

  /* Reveal on scroll */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* Back to top */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('show', window.scrollY > 500);
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* Registration form: send to /api/register */
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    const submitBtn = registerForm.querySelector('#registerSubmit');
    const successBox = registerForm.querySelector('.form-success');
    const errorBox = registerForm.querySelector('.form-error');

    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorBox.textContent = '';
      errorBox.classList.remove('show');
      successBox.classList.remove('show');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Mengirim…';
      }

      const formData = new FormData(registerForm);
      const subjects = formData.getAll('subjects');
      const interests = formData.getAll('interests');
      const payload = Object.fromEntries(formData);
      payload.subjects = subjects;
      payload.interests = interests;

      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await res.json();

        if (!res.ok) throw new Error(result.error || 'Gagal mengirim');

        registerForm.reset();
        successBox.classList.add('show');
        successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } catch (err) {
        errorBox.textContent = 'Terjadi kesalahan. Coba lagi, atau hubungi kami lewat email.';
        errorBox.classList.add('show');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Kirim Pendaftaran →';
        }
      }
    });
  }

});
