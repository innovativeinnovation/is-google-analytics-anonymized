/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.
 * See the LICENSE file for more details.
 */

'use strict';

var should  = require('chai').should();
var version = require('../package').version;

describe('cli is-google-analytics-anonymized', function() {
  this.timeout(15000);
  var cliOption = '-v';
  var response;

  beforeEach(function(done) {
    var execFile = require('child_process').execFile;
    execFile('./src/bin/cli.js', [cliOption], function(error, stdout) {
      if (error) {
        throw error;
      }
      response = stdout;
      done();
    });
  });

  it('should match version with option -v', function() {
    response.should.equal(version + '\n');
    cliOption = 'https://www.epfl.ch';
  });

  it('should match "Google Analytics is anonymized" with ' +
    'https://www.epfl.ch', function() {
    response.should.match(/Google Analytics is anonymized/);
    cliOption = 'https://www.adoreme.com/';
  });

  it('should match "Google Analytics is not anonymized" with ' +
    'https://www.adoreme.com/', function() {
    response.should.match(/Google Analytics is not anonymized/);
    cliOption = 'https://www.apple.com';
  });

  it('should match "Google Analytics is not used" with ' +
    'https://www.apple.com', function() {
    response.should.match(/Google Analytics is not used/);
  });

});
