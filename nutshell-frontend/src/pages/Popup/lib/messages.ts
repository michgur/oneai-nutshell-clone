chrome.runtime.onMessage.addListener((msg, sender, response) => {
  console.debug('[@@@@ content]', msg);
  // debugger;
  if (msg.from === 'popup' && msg.subject === 'DOMInfo') {
    var domInfo = {
      html: document.documentElement.innerHTML ?? '',
      url: document?.location?.href ?? '',
      pageTitle:
        document?.querySelector('h1')?.textContent ??
        document?.querySelector('h2')?.textContent ??
        '',
    };
    response(domInfo);
  }
});
