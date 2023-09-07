if (!customElements.get('featured-collection')) {
  class FeaturedCollection extends HTMLElement {
    constructor() {
      super();
      this.swiperEl = this.querySelector('.collection-swiper')
      this.options = {
        spaceBetween: 10,
        slidesPerView: 1,
        loop: true,
        threshold: 10,
        centeredSlides: false,
        preventClicksPropagation: false,
        navigation: {
          nextEl: '.collection-next',
          prevEl: '.collection-prev',
        },
        breakpoints: {
          640: {
            spaceBetween: 10,
            slidesPerView: 3,
            centeredSlides: false,
          },
          768: {
            spaceBetween: 10,
            slidesPerView: 4,
          },
          1024: {
            spaceBetween: 20,
            slidesPerView: 5
          },
          1280: {
            spaceBetween: 20,
            slidesPerView: 5
          },
          1440: {
            spaceBetween: 20,
            slidesPerView: 6
          }
        }
      }
    }
    create() {
      this.swiper = new Swiper(this.swiperEl, this.options)
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
  customElements.define('featured-collection', FeaturedCollection);
}
