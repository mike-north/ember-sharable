(function() {
  /*globals Ember*/

  // jscs:disable requireObjectDestructuring
  const getOwner = Ember.getOwner;
  // jscs:enable requireObjectDestructuring
  const { inject } = Ember;

  function _addPropertyMetaTagsToHead(dom, tags) {
    for (let i in tags) {
      _addPropertyMetaTagToHead(dom, tags[i]);
    }
  }

  function _clearEmberSharableMetaTags(dom) {
    let headChildren = dom.head.childNodes;
    let toRemove = [];
    for (let i = 0; i < headChildren.length; i++) {
      let node = headChildren.item(i);
      if (node.nodeType === 1 && node.tagName === 'META' && node.getAttribute('ember-sharable') === 'true') {
        toRemove.push(node);
      }
    }
    for (let i = 0; i < toRemove.length; i++) {
      toRemove[i].remove();
    }
  }

  function _addPropertyMetaTagToHead(dom, tag) {
    let m = dom.createElement('meta');
    m.setAttribute('ember-sharable', 'true');
    for (let p in tag) {
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
      let container = getOwner ? getOwner(this) : this.container;
      let renderer = container.lookup('renderer:-dom');
      let dom = Ember.get(renderer, '_dom.document');
      if (dom.head.childNodes.length > 1) { // dirty hack to save some work in Fasboot case
        _clearEmberSharableMetaTags(dom);
      }
      _addPropertyMetaTagsToHead(dom, this.get('sharable._resolvedMetaTags'));
    })
  });

}());
