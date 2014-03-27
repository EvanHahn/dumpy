var _ = require('underscore');
var crel = require('crel');

var MAX_DEPTH = 3;
var VARIABLES = [
  'location',
  'navigator',
  'document'
];

function makeDL (variable, depth) {

  depth = depth || 0;

  if (depth > MAX_DEPTH)
    return crel('div', '[value too deep]');

  var result = crel('dl');

  var keys = _(variable).keys();
  _(keys).each(function (key) {

    if (key !== 'window') {

      var value = variable[key];
      if (value === variable)
        return;

      var val;
      if (value === null) {
        val = 'null';
      } else if (_(value).isUndefined()) {
        val = 'undefined';
      } else if (_(value).isFunction()) {
        val = value.toString();
      } else if (!_(value.length).isUndefined() && !_(value).isString()) {
        val = makeDL(value, depth + 1);
      } else {
        val = value.toString();
      }

      if (val === '') {
        val = '[empty string]';
      }

      var $dt = crel('dt', key);
      var $dd = crel('dd', val);
      result.appendChild($dt);
      result.appendChild($dd);

    }

  });

  return result;

}

_(VARIABLES).each(function (variable) {
  var $header = crel('h2', variable + ':');
  var $dl = makeDL(window[variable]);
  document.body.appendChild($header);
  document.body.appendChild($dl);
});
