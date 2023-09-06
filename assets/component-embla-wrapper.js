if (!customElements.get('embla-wrapper')) {
  class EmblaWrapper extends HTMLElement {
    constructor() {
      super();
      this.emblaEl = this.querySelector('.embla') || this
      this.options = {
        loop: this.dataset.loop == 'true' ? true : false,
        align: this.dataset.align || 0,
        speed: 20,
        containScroll: 'keepSnaps',
        active: this.dataset.desktopOnly || true,
        breakpoints: this.dataset.mobileOnly ? {
          '(min-width: 768px)': { active: false },
        } : {},
      }
    }

    create() {
      this.embla = EmblaCarousel(this.emblaEl, this.options)
    }

    connectedCallback() {
      if (typeof(EmblaCarousel) != 'undefined') {
        this.create()
      } else {
        document.addEventListener('emblaLoaded', () => {
          this.create()
        })
      }
    }

    disconnectedCallback() {
      if (this.embla) {
        this.embla.destroy();
      }
    }

  }
  customElements.define('embla-wrapper', EmblaWrapper);
}
