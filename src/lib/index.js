/*
 * Original work (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland,
 * VPSI, 2017-2018.
 * Modified work (c) William Belle, 2018-2019.
 * See the LICENSE file for more details.
 */

var phantom = require('phantomjs-prebuilt');
var path = require('path');

module.exports = function (url, callback) {
  var phantomjsOption = '--ignore-ssl-errors=true';
  var execFile = require('child_process').execFile;
  var scriptName = path.join(
    __dirname,
    '/../bin/get-google-analytics-resources.js'
  );

  var execOptions = [phantomjsOption, scriptName, url];

  execFile(phantom.path, execOptions, function (error, stdout) {
    var obj = JSON.parse(stdout);

    // Send error message in callback
    if (error) {
      error = new Error(obj.errorMsg);
      callback(error);
    } else {
      callback(null, obj);
    }
  });
};
