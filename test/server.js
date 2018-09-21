/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017-2018.
 * See the LICENSE file for more details.
 */

'use strict';

var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function (req, res) {
  var uri = url.parse(req.url).pathname;
  var filename = path.join(process.cwd(), uri);

  fs.open(filename, 'r', function (error, fd) {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('404 Not Found\n');
      res.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) {
      filename += '/index.html';
    }

    fs.readFile(filename, 'utf-8', function (err, file) {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write(err + '\n');
        res.end();
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(file, 'utf-8');
      res.end();
    });
  });
});

exports.listen = function () {
  server.listen.apply(server, arguments);
};

exports.close = function (callback) {
  server.close(callback);
};
