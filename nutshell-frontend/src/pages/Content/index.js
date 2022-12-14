/* eslint-disable default-case */
import { isProbablyReaderable, Readability } from '@mozilla/readability';
import { eventLogger, UserEvent } from '../Popup/lib/event-logger';
import { addIDToElements, highLightToggle } from '../Popup/lib/highlight';
import { blackList, ROOT_APP_ID } from '../Popup/lib/utils';

console.debug('[@@@@ content]', 'start');
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  console.debug('[@@@@ content]', msg);
  // debugger;
  if (msg.from === 'popup' && msg.subject === 'DOMInfo') {
    // debugger;
    var htmlContent = new Readability(document.cloneNode(true), {
      serializer: (element) => element,
    }).parse()?.content?.textContent;
    var domInfo = {
      html: htmlContent,
      url: document?.location?.href ?? '',
      pageTitle:
        document?.querySelector('h1')?.textContent ??
        document?.querySelector('h2')?.textContent ??
        '',
    };
    response(domInfo);
  }
  if (msg.from === 'background' && msg.subject === 'toggle') {
    toggle();
  }
  if (msg.from === 'popup' && msg.subject === 'toggle') {
    toggle();
  }
  if (msg.from === 'popup' && msg.subject === 'totalClose') {
    totalHide();
  }
  if (msg.from === 'popup' && msg.subject === 'TOGGLE_EMOTIONS') {
    highLightToggle(msg?.data || []);
  }
  if (msg.from === 'popup' && msg.subject === 'SHOW_EMOTIONS') {
    highLightToggle(msg?.data || [], { forceShow: true });
  }
  if (msg.from === 'popup' && msg.subject === 'ADD_ID_TO_ELEMENTS') {
    addIDToElements(msg?.data || []);
  }
  if (msg.from === 'popup' && msg.subject === 'SCROLL_TO_ELEMENT') {
    const labelID = msg.data;
    document.getElementById(labelID)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  }
  return true;
});

function toggle() {
  console.debug('[@@@@ content] toggle');
  const root = document.getElementById(ROOT_APP_ID);
  if (root?.style?.transform === 'translateX(0px)') {
    hide();
    return false;
  } else {
    if (isProbablyReaderable(document)) {
      show();
      console.debug('[@@@@ content]', 'Site is probably readerable');
      return true;
    } else {
      console.debug('[@@@@ content]', 'Site is not probably readerable');
      return totalHide();
    }
  }
}

function isInBlackList() {
  return blackList.some((site) => window.location.host.includes(site.siteName));
}

function show({ logEvent = true } = {}) {
  const app = document.querySelector(`#${ROOT_APP_ID}`);

  // app.style.transform = 'translateX(0)';
  if (isInBlackList()) {
    app.style.setProperty('transform', 'translateX(100%)', 'important');
    app.style.setProperty('height', '0%', 'important');
  } else {
    app.style.setProperty('transform', 'translateX(0)', 'important');
    app.style.setProperty('height', '65%', 'important');
    app.style.setProperty('max-height', '609px', 'important');
  }
  if (logEvent) {
    sendEvent(UserEvent.NUTSHELL_OPENED);
  }
  chrome.storage.sync.set({ SHOW_APP_ON_INIT: true }, function () {
    console.debug('[@@@@ content] set show on init:', true);
  });
}

function hide({ logEvent = true } = {}) {
  const app = document.querySelector(`#${ROOT_APP_ID}`);
  if (isInBlackList()) {
    app.style.setProperty('transform', 'translateX(100%)', 'important');
  } else {
    app.style.setProperty('transform', 'translateX(92%)', 'important');
  }

  app.style.setProperty('height', '55px', 'important');
  app.style.setProperty('min-height', '34px', 'important');
  app.style.setProperty('max-height', '55px', 'important');
  app.style.setProperty('top', '14%', 'important');

  if (logEvent) {
    sendEvent(UserEvent.NUTSHELL_CLOSED);
  }
  chrome.storage.sync.set({ SHOW_APP_ON_INIT: false }, function () {
    console.debug('[@@@@ content] set show on init:', false);
  });
}
function totalHide({ logEvent = true } = {}) {
  const app = document.querySelector(`#${ROOT_APP_ID}`);
  // app.style.transform = 'translateX(100%)';
  app.style.setProperty('transform', 'translateX(100%)', 'important');
  app.style.setProperty('height', '90px', 'important');
  app.style.setProperty('top', '14%', 'important');

  if (logEvent) {
    sendEvent(UserEvent.NUTSHELL_CLOSED);
  }
  chrome.storage.sync.set({ SHOW_APP_ON_INIT: false }, function () {
    console.debug('[@@@@ content] set show on init:', false);
  });
}

const sendEvent = (event) => {
  chrome.storage.sync.get(['USER_ID'], (items) => {
    eventLogger(event, { uid: items.USER_ID });
  });
};

function getRandomToken() {
  // E.g. 8 * 32 = 256 bits token
  var randomPool = new Uint8Array(32);
  crypto.getRandomValues(randomPool);
  var hex = '';
  for (var i = 0; i < randomPool.length; ++i) {
    hex += randomPool[i].toString(16);
  }
  // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
  return hex;
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
    width: 503px !important;
    height: 100% !important;
    border-radius: 5px !important;
    // box-shadow: rgb(0 0 0 / 15%) 0px 5px 15px 0px !important;
  `;
  app.style.cssText = ` 
    position: fixed !important;
    top: 0 !important;
    bottom: 0 !important;
    right: 0 !important;
    height: 65% !important;
    padding: 12px 12px 12px 0px !important;
    z-index: 1000000000000000000 !important;
    transition: transform 0.5s !important;
    transform: translateX(100%) !important;
  `;
  shadowRoot.appendChild(iframe);
  app.id = `${ROOT_APP_ID}`;
  body.prepend(app);
  chrome.storage.sync.get(['SHOW_APP_ON_INIT', 'USER_ID'], (items) => {
    console.debug('[content] show on init:', items.SHOW_APP_ON_INIT);
    console.debug('[content] user id:', items.USER_ID);
    if (items.SHOW_APP_ON_INIT) {
      show({ logEvent: false });
    } else {
      hide({ logEvent: false });
    }
    if (items.USER_ID) {
      // chrome.storage.sync.remove('USER_ID', function () {}); // for debug
    } else {
      const USER_ID = getRandomToken();
      chrome.storage.sync.set({ USER_ID }, function () {});
    }
  });
  // debugger;
})();
