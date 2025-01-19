import gsap from 'gsap';

const TESTIMONIAL_LIST_LEFT = document.querySelector('[data-gsap-testimonial-left]');
const TESTIMONIAL_LIST_RIGHT = document.querySelector('[data-gsap-testimonial-right]');
const buttons = document.querySelectorAll('[data-gsap-testimonial-button]');
const items = document.querySelectorAll('[data-gsap-testimonial-item]');

const TESTIMONIAL_OPTIONS = {
  yPercent: -80,
  repeat: -1,
  duration: 45,
  ease: 'linear',
  yoyo: true,
  paused: false,
};

const tlListLeft = gsap.timeline();
const tlListRight = gsap.timeline();

buttons.forEach((button) => {
  button.style.display = 'none';
  const buttonParent = button.closest('[data-gsap-testimonial-item]');

  buttonParent?.addEventListener('mouseenter', () => {
    if (button.getAttribute('src') === '' || button.getAttribute('src')?.includes('#')) {
      button.style.display = 'none';
    } else {
      button.style.display = 'block';
    }
  });

  buttonParent?.addEventListener('mouseleave', () => {
    button.style.display = 'none';
  });
});

if (TESTIMONIAL_LIST_LEFT && TESTIMONIAL_LIST_RIGHT) {
  TESTIMONIAL_LIST_LEFT.addEventListener('mouseenter', () => {
    tlListLeft.pause();
  });

  TESTIMONIAL_LIST_RIGHT.addEventListener('mouseenter', () => {
    tlListRight.pause();
  });

  TESTIMONIAL_LIST_LEFT.addEventListener('mouseleave', () => {
    tlListLeft.play();
  });

  TESTIMONIAL_LIST_RIGHT.addEventListener('mouseleave', () => {
    tlListRight.play();
  });
}

tlListLeft
  .to(TESTIMONIAL_LIST_LEFT, {
    ...TESTIMONIAL_OPTIONS,
  })
  .totalProgress(0.5);

tlListRight
  .from(TESTIMONIAL_LIST_RIGHT, {
    ...TESTIMONIAL_OPTIONS,
  })
  .totalProgress(0.5);

items.forEach((item, index) => {
  const button = buttons[index];

  function mouseMove(event) {
    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left - 50;
    const y = event.clientY - rect.top - 25;

    button.style.transform = `translate(${x}px, ${y}px)`;
  }

  item.addEventListener('mousemove', mouseMove);

  item.addEventListener('mouseenter', () => {
    button.style.display = 'block';
  });

  item.addEventListener('mouseleave', () => {
    button.style.display = 'none';
  });
});
