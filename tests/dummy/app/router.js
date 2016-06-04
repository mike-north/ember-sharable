import Ember from 'ember';
import config from './config/environment';

// jscs:disable requireObjectDestructuring
const getOwner = Ember.getOwner;
// jscs:enable requireObjectDestructuring
const { inject } = Ember;

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
});

function _addPropertyMetaTagsToHead(dom, tags) {
  for (let i in tags) {
    _addPropertyMetaTagToHead(dom, tags[i]);
  }
}

function _addPropertyMetaTagToHead(dom, tag) {
  let m = dom.createElement('meta');
  for (let p in tag) {
    m.setAttribute(p, tag[p]);
  }
  dom.head.appendChild(m);
}

Router.reopen({
  sharable: inject.service(),
  updateSharableTags: Ember.on('didTransition', function() {
    let container = getOwner ? getOwner(this) : this.container;
    let renderer = container.lookup('renderer:-dom');
    let dom = Ember.get(renderer, '_dom.document');
    _addPropertyMetaTagsToHead(dom, this.get('sharable._resolvedMetaTags'));
  })
});

export default Router;
