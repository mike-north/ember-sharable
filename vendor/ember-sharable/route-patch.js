(function() {

  var routeProps = {
    sharable: Ember.inject.service(),
    sharableMeta: { }
  };

  /*
    Thanks to @kimroen and co, via ember-cli-document-title for a lot of this code!!

    This is here because `_actions` was renamed to `actions` in Ember 2.0.0, but
    we need it to work for versions before that.
    Here, we inspect the `Ember.Route` prototype, iterate over its
    `mergedProperties` to see what is used, and then use that.
   */
  var mergedActionPropertyName = (function() {
    var routeProto = Ember.Route.proto();
    var mergedProps = routeProto.mergedProperties;

    for (var i = 0, l = mergedProps.length; i < l; i++) {
      var property = mergedProps[i];

      if (property === 'actions' || property === '_actions') {
        return property;
      }
    }
  })();

  routeProps[mergedActionPropertyName] = {
    updateSharableMetadata: function() {
      var meta = this.get('sharableMeta');
      for (var m in meta) {
        this.set(`sharable.current.${m}`, meta[m]);
        // this.get('sharable').notifyPropertyChange(`current.${m}`);
      }
    }
  };

  Ember.Route.reopen(routeProps);

}());
