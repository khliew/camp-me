// settings
let settings;

requestSettings(function (items) {
  settings = items;
  if (settings.enabled) {
    doCheck();
  }
});

function doCheck() {
  var searchResultsEl = document.getElementById('shoppingitems');
  var bookNowEl = searchResultsEl.querySelector('a.book.now');

  if (bookNowEl) {
    if (bookNowEl.textContent == 'Select') {
      alert('There is an available site!');
    } else if (bookNowEl.textContent == 'Enter Date') {
      if (settings.autoSearch) {
        doSearch();
      } else {
        alert('Search has been cleared!');
      }
    } else {
      alert('This is an unknown search state!');
    }
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

/**
 * Performs a search.
 */
function doSearch() {
  var changeEv = new Event('change');

  var dateEl = document.getElementById('campingDate');
  dateEl.value = settings.date;
  dateEl.dispatchEvent(changeEv);

  var lengthEl = document.getElementById('lengthOfStay');
  lengthEl.value = settings.length;

  var lookingForEl = document.getElementById('lookingFor');
  lookingForEl.value = '2003'; // select tents
  lookingForEl.dispatchEvent(changeEv);

  var filterEl = document.getElementById('filter');
  filterEl.click();
};
