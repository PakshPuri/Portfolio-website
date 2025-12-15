const toggleBtn = document.querySelector('[data-theme-toggle]');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') document.body.classList.add('light');
toggleBtn?.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
});
const observer = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) e.target.classList.add('visible');
  }
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.querySelectorAll('.card').forEach(card => {
  let rect;
  const onMove = (e) => {
    rect = rect || card.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const rx = ((y / rect.height) - 0.5) * -6;
    const ry = ((x / rect.width) - 0.5) * 6;
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const reset = () => { card.style.transform = 'rotateX(0) rotateY(0)'; rect = null; };
  card.addEventListener('mousemove', onMove);
  card.addEventListener('mouseleave', reset);
});
document.querySelectorAll('img[data-src]').forEach(img => {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      img.src = img.dataset.src;
      img.onload = () => img.style.filter = 'none';
      io.disconnect();
    });
  });
  io.observe(img);
});
const parallaxEls = document.querySelectorAll('.parallax');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  parallaxEls.forEach(el => {
    el.style.backgroundPosition = `center ${-y * 0.2}px`;
  });
});
const svg = document.querySelector('.bg-svg');
if (svg) {
  let t = 0;
  const animate = () => {
    t += 0.015;
    const hue = (Math.sin(t) * 30 + 200).toFixed(0);
    svg.style.filter = `hue-rotate(${hue}deg)`;
    requestAnimationFrame(animate);
  };
  animate();
}
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});