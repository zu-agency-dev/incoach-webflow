interface TransitionConfig {
  introDurationMS: number;
  exitDurationMS: number;
  excludedClass: string;
}

function handlePageLoad(config: TransitionConfig, trigger: HTMLElement): void {
  trigger.click();
  document.body.classList.add('no-scroll-transition');
  setTimeout(() => {
    document.body.classList.remove('no-scroll-transition');
  }, config.introDurationMS);
}

function setupLinkHandlers(config: TransitionConfig, trigger: HTMLElement): void {
  document.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLAnchorElement;
    if (!target.matches('a')) return;

    const isInternalLink = target.hostname === window.location.host;
    const isHashLink = target.href.includes('#');
    const isExcluded = target.classList.contains(config.excludedClass);
    const isNewTab = target.target === '_blank';

    if (isInternalLink && !isHashLink && !isExcluded && !isNewTab) {
      e.preventDefault();
      document.body.classList.add('no-scroll-transition');
      trigger.click();

      setTimeout(() => {
        window.location.href = target.href;
      }, config.exitDurationMS);
    }
  });
}

function setupBackButtonHandler(): void {
  window.onpageshow = (event: PageTransitionEvent) => {
    if (event.persisted) {
      window.location.reload();
    }
  };
}

function setupResizeHandler(introDurationMS: number): void {
  setTimeout(() => {
    window.addEventListener('resize', () => {
      setTimeout(() => {
        const transition = document.querySelector('.transition') as HTMLElement;
        if (transition) {
          transition.style.display = 'none';
        }
      }, 50);
    });
  }, introDurationMS);
}

function initializePageTransition(config: TransitionConfig): void {
  const transitionTrigger = document.querySelector('.transition-trigger');

  if (transitionTrigger instanceof HTMLElement) {
    handlePageLoad(config, transitionTrigger);
    setupLinkHandlers(config, transitionTrigger);
    setupBackButtonHandler();
    setupResizeHandler(config.introDurationMS);
  }
}

// Initialize the transition
initializePageTransition({
  introDurationMS: 800,
  exitDurationMS: 1300,
  excludedClass: 'no-transition',
});
