console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.tabs.onActivated.addListener(function (activeInfo) {
  console.log('%%%%%%%%%%%%%%%', activeInfo.tabId);
});
