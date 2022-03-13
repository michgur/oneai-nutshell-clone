console.debug('[background] start');

chrome.tabs.onActivated.addListener(function (activeInfo) {
  console.debug('[background] activeInfo.tabId', activeInfo.tabId);
});

chrome.action.onClicked.addListener((tab) => {
  // debugger;
  console.debug('[background] toggle message sent');
  chrome.tabs.sendMessage(tab.id, { from: 'background', subject: 'toggle' });
});
