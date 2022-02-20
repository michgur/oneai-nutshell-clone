/* eslint-disable default-case */
// Inform the background page that
// this tab should have a page-action.
chrome.runtime.sendMessage({
  from: 'content',
  subject: 'showPageAction',
});

console.debug('[@@@@ content]', 'start');
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  console.debug('[@@@@ content]', msg);
  if (msg.from === 'popup' && msg.subject === 'DOMInfo') {
    var domInfo = {
      html: document.documentElement.innerHTML ?? '',
      url: document?.location?.href ?? '',
    };
    response(domInfo);
  }
  if (msg.from === 'popup' && msg.subject === 'changeTextColors') {
    console.log({ msg });
    const labels = msg?.data || [];
    labels.forEach((label) => {
      document.body.innerHTML = document.body.innerHTML.replace(
        label.span_text,
        `<span style="color: black; background-color:${chooseColorByEmotion(
          label.name
        )}">${label.span_text}</span>`
      );
    });
  }
});

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
