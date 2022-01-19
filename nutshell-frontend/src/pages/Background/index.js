console.log('This is the background page.');
console.log('Put the background scripts here.');

// chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
//   console.log(msg);
//   sendResponse(chrome.runtime.getURL('/dist/panel.html'));
// });
// chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
//   let url = tabs[0].url;
//   // use `url` here inside the callback because it's asynchronous!
//   console.log('@@@@@', url);
// });
// chrome.tabs.query(
//   { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
//   function (tabs) {
//     alert(tabs[0].url);
//   }
// );

// chrome.tabs.onActivated.addListener((activeInfo) => move(activeInfo));

// async function move(activeInfo) {
//   try {
//     await chrome.tabs.move(activeInfo.tabId, { index: 0 });
//     console.log('Success.');
//   } catch (error) {
//     if (
//       error ==
//       'Error: Tabs cannot be edited right now (user may be dragging a tab).'
//     ) {
//       setTimeout(() => move(activeInfo), 50);
//     }
//   }
// }
