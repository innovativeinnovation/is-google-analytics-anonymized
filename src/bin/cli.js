#!/usr/bin/env node

/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.
 * See the LICENSE file for more details.
 */

'use strict';

var isGoogleAnalyticsAnonymized = require('../lib/index.js');

var logSymbols = require('log-symbols');
var colors     = require('colors');
var yargs      = require('yargs')

  .command('url', 'URL to request')
  .alias('url')
  .required(1, 'URL is required')

  // Version
  .alias('v', 'version')
  .version(function() {
    return require('../../package').version;
  })
  .describe('v', 'Show version information')

  // Help
  .help('h')
  .alias('h', 'help')
  .usage('Usage: $0 <url>');

var argv = yargs.argv;
var url  = argv._[ 0 ];

var checkAllTrackers = function(trackers) {
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

var putIsAnonymized = function() {
  console.log(
    logSymbols.success,
    colors.green('Google Analytics is anonymized')
  );
};

var putIsNotAnonymized = function() {
  console.log(
    logSymbols.error,
    colors.red('Google Analytics is not anonymized')
  );
};

var putNotUsingGA = function() {
  console.log(
    logSymbols.info,
    colors.blue('Google Analytics is not used')
  );
};

isGoogleAnalyticsAnonymized(url, function(err, data) {
  if (err) {
    throw err;
  }
  var anonyme = checkAllTrackers(data.trackers);
  if (anonyme === 1) {
    putIsAnonymized();
  } else if (anonyme === 2) {
    putNotUsingGA();
  } else {
    putIsNotAnonymized();
  }
});
