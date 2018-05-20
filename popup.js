/**
 * This script controls the extension popup.
 */

/* HTML elements */
let enabled;
let interval;

/**
 * Saves a setting value.
 */
function saveSetting(key, value) {
  chrome.storage.sync.set({[key]: value});
}

/**
 * Loads settings.
 */
function loadSettings(settings) {
  enabled.checked = settings.enabled;
  interval.value = settings.refreshRate / 1000;
}

function onEnableExtensionChange(event) {
  saveSetting(KEY_ENABLED, event.target.checked);
}

function onIntervalChange(event) {
  saveSetting(KEY_REFRESH_RATE, event.target.value * 1000);
}

document.addEventListener('DOMContentLoaded', function() {
  enabled = document.getElementById('enableExtension');
  enabled.onchange = onEnableExtensionChange;

  interval = document.getElementById('interval');
  interval.onchange = onIntervalChange;

  requestSettings(function(settings) {
    loadSettings(settings);
  });
});
