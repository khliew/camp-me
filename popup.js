/* HTML elements */
let autoSearch;
let date;
let enabled;
let length;
let interval;

/**
 * Saves a setting value.
 */
function saveSetting(key, value) {
  chrome.storage.sync.set({[key]: value});
}

/**
 * Sets whether or not the extension is enabled.
 */
function loadSettings(settings) {
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

  requestSettings(function(settings) {
    loadSettings(settings);
  });
});
