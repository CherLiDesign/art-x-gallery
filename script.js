// ===== Cursor Glow =====
const glow = document.querySelector('.cursor-glow');
if (glow && window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// ===== Mobile Menu =====
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
}

document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== Header Hide/Show =====
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll && currentScroll > 150) {
    header.classList.add('hidden');
  } else {
    header.classList.remove('hidden');
  }
  lastScroll = currentScroll;
});

// ===== Carousel =====
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const dots = document.querySelectorAll('.carousel-dots .dot');

if (track && slides.length > 0) {
  let currentIndex = 0;
  const totalSlides = slides.length;

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
  }

  prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  dots.forEach(dot => dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.index))));

  let autoPlay = setInterval(() => goToSlide(currentIndex + 1), 5000);

  const carousel = document.querySelector('.carousel');
  carousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
  carousel.addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => goToSlide(currentIndex + 1), 5000);
  });

  // Touch swipe
  let startX = 0;
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    clearInterval(autoPlay);
  });
  carousel.addEventListener('touchend', (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goToSlide(currentIndex + 1) : goToSlide(currentIndex - 1);
    }
    autoPlay = setInterval(() => goToSlide(currentIndex + 1), 5000);
  });
}

// ===== Synthetica Carousel =====
const synthTrack = document.querySelector('.synth-carousel-track');
const synthSlides = document.querySelectorAll('.synth-slide');
const synthCarousel = document.querySelector('.synth-carousel');

if (synthTrack && synthSlides.length > 0) {
  let synthIndex = 0;
  const synthTotal = synthSlides.length;

  // Find the carousel buttons inside synth-carousel
  const synthPrev = synthCarousel.querySelector('.carousel-btn.prev');
  const synthNext = synthCarousel.querySelector('.carousel-btn.next');

  function goToSynthSlide(index) {
    if (index < 0) index = synthTotal - 1;
    if (index >= synthTotal) index = 0;
    synthIndex = index;
    synthTrack.style.transform = `translateX(-${synthIndex * 100}%)`;
  }

  synthPrev.addEventListener('click', () => goToSynthSlide(synthIndex - 1));
  synthNext.addEventListener('click', () => goToSynthSlide(synthIndex + 1));

  let synthAuto = setInterval(() => goToSynthSlide(synthIndex + 1), 4000);
  synthCarousel.addEventListener('mouseenter', () => clearInterval(synthAuto));
  synthCarousel.addEventListener('mouseleave', () => {
    synthAuto = setInterval(() => goToSynthSlide(synthIndex + 1), 4000);
  });

  let synthStartX = 0;
  synthCarousel.addEventListener('touchstart', (e) => {
    synthStartX = e.touches[0].clientX;
    clearInterval(synthAuto);
  });
  synthCarousel.addEventListener('touchend', (e) => {
    const diff = synthStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goToSynthSlide(synthIndex + 1) : goToSynthSlide(synthIndex - 1);
    }
    synthAuto = setInterval(() => goToSynthSlide(synthIndex + 1), 4000);
  });
}

// ===== Scroll Fade-In =====
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// ===== Parallax on Hero (subtle) =====
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (scrolled < window.innerHeight) {
      hero.style.opacity = 1 - scrolled / (window.innerHeight * 1.2);
      hero.querySelector('h1').style.transform = `translateY(${scrolled * 0.15}px)`;
    }
  });
}

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('formSuccess').style.display = 'block';
    contactForm.reset();
    setTimeout(() => {
      document.getElementById('formSuccess').style.display = 'none';
    }, 3000);
  });
}
