/* Settings keys */
const KEY_AUTO_SEARCH = 'autoSearch';
const KEY_DATE = 'date';
const KEY_ENABLED = 'enabled';
const KEY_LENGTH = 'length';
const KEY_REFRESH_RATE = 'refreshRate';

/* Default settings values */
const DEFAULT_AUTO_SEARCH = true;
const DEFAULT_ENABLED = true;
const DEFAULT_DATE = '07/28/2017';
const DEFAULT_LENGTH = '1';
const DEFAULT_REFRESH_RATE = 5 * 60 * 1000;

/**
 * Requests settings and returns them in callback.
 */
function requestSettings(callback) {
  chrome.storage.sync.get({
    [KEY_AUTO_SEARCH]: DEFAULT_AUTO_SEARCH,
    [KEY_DATE]: DEFAULT_DATE,
    [KEY_LENGTH]: DEFAULT_LENGTH,
    [KEY_ENABLED]: DEFAULT_ENABLED,
    [KEY_REFRESH_RATE]: DEFAULT_REFRESH_RATE
  }, function(items) {
    callback(items);
  });
}
