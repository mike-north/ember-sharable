/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-sharable',
  isDevelopingAddon: function() {
    return true;
  },
  included: function() {
    console.log(arguments);
    this.import('vendor/ember-sharable/router-patch.js');
    this.import('vendor/ember-sharable/route-patch.js');
  }
};
