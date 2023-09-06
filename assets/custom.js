/* Klaviyo Subscribe */

function klaviyoSubscribe (listId, email, params = {}) {
  const config = Object.assign({}, params, {
    g: listId,
    email
  })

  const body = Object.keys(config).reduce((str, key) => {
    str.append(key, config[key])
    return str
  }, new URLSearchParams())

  return fetch('https://manage.kmail-lists.com/ajax/subscriptions/subscribe', {
    method: 'POST',
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
    },
    body
  }).then(res => res.json())
}


function debounce(func, wait, immediate) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;

    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};

function updateCursor(e) {
  cursor.style.left = e.clientX + 'px'
  cursor.style.top = e.clientY + 'px'
}

function clickCursor(e) {
  cursor.classList.add('scale-125')
}

function releaseCursor(e) {
  cursor.classList.remove('scale-125')
}

function cursorEnter(e) {
  cursor.classList.add('scale-125')
}

function cursorLeave(e) {
  cursor.classList.remove('scale-125')
}

function cursorDisable(e) {
  cursor.classList.add('hidden')
}

function cursorEnable(e) {
  cursor.classList.remove('hidden')
}

addEventListener('DOMContentLoaded', (event) => {
  const cursor = document.querySelector('body.custom-cursor #cursor')
  if (!cursor) return;
  window.addEventListener('mousemove', updateCursor)
  window.addEventListener('mousedown', clickCursor)
  window.addEventListener('mouseup', releaseCursor)
  window.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, input[type=radio] ~ label, input[type=checkbox] ~ label, [role=button], .button, .text-link')) {
      cursorEnter(e)
    }

    if (e.target.closest('.button') || e.target.closest('.bg-black')) {
      cursor.classList.remove('border-black')
      cursor.classList.add('border-white')
    }


    if (e.target.closest('iframe')) {
      cursorDisable(e)
    }
  })

  window.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, input[type=radio] ~ label, input[type=checkbox] ~ label, [role=button], .button, .text-link')) {
      cursorLeave(e)
    }

    if (e.target.closest('.button') || e.target.closest('.bg-black')) {
      cursor.classList.remove('border-white')
      cursor.classList.add('border-black')
    }

    if (e.target.closest('iframe')) {
      cursorEnable(e)
    }
  })
})