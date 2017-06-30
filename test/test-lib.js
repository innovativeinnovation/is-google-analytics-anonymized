/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.
 * See the LICENSE file for more details.
 */

'use strict';

var should = require('chai').should();
var http = require('http');
var server = require('./server.js');

var isGoogleAnalyticsAnonymized = require('../src/lib/index.js');

describe('is-google-analytics-anonymized module', function() {

  this.timeout(30000);

  before(function() {
    server.listen(8000);
  });

  after(function() {
    server.close();
  });

  it('should return error with HOST null', function(done) {
    isGoogleAnalyticsAnonymized(null, function(err, data) {
      err.should.match(/FAILED/);
      done();
    });
  });

  it('should return error with HOST not found', function(done) {
    var url = 'http://unicorn.epfl.ch/';

    isGoogleAnalyticsAnonymized(url, function(err, data) {
      err.should.match(/FAILED/);
      done();
    });
  });

  it('should return anonymized with uni-ga-anon', function(done) {
    var url = 'http://localhost:8000/test/html/uni-ga-anon.html';

    var expectedResult = '{"trackers":[{"id":"UA-25146349-1","anonymized":' +
      'true}],"hasError":false,"errorMsg":"","url":"http://localhost:8000' +
      '/test/html/uni-ga-anon.html"}';

    isGoogleAnalyticsAnonymized(url, function(error, data) {
      expectedResult = JSON.parse(expectedResult);
      data.should.deep.equal(expectedResult);
      done();
    });
  });

  it('should return not anonymized with uni-ga-no-anon', function(done) {
    var url = 'http://localhost:8000/test/html/uni-ga-no-anon.html';

    var expectedResult = '{"trackers":[{"id":"UA-25146349-1","anonymized":' +
      'false}],"hasError":false,"errorMsg":"","url":"http://localhost:8000' +
      '/test/html/uni-ga-no-anon.html"}';

    isGoogleAnalyticsAnonymized(url, function(error, data) {
      expectedResult = JSON.parse(expectedResult);
      data.should.deep.equal(expectedResult);
      done();
    });
  });

  it('should return anonymized with async-ga-anon', function(done) {
    var url = 'http://localhost:8000/test/html/async-ga-anon.html';

    var expectedResult = '{"trackers":[{"id":"UA-25146349-1","anonymized":' +
      'true}],"hasError":false,"errorMsg":"","url":"http://localhost:8000' +
      '/test/html/async-ga-anon.html"}';

    isGoogleAnalyticsAnonymized(url, function(error, data) {
      expectedResult = JSON.parse(expectedResult);
      data.should.deep.equal(expectedResult);
      done();
    });
  });

  it('should return not anonymized with async-ga-no-anon', function(done) {
    var url = 'http://localhost:8000/test/html/async-ga-no-anon.html';

    var expectedResult = '{"trackers":[{"id":"UA-25146349-1","anonymized":' +
      'false}],"hasError":false,"errorMsg":"","url":"http://localhost:8000' +
      '/test/html/async-ga-no-anon.html"}';

    isGoogleAnalyticsAnonymized(url, function(error, data) {
      expectedResult = JSON.parse(expectedResult);
      data.should.deep.equal(expectedResult);
      done();
    });
  });

});
