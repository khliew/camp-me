// settings
let settings;

requestSettings(function(items) {
  settings = items;
  if (settings.enabled) {
    doCheck();
  }
});

function doCheck() {
  var searchResultsEl = document.getElementById('usearch_results');
  if (searchResultsEl) {
    findAvailability(searchResultsEl);
  } else {
    if (settings.autoSearch) {
      doSearch();
    } else {
      alert('Search has been cleared!');
    }
  }
};

function findAvailability(searchResultsEl) {
  var bookNowEl = searchResultsEl.querySelector('a.book_now');
  if (bookNowEl) {
    alert('There is an available site!');
  } else {
    scheduleRefresh();
  }
};

function scheduleRefresh() {
  setTimeout(function() {
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

  var interestEl = document.getElementById('interest');
  interestEl.value = 'camping';
  interestEl.dispatchEvent(changeEv);

  var lookingForEl = document.getElementById('lookingFor');
  lookingForEl.value = '2003'; // select tents
  lookingForEl.dispatchEvent(changeEv);

  var dateEl = document.getElementById('campingDate');
  dateEl.value = settings.date;
  dateEl.dispatchEvent(changeEv);

  var lengthEl = document.getElementById('lengthOfStay');
  lengthEl.value = settings.length;

  // injects the script to search in Yosemite Valley
  var actualCode = `(function() {UnifSearchEngine.selectResolvedAddress('::0:0::ChIJW3W51gPyloAR_WfP0khc5yY','4', 3);})();`;
  var script = document.createElement('script');
  script.textContent = actualCode;
  (document.head || document.documentElement).appendChild(script);
  script.remove();
};
