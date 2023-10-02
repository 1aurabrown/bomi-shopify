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
    this.mainDetailsToggle = this.querySelector('.mega-menu');
    console.log(this.mainDetailsToggle)
    this.summary = this.mainDetailsToggle.querySelector('button')
    this.summaryLink = this.summary.querySelector('a')

    this.content = this.summary.nextElementSibling;
    this.summary.addEventListener('keyup', this.onKeyUp.bind(this));
    this.mainDetailsToggle.addEventListener('keyup', this.escape.bind(this));

    this.summary.addEventListener('click', this.onClick.bind(this));
    this.summaryLink.addEventListener('click', this.onLinkClick.bind(this));
    this.mainDetailsToggle.addEventListener('mouseenter', this.open.bind(this));

    this.mainDetailsToggle.addEventListener('focusout', this.onFocusOut.bind(this));
    this.mainDetailsToggle.addEventListener('mouseleave', this.onMouseLeave.bind(this));
  }

  onKeyUp(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      if (this.mainDetailsToggle.classList.contains('open')) {
        this.close()
      } else {
        this.open(e, this.content.querySelector('a'))
      }
    }
  }
  escape(e) {
    if (e.keyCode === 27) {
      if (this.mainDetailsToggle.classList.contains('open')) {
        this.close()
        this.summary.focus();
      }
    }
  }

  onMouseLeave(e) {
    this.close(e);
  }

  onClick(e) {
    console.log('summary click')
    e.preventDefault();
  }

  onLinkClick(e) {
    console.log('link click')
    e.stopPropagation();
  }

  onFocusOut(e) {
    setTimeout(() => {
      if (!this.contains(document.activeElement)) {
        if (this.mainDetailsToggle.open) this.close(e);
      }
    });
  }

  open(e, focusEl) {
    debugger
    this.summary.setAttribute('aria-expanded', true);
    this.mainDetailsToggle.classList.add('open')

    trapFocus(
      this.content, focusEl
    );
  }

  close(e) {
    this.summary.setAttribute('aria-expanded', false);
    this.mainDetailsToggle.classList.remove('open');
  }
}

customElements.define('header-menu', HeaderMenu);