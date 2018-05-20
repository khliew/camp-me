/*
 * This script contains commonly used functions.
 */

/* Settings keys */

const KEY_ENABLED = 'enabled';
const KEY_REFRESH_RATE = 'refreshRate';

/* Default settings values */

const DEFAULT_ENABLED = true;
const DEFAULT_REFRESH_RATE = 5 * 60 * 1000; // 5 minutes

/**
 * Requests settings and returns them in callback.
 */
function requestSettings(callback) {
  chrome.storage.sync.get({
    [KEY_ENABLED]: DEFAULT_ENABLED,
    [KEY_REFRESH_RATE]: DEFAULT_REFRESH_RATE
  }, function (items) {
    callback(items);
  });
}

/**
 * Inserts a countdown into the page until the next refresh.
 */
function insertCountdown(endTime) {
  var html = `
    <div style='position: fixed; bottom: 16px; left: 16px; width: 112px; height: 72px; background-color: lightgray; box-shadow: 0 0 1em gray;'>
      <div style='position: absolute; left: 8px; top: 8px'>
        <p style='font-size: 12px'>Refresher</p>
        <p style='font-size: 12px'>Time to refresh:</p>
        <b id='ce_time'>${toTimeText((endTime - Date.now()) / 1000)}</b>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', html);

  var time = document.getElementById('ce_time');

  var intervalId = setInterval(function () {
    var interval = (endTime - Date.now()) / 1000;
    time.textContent = toTimeText(interval);

    if (interval < 0) {
      clearInterval(intervalId);
    }
  }, 1000);
}

/**
 * Converts a time (in seconds) into a readable text.
 */
function toTimeText(time) {
  min = parseInt(time / 60, 10);
  sec = parseInt(time % 60, 10);

  if (min < 10) {
    min = '0' + min;
  }
  if (sec < 10) {
    sec = '0' + sec;
  }

  return min + ':' + sec;
}

/**
 * Displays a notification.
 */
function postNotification(message) {
  window.postMessage({
    type: "REFRESHER_NOTIFY",
    text: message
  }, "*");
}

function showNotification(event) {
  if (event.data.type && (event.data.type == "REFRESHER_NOTIFY")) {
    Notification.requestPermission()
      .then(result => {
        let options = {
          body: event.data.text,
          requireInteraction: true
        };
        let n = new Notification('Refresher', options);
      });
  }
}
