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
 * Inserts a countdown into the page until the next refresh.
 */
function insertCountdown(endTime) {
	var html = `
		<div style='position: fixed; bottom: 16px; left: 16px; width: 112px; height: 64px; background-color: lightgray; box-shadow: 0 0 1em gray;'>
			<div style='position: absolute; left: 8px; top: 8px'>
				<label>Camp Me</label>
				<br>
				<span>Time to refresh:</span>
				<br>
				<b id='ce_time'>${toTimeText((endTime - Date.now()) / 1000)}</b>
			</div>
		</div>
	`;
	document.body.insertAdjacentHTML('beforeend', html);

	var time = document.getElementById('ce_time');

	var intervalId = setInterval(function() {
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
