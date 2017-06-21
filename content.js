// settings
let settings;

chrome.storage.sync.get({
	[KEY_AUTO_SEARCH]: DEFAULT_AUTO_SEARCH,
	[KEY_DATE]: DEFAULT_DATE,
	[KEY_LENGTH]: DEFAULT_LENGTH,
	[KEY_ENABLED]: DEFAULT_ENABLED,
	[KEY_REFRESH_RATE]: DEFAULT_REFRESH_RATE
}, function(items) {
	console.log('storage.sync.get: enabled=' + items.enabled);
	if(items.enabled) {
		settings = items;
		doCheck();
	}
});

function doCheck() {
  console.log('doCheck');
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
  console.log('findAvailability');
  var bookNowEl = searchResultsEl.querySelector('a.book_now');
  if (bookNowEl) {
    alert('There is an available site!');
  } else {
		scheduleRefresh();
  }
};

function scheduleRefresh() {
  console.log('scheduleRefresh');

	insertTimer();
	setTimeout(function() {
		location.reload();
	}, settings.refreshRate);
};

function insertTimer() {
	console.log('insertTimer');
	// TODO: insert an indicator for next refresh
}

function doSearch() {
    console.log('doSearch');
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
