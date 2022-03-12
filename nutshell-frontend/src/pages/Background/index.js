console.debug('[background] start');

chrome.tabs.onActivated.addListener(function (activeInfo) {
  console.debug('[background] activeInfo.tabId', activeInfo.tabId);
});

chrome.action.onClicked.addListener((tab) => {
  // debugger;
  console.debug('[background] toggle message sent');
  chrome.tabs.sendMessage(
    tab.id,
    { from: 'background', subject: 'toggle' },
    (response) => {
      chrome.storage.sync.set(
        { SHOW_APP_ON_INIT: response.SHOW_APP_ON_INIT },
        () => {
          console.log(
            '[@@@@ background] set show on init:',
            response.SHOW_APP_ON_INIT
          );
        }
      );
    }
  );
});
