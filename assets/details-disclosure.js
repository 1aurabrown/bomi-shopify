class DetailsDisclosure extends HTMLElement {
  constructor() {
    super();
    this.mainDetailsToggle = this.querySelector('details');
    this.content = this.mainDetailsToggle.querySelector('summary').nextElementSibling;

    this.mainDetailsToggle.addEventListener('focusout', this.onFocusOut.bind(this));
    this.mainDetailsToggle.addEventListener('toggle', this.onToggle.bind(this));

    this.isClosing = false;
    this.isOpening = false;
  }

  onFocusOut() {
    setTimeout(() => {
      if (!this.contains(document.activeElement)) this.close();
    });
  }

  onToggle() {
    if (!this.animations) this.animations = this.content.getAnimations();

    if (this.mainDetailsToggle.open) {
      this.mainDetailsToggle.classList.remove('is-closing')
      this.mainDetailsToggle.classList.add('is-opening')
      setTimeout(function() {
        this.mainDetailsToggle.classList.remove('is-opening')
      }.bind(this), 1000)
      this.animations.forEach((animation) => animation.play());
    } else {
      this.mainDetailsToggle.classList.remove('is-opening')
      this.mainDetailsToggle.classList.add('is-closing')
      setTimeout(function() {
        this.mainDetailsToggle.classList.remove('is-closing')
      }.bind(this), 1000)
      this.animations.forEach((animation) => animation.cancel());
    }
  }

  close() {
    this.mainDetailsToggle.removeAttribute('open');
    this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', false);
  }
}

customElements.define('details-disclosure', DetailsDisclosure);

class HeaderMenu extends DetailsDisclosure {
  constructor() {
    super();
    this.header = document.querySelector('.header-wrapper');
  }

  onToggle() {
    if (!this.header) return;
    this.header.preventHide = this.mainDetailsToggle.open;

    if (this.mainDetailsToggle.open) {
      this.mainDetailsToggle.classList.remove('is-closing')
      this.mainDetailsToggle.classList.add('is-opening')
      setTimeout(function() {
        this.mainDetailsToggle.classList.remove('is-opening')
      }.bind(this), 1000)
    } else {
      this.mainDetailsToggle.classList.remove('is-opening')
      this.mainDetailsToggle.classList.add('is-closing')
      setTimeout(function() {
        this.mainDetailsToggle.classList.remove('is-closing')
      }.bind(this), 1000)
    }
    if (document.documentElement.style.getPropertyValue('--header-bottom-position-desktop') !== '') return;
    document.documentElement.style.setProperty(
      '--header-bottom-position-desktop',
      `${Math.floor(this.header.getBoundingClientRect().bottom)}px`
    );
  }
}

customElements.define('header-menu', HeaderMenu);