/*globals Ember*/

(function() {
  'use strict';
  // jscs:disable requireObjectDestructuring
  var getOwner = Ember.getOwner;
  // jscs:enable requireObjectDestructuring
  var inject = Ember.inject;

  function _addPropertyMetaTagsToHead(dom, tags) {
    for (var i = 0; i < tags.length; i++) {
      _addPropertyTagToHead(dom, tags[i], 'meta');
    }
  }
  function _addPropertyLinkTagsToHead(dom, tags) {
    for (var i = 0; i < tags.length; i++) {
      _addPropertyTagToHead(dom, tags[i], 'link');
    }
  }

  function _clearEmberSharableMetaTags(dom) {
    var headChildren = dom.head.childNodes;
    var toRemove = [];
    for (var i = 0; i < headChildren.length; i++) {
      var node = headChildren.item(i);
      if (node.nodeType === 1 && (['META', 'LINK'].indexOf(node.tagName) >= 0) && node.getAttribute('ember-sharable') === 'true') {
        toRemove.push(node);
      }
    }
    for (var i = 0; i < toRemove.length; i++) {
      toRemove[i].remove();
    }
  }

  function _addPropertyTagToHead(dom, tag, tagName) {
    var m = dom.createElement(tagName);
    m.setAttribute('ember-sharable', 'true');
    for (var p in tag) {
      m.setAttribute(p, tag[p]);
    }
    dom.head.appendChild(m);
  }

  Ember.Router.reopen({
    sharable: inject.service(),
    updateSharableTags: Ember.on('didTransition', function() {
      this.set('sharable.current', {});
      this.send('updateSharableMetadata');
      // this.get('sharable').notifyPropertyChange('_resolvedMetaTags');
      var container = getOwner ? getOwner(this) : this.container;
      var renderer = container.lookup('renderer:-dom');
      var dom = Ember.get(renderer, '_dom.document');
      if (dom.head.childNodes.length > 1) { // dirty hack to save some work in Fasboot case
        _clearEmberSharableMetaTags(dom);
      }
      _addPropertyMetaTagsToHead(dom, this.get('sharable._resolvedMetaTags'));
      _addPropertyLinkTagsToHead(dom, this.get('sharable._resolvedLinkTags'));
    })
  });

}());
