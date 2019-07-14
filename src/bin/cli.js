#!/usr/bin/env node

/*
 * Original work (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland,
 * VPSI, 2017-2018.
 * Modified work (c) William Belle, 2018-2019.
 * See the LICENSE file for more details.
 */

var isGoogleAnalyticsAnonymized = require('../lib/index.js');

var logSymbols = require('log-symbols');
var colors = require('colors');
var yargs = require('yargs')

  .command('url', 'URL to check')
  .required(1, 'URL is required')

  // Version
  .alias('v', 'version')

  // Help
  .help('h')
  .alias('h', 'help')
  .usage('Usage: $0 <url>')
  .example('$0 https://www.epfl.ch')
  .example('$0 https://apple.com');

var argv = yargs.argv;
var url = argv._[0];

var checkAllTrackers = function (trackers) {
  if (trackers.length <= 0) {
    return 2;
  }
  for (var i = 0; i < trackers.length; i++) {
    if (!trackers[i].anonymized) {
      return 0;
    }
  }
  return 1;
};

var putIsAnonymized = function (url) {
  console.log(
    logSymbols.success,
    colors.green('Google Analytics is anonymized on ' + url)
  );
};

var putIsNotAnonymized = function (url) {
  console.log(
    logSymbols.error,
    colors.red('Google Analytics is not anonymized on ' + url)
  );
};

var putNotUsingGA = function (url) {
  console.log(
    logSymbols.info,
    colors.blue('Google Analytics is not used on ' + url)
  );
};

isGoogleAnalyticsAnonymized(url, function (err, data) {
  if (err) {
    throw err;
  }
  var anonyme = checkAllTrackers(data.trackers);
  if (anonyme === 1) {
    putIsAnonymized(data.url);
  } else if (anonyme === 2) {
    putNotUsingGA(data.url);
  } else {
    putIsNotAnonymized(data.url);
  }
});
