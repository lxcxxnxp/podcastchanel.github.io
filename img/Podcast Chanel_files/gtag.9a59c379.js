/* eslint-disable prefer-template */
/* eslint-disable no-var */
/* eslint-disable no-console */

(function (w) {
  function readJSONFromDOM(id, defaultValue) {
    try {
      return JSON.parse(document.getElementById(id).innerHTML) || defaultValue;
    } catch (err) {
      console.error('Error: element #' + id + ' was not readable in DOM.', err);
      return defaultValue;
    }
  }

  var config = readJSONFromDOM('config', {});

  w.dataLayer = w.dataLayer || [];

  w.gtag = function () {
    w.dataLayer.push(arguments);
  };

  w.gtag('js', new Date());

  w.gtag('set', {
    dimension8: config.app_name || 'default_app_name', // Product name
    dimension9: config.isAnonymous ? '0' : '1', // Logged out/in
  });

  w.gtag('config', 'UA-5784146-31', {
    experiments: readJSONFromDOM('baba', []),
    optimize_id: 'GTM-W53X654',
    anonymize_ip: true,
    user_id: (function () {
      try {
        const match = w.document.cookie.match(/sp_t=([^;]+)/);
        if (match && match[1]) {
          return match[1];
        }
        return null;
      } catch (err) {
        return null;
      }
    })(),
  });
})(window);
