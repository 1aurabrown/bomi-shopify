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

class HeaderMenu extends HTMLElement {
  constructor() {
    super();
    this.mainDetailsToggle = this.querySelector('details');
    this.summary = this.mainDetailsToggle.querySelector('summary')
    this.content = this.summary.nextElementSibling;

    this.summary.addEventListener('keyup', this.onKeyUp.bind(this));
    this.summary.addEventListener('click', this.onClick.bind(this));
    this.summary.addEventListener('mouseenter', this.open.bind(this));

    this.mainDetailsToggle.addEventListener('focusout', this.onFocusOut.bind(this));
    this.mainDetailsToggle.addEventListener('mouseleave', this.close.bind(this));
  }

  onKeyUp(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      if (this.mainDetailsToggle.open) {
        this.close()
      } else {
        this.open()
      }
    }
  }

  onClick(e) {
    e.preventDefault();
  }

  onFocusOut() {
    setTimeout(() => {
      if (!this.contains(document.activeElement)) this.close();
    });
  }

  open() {
    this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', true);
    if (!this.animations) this.animations = this.content.getAnimations();
    this.mainDetailsToggle.setAttribute('open', 'open')
    setTimeout(function() {
      this.mainDetailsToggle.classList.add('open')
    }.bind(this), 1);
    this.animations.forEach((animation) => animation.play());
  }

  close() {
    if (!this.animations) this.animations = this.content.getAnimations();
    this.mainDetailsToggle.classList.remove('open')
    this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', false);
    setTimeout(function() {
      this.mainDetailsToggle.removeAttribute('open');
    }.bind(this), 100)
    this.animations.forEach((animation) => animation.cancel());
  }
}

customElements.define('header-menu', HeaderMenu);