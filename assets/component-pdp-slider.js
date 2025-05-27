if (!customElements.get('pdp-slider')) {
  class ProductSlider extends HTMLElement {
    constructor() {
      super();

      this.swiperEl = this.querySelector('.pdp-swiper')
      this.thumbsEl = this.querySelector('.pdp-slider__thumbs');
      this.nSlides = this.swiperEl.querySelectorAll('.swiper-slide').length
    }

    create() {
      if (this.thumbsEl) {
        this.thumbsSwiper = new Swiper(this.thumbsEl, {
          spaceBetween: 10,
          slidesPerView: 10,
          freeMode: true,
          watchSlidesVisibility: true,
          watchSlidesProgress: true,
          a11y: {
            enabled: true
          },
          breakpoints: {
            1024: {
              slidesPerView: 20,
            }
          }
        });
      }
      this.swiper = new Swiper(this.swiperEl, {
        spaceBetween: 10,
        slidesPerView: 1,
        enabled: this.nSlides > 1,
        loop: this.nSlides > 1,
        a11y: {
          enabled: true
        },
        threshold: 10,
        centeredSlides: false,
        preventClicksPropagation: false,
        navigation: {
          nextEl: '.pdp-next',
          prevEl: '.pdp-prev',
        },
        thumbs: this.thumbsSwiper ? {
          swiper: this.thumbsSwiper,
          slideThumbActiveClass: 'outline outline-black outline-1 outline-offset-2',
          multipleActiveThumbs: false
        } : false,
        breakpoints: {
          1024: {
            spaceBetween: 10,
            slidesPerView: 2,
            enabled: this.nSlides > 2,
          }
        }
      })
    }

    connectedCallback() {
      if (typeof(Swiper) != 'undefined') {
        this.create()
      } else {
        document.addEventListener('swiperLoaded', () => {
          this.create()
        })
      }
    }

    disconnectedCallback() {
      if (this.swiper) {
        this.swiper.destroy();
      }
    }

  }
  customElements.define('pdp-slider', ProductSlider);
}
