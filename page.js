window.addEventListener("message", function (event) {
  // only accept own messages
  if (event.source != window) {
    return;
  }

  showNotification(event);
}, false);
