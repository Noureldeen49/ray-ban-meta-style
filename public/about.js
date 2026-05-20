// Scroll reveal
const targets = document.querySelectorAll('.manifesto, .founder, .num-grid > div, .cta, .hero h1, .hero-meta');
targets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in'), i * 60);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

targets.forEach(el => io.observe(el));

// Subtle parallax on hero headline
const display = document.querySelector('.display');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (display && y < 800) {
    display.style.transform = `translateY(${y * 0.15}px)`;
    display.style.opacity = String(1 - y / 700);
  }
});

// Cursor accent on founders
document.querySelectorAll('.founder-img').forEach(img => {
  img.addEventListener('mousemove', (e) => {
    const r = img.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 20;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 20;
    img.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
  });
  img.addEventListener('mouseleave', () => {
    img.style.transform = '';
  });
});