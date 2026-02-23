const menuToggle = document.querySelector('.menu-toggle');
const drawer = document.getElementById('mobile-drawer');
const backdrop = document.querySelector('.backdrop');
const closeTargets = document.querySelectorAll('[data-close-menu]');

function setMenu(open) {
  if (!menuToggle || !drawer || !backdrop) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  drawer.setAttribute('aria-hidden', String(!open));
  drawer.classList.toggle('is-open', open);
  backdrop.hidden = !open;
  if (open) {
    drawer.querySelector('a,button')?.focus();
  } else {
    menuToggle.focus();
  }
}

menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  setMenu(!expanded);
});

closeTargets.forEach((el) => el.addEventListener('click', () => setMenu(false)));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

const heroSlides = Array.from(document.querySelectorAll('.hero-slider img'));
let slideIndex = 0;
if (heroSlides.length > 1) {
  setInterval(() => {
    heroSlides[slideIndex].classList.remove('is-active');
    slideIndex = (slideIndex + 1) % heroSlides.length;
    heroSlides[slideIndex].classList.add('is-active');
  }, 5600);
}

const galleryTrack = document.querySelector('[data-gallery-track]');
const prevBtn = document.querySelector('[data-gallery-prev]');
const nextBtn = document.querySelector('[data-gallery-next]');
const galleryStep = () => (galleryTrack ? galleryTrack.clientWidth * 0.92 : 320);

prevBtn?.addEventListener('click', () => {
  galleryTrack?.scrollBy({ left: -galleryStep(), behavior: 'smooth' });
});

nextBtn?.addEventListener('click', () => {
  galleryTrack?.scrollBy({ left: galleryStep(), behavior: 'smooth' });
});

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

const inlinePlaceholder =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#2d3f2f"/><stop offset="1" stop-color="#5b4727"/></linearGradient></defs><rect width="1200" height="800" fill="url(#g)"/></svg>',
  );

document.querySelectorAll('img').forEach((img) => {
  img.addEventListener(
    'error',
    () => {
      img.dataset.missing = 'true';
      img.src = inlinePlaceholder;
    },
    { once: true },
  );
});
