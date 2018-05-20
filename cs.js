/**
 * This is the content script file that loads a custom checking script.
 */

let checkDelay = 0 * 1000; // in milliseconds

let settings;

window.addEventListener('load', () => requestSettings(function (items) {
  settings = items;

  if (settings.enabled) {
    if (checkDelay) {
      // need to add a delay once page loads
      setTimeout(function () {
        startCheck();
      }, checkDelay);
    } else {
      startCheck();
    }
  }
}));

function startCheck() {
  console.log('doCheck');
  let result = onCheck();

  if (result) {
    postNotification('Alert!');
  } else {
    scheduleRefresh();
  }
};

function scheduleRefresh() {
  setTimeout(function () {
    location.reload();
  }, settings.refreshRate);

  var endTime = Date.now() + settings.refreshRate;
  insertCountdown(endTime);
};
