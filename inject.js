/*
 * This script injects other scripts into a page.
 */

loadScripts();

function loadScripts() {
  var script = document.createElement('script');
  script.src = chrome.extension.getURL('common.js');
  document.head.appendChild(script);

  script = document.createElement('script');
  script.src = chrome.extension.getURL('page.js');
  document.head.appendChild(script);
}
