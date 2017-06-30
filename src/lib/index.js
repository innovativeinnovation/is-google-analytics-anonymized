/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.
 * See the LICENSE file for more details.
 */

'use strict';

var phantom = require('phantomjs-prebuilt');

module.exports = function(url, callback) {

  var execFile = require('child_process').execFile;
  var scriptName = __dirname + '/../bin/get-google-analytics-resources.js';

  execFile(phantom.path, [scriptName, url], function(error,stdout) {
    var obj = JSON.parse(stdout);

    // Send error message in callback
    if (error) {
      error = new Error(obj.errorMsg);
      callback(error);
    }

    callback(null, obj);
  });

};
