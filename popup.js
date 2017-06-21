

/** The extension-enabled element. */
let autoSearch;
let date;
let enabled;
let length;
let interval;

/**
 * Load settings.
 */
function loadSettings() {
  chrome.storage.sync.get({
    [KEY_AUTO_SEARCH]: DEFAULT_AUTO_SEARCH,
    [KEY_DATE]: DEFAULT_DATE,
    [KEY_LENGTH]: DEFAULT_LENGTH,
    [KEY_ENABLED]: DEFAULT_ENABLED,
    [KEY_REFRESH_RATE]: DEFAULT_REFRESH_RATE
  }, function(items) {
    setExtensionEnabled(items);
  });
}

/**
 * Saves a setting value.
 */
function saveSetting(key, value) {
  chrome.storage.sync.set({[key]: value});
}

/**
 * Sets whether or not the extension is enabled.
 */
function setExtensionEnabled(settings) {
  console.log('setExtensionEnabled');
  enabled.checked = settings.enabled;
  interval.value = settings.refreshRate / 1000;
  autoSearch.checked = settings.autoSearch;
  date.value = settings.date;
  length.value = settings.length;
}

function onEnableExtensionChange(event) {
  saveSetting(KEY_ENABLED, event.target.checked);
}

function onIntervalChange(event) {
  saveSetting(KEY_REFRESH_RATE, event.target.value * 1000);
}

function onAutoSearchChange(event) {
  saveSetting(KEY_AUTO_SEARCH, event.target.checked);
}

function onDateChange(event) {
  saveSetting(KEY_DATE, event.target.value);
}

function onLengthChange(event) {
  saveSetting(KEY_LENGTH, event.target.value);
}

document.addEventListener('DOMContentLoaded', function() {
  enabled = document.getElementById('enableExtension');
  enabled.onchange = onEnableExtensionChange;

  interval = document.getElementById('interval');
  interval.onchange = onIntervalChange;

  autoSearch = document.getElementById('enableAutoSearch');
  autoSearch.onchange = onAutoSearchChange;

  date = document.getElementById('date');
  date.onchange = onDateChange;

  length = document.getElementById('length');
  length.onchange = onLengthChange;

  loadSettings();
});
