var _ = require('underscore');
var crel = require('crel');
var stringify = require('json-stringify-safe');

var VARIABLES = [
  'navigator'
];

_(VARIABLES).each(function(variable) {

  var $header = crel('h2', variable + ':');
  var $dl = crel('dl');

  _.map(window[variable], function(value, key) {
    if (key !== 'window') {
      var $dt = crel('dt', key);
      var $dd = crel('dd', value.toString());
      $dl.appendChild($dt);
      $dl.appendChild($dd);
    }
  });

  document.body.appendChild($header);
  document.body.appendChild($dl);

});
