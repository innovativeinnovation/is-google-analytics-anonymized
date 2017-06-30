/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.
 * See the LICENSE file for more details.
 */

/*
 * Phantomjs script to get Google Analytics resources
 */

'use strict';

// Module
var querystring = require('querystring');
var system = require('system');
var page = require('webpage').create();
var url = require('url');

// How long should we wait for the page to load before we exit
var WAIT_TIME = 5000;

// If the page hasn't loaded after this, something is probably wrong.
var MAX_EXECUTION_TIME = 15000;

// Globals
var address = '';
var data = {
  trackers: [],
  hasError: false,
  errorMsg: '',
};

// Regular expressions of resources to log when we load them
var resourcesToLog = [
  new RegExp('^http(s)?://(www|ssl)\.google-analytics\.com.*'),
  new RegExp('^http(s)?://stats\.g\.doubleclick\.net.*'),
];

// Like ga('send', 'pageview');
var universalGA =
  new RegExp('^http(s)?://(www|ssl)\.google-analytics\.com/r/collect.*');

// Like _gaq.push(['_trackPageview']);
var asyncGA =
  new RegExp('^http(s)?://(www|ssl)\.google-analytics\.com/r/__utm.*');

// If we are still running after MAX_EXECUTION_TIME, log and exit
var onMaxExecutionTime = function() {
  data.hasError = true;
  data.errorMsg = 'FAILED: Max execution time ' +
    Math.round(MAX_EXECUTION_TIME) + ' seconds exceeded';
  console.log(JSON.stringify(data));
  phantom.exit(1);
};

// Open the page, wait and exit
var onPageOpen = function(status) {
  data.url = page.url;
  if (status !== 'success') {
    data.hasError = true;
    data.errorMsg = 'FAILED: to load ' + system.args[1] + '\n' + page.reason;
    console.log(JSON.stringify(data));
    phantom.exit(1);
  } else {
    // Catch redirect
    if (address !== page.url) {
      data.url = page.url;
    }
    setTimeout(function() {
      console.log(JSON.stringify(data));
      phantom.exit();
    }, WAIT_TIME);
  }
};

// Extract Google Analytics params
var extractGAParams = function(urlString, idTracker, idAnonymization) {
  var urlParsed = url.parse(urlString);
  var params = querystring.parse(urlParsed.query);
  if (params[idAnonymization]) {
    return {
      id: params[idTracker],
      anonymized: true,
    };
  }
  return {
    id: params[idTracker],
    anonymized: false,
  };
};

// Check we have a url, if not exit
if (system.args.length === 1) {
  data.hasError = true;
  data.errorMsg = 'Usage: get-google-analytics-resources.js ' +
    'http://www.myurl.com';
  console.log(JSON.stringify(data));
  phantom.exit(1);
} else {
  // Address is the url passed
  address = system.args[1];

  // Ignore Web page errors
  page.onError = function(msg, trace) {};

  // Every time a resource is requested
  page.onResourceRequested = function(res) {
    var length = resourcesToLog.length;
    while (length--) {
      if (resourcesToLog[length].test(res.url)) {
        var infos = {};
        data.url = address;
        if (res.url.match(universalGA)) {
          infos = extractGAParams(res.url, 'tid', 'aip');
          data.trackers.push(infos);
        } else if (res.url.match(asyncGA)) {
          infos = extractGAParams(res.url, 'utmac', 'aip');
          data.trackers.push(infos);
        }
      }
    }
  };

  // Make a note of any errors
  page.onResourceError = function(resourceError) {
    page.reason = resourceError.errorString;
  };

  // Open the page, wait and exit
  try {
    page.open(address, onPageOpen);
  } finally {
    setTimeout(onMaxExecutionTime, MAX_EXECUTION_TIME);
  }
}
