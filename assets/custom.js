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
