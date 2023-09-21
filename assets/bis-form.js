if (!customElements.get('bis-form')) {
  customElements.define('bis-form', class ProductForm extends HTMLElement {
    constructor() {
      super();

      this.form = this.querySelector('form');
      this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
      this.emailEl = this.form.querySelector('input[name="email"')
      this.variantIdEl = this.form.querySelector('input[name="variantId"')
      this.productIdEl = this.form.querySelector('input[name="productId"')
      this.messageEl = this.form.querySelector('#bis-message')
    }

    onSubmitHandler(e) {
      e.preventDefault()
      debugger
      this.messageEl.innerHTML = '';
      this.form.disabled = true;

      const email = this.emailEl.value
      const variantId = this.variantIdEl.value
      const productId = this.productIdEl.value
      const acceptsMarketing = false

      BIS.create(email, variantId, productId, { accepts_marketing: acceptsMarketing })
        .then(function(res) {
          this.form.disabled = false;
          var msg = '';
          if (res.status == 'OK') {
            msg = res.message
          } else{
            for (var k in res.errors) {  // collect all the error messages into a string
              msg += (res.errors[k]);
            }
          }
          this.messageEl.innerHTML = msg;
        }.bind(this))
    }
  });
}