/* eslint-disable default-case */
import { ROOT_APP_ID } from '../Popup/lib/utils';

console.debug('[@@@@ content]', 'start');
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
  if (msg.from === 'background' && msg.subject === 'toggle') {
    const SHOW_APP_ON_INIT = toggle();
    response({ SHOW_APP_ON_INIT });
  }
  if (msg.from === 'popup' && msg.subject === 'toggle') {
    toggle();
  }
  if (msg.from === 'popup' && msg.subject === 'changeTextColors') {
    const labels = msg?.data || [];
    labels.reverse();
    labels.forEach((label) => {
      document.body.innerHTML = document.body.innerHTML.replace(
        label.span_text.substring(0, 10),
        `<span style="color: black; background-color:${chooseColorByEmotion(
          label.name
        )}">${label.span_text.substring(0, 10)}</span>`
      );
    });
    // labels.forEach((label) => {
    //   document.body.textContent = replaceRange(
    //     document.body.textContent,
    //     label.span[0],
    //     label.span[0] + 2,
    //     `<span style="color: black; background-color:${chooseColorByEmotion(
    //       label.name
    //     )}">${label.span_text}</span>`
    //   );
    // });
  }
});

const replaceRange = (str, start, end, substitute) => {
  const a = 3;
  return str.substring(0, start) + substitute + str.substring(end);
};

const chooseColorByEmotion = (emotion) => {
  switch (emotion) {
    case 'fear':
      return 'rgb(0 251 64)';
    case 'sadness':
      return '#4e4dff';
    case 'happiness':
      return 'rgb(242 61 233)';
    case 'anger':
      return 'rgb(255 232 0)';
    case 'surprise':
      return 'rgb(1 255 255)';
  }
};

function toggle() {
  console.debug('[@@@@ content] toggle');
  const root = document.getElementById(ROOT_APP_ID);
  if (root?.style?.transform === 'translateX(0px)') {
    hide();
    return false;
  } else {
    show();
    return true;
  }
}

function show() {
  const app = document.querySelector(`#${ROOT_APP_ID}`);
  app.style.transform = 'translateX(0)';
  chrome.storage.sync.set({ SHOW_APP_ON_INIT: true }, function () {
    console.log('[@@@@ content] set show on init:', true);
  });
}

function hide() {
  const app = document.querySelector(`#${ROOT_APP_ID}`);
  app.style.transform = 'translateX(100%)';
  chrome.storage.sync.set({ SHOW_APP_ON_INIT: false }, function () {
    console.log('[@@@@ content] set show on init:', false);
  });
}

(function initApp() {
  console.debug('[@@@@ content]', 'initApp');
  const body = document.querySelector('body');
  const app = document.createElement('div');
  const shadowRoot = app.attachShadow({ mode: 'closed' });
  const iframe = document.createElement('iframe');

  iframe.src = chrome.runtime.getURL('popup.html');
  iframe.setAttribute('frameborder', '0');
  iframe.style.cssText = ` 
    width: 403px;
    height: 100%;
    border-radius: 5px;
    box-shadow: rgb(0 0 0 / 15%) 0px 5px 15px 0px;
  `;
  app.style.cssText = ` 
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    padding: 12px 12px 12px 0px;
    z-index: 1000000000000000000;
    transition: transform 0.5s;
    transform: translateX(100%)
  `;
  shadowRoot.appendChild(iframe);
  app.id = `${ROOT_APP_ID}`;
  body.prepend(app);
  chrome.storage.sync.get(['SHOW_APP_ON_INIT'], (result) => {
    console.log('[content] show on init:', result.SHOW_APP_ON_INIT);
    if (result.SHOW_APP_ON_INIT) {
      show();
    } else {
      hide();
    }
  });
  // debugger;
})();
