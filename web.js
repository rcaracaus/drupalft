// web.js
var gzippo = require('gzippo');
var express = require("express");
var path = require('path');
var logfmt = require("logfmt");
var app = require('express')();


// all environments
app.use(express.static(path.join(__dirname, 'build')));


app.configure(function(){
  // static - all our js, css, images, etc go into the assets path
  app.use('assets', express.static('assets'));
  //If we get here then the request for a static file is invalid so we may as well stop here
  app.use('assets', function(req, res, next) {
    res.send(404);
  });

  // This route deals enables HTML5Mode by forwarding missing files to the index.html
  app.all('/*', function(req, res) {
    res.sendfile('build/index.html');
  });
});



/**
 * Start Server
 */
 
 app.listen(5000, function() {
   console.log("Listening on " + 5000);
 });

