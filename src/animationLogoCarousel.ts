import gsap from 'gsap';

const LOGO_CAROUSEL = document.querySelector('[data-gsap-logo-list]');
const CAROUSEL_OPTIONS = {
  xPercent: -100,
  repeat: -1,
  duration: 45,
  ease: 'linear',
  yoyo: true,
  paused: false,
};

const tlCarousel = gsap.timeline();

if (LOGO_CAROUSEL) {
  LOGO_CAROUSEL.addEventListener('mouseenter', () => {
    tlCarousel.pause();
  });

  LOGO_CAROUSEL.addEventListener('mouseleave', () => {
    tlCarousel.play();
  });
}

tlCarousel.to(LOGO_CAROUSEL, {
  ...CAROUSEL_OPTIONS,
});
