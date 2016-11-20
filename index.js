/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-sharable',
  included: function() {
    this.import('vendor/ember-sharable/router-patch.js');
    this.import('vendor/ember-sharable/route-patch.js');
  }
};
