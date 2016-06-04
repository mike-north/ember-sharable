import Ember from 'ember';
import config from '../config/environment';

const { computed, Service, inject } = Ember;

const DEFAULT_CONFIG = {
  props: ['description', 'title', 'image', 'url', 'twitterHandle', 'siteName'],
  metaTagDescriptions: [
    { namePropertyKey: 'name',
      namePropertyValue: 'twitter:card',
      valuePropertyKey: 'content',
      value: 'summary' },
    { namePropertyKey: 'property',
      namePropertyValue: 'og:type',
      valuePropertyKey: 'content',
      value: 'article' },
    { namePropertyKey: 'name',
      namePropertyValue: 'twitter:site',
      valuePropertyKey: 'content',
      valueProperty: 'twitterHandle' },
    { namePropertyKey: 'property',
      namePropertyValue: 'og:url',
      valuePropertyKey: 'content',
      valueProperty: 'url' },
    { namePropertyKey: 'property',
      namePropertyValue: 'og:title',
      valuePropertyKey: 'content',
      valueProperty: 'title' },
    { namePropertyKey: 'property',
      namePropertyValue: 'og:description',
      valuePropertyKey: 'content',
      valueProperty: 'description' },
    { namePropertyKey: 'property',
      namePropertyValue: 'og:site_name',
      valuePropertyKey: 'content',
      valueProperty: 'siteName' },
    { namePropertyKey: 'property',
      namePropertyValue: 'og:image',
      valuePropertyKey: 'content',
      valueProperty: 'image' },
    { namePropertyKey: 'name',
      namePropertyValue: 'twitter:title',
      valuePropertyKey: 'content',
      valueProperty: 'title' },
    { namePropertyKey: 'name',
      namePropertyValue: 'twitter:description',
      valuePropertyKey: 'content',
      valueProperty: 'description' },
    { namePropertyKey: 'name',
      namePropertyValue: 'twitter:image',
      valuePropertyKey: 'content',
      valueProperty: 'image' }
  ]
};

function getProp(propName) {
  let currentPropKey = `current${propName}`;
  let defaultPropKey = `default${propName}`;
  return computed(currentPropKey, defaultPropKey, function() {
    let current = this.get(currentPropKey);
    if (typeof current === 'undefined' || current === null) {
      return this.get(defaultPropKey);
    } else {
      return current;
    }
  });
}

function getConfigItem(key) {
  let cfg = config;
  return Ember.get(cfg, `sharable.${key}`) || Ember.get(DEFAULT_CONFIG, key);
};

function getDefaultProp(propName) {
  return getConfigItem(`defaults.${propName}`) || null;
};

const serviceCfg = {
  _metaTagDescriptions: getConfigItem('metaTagDescriptions'),
  _resolvedMetaTags: computed('_metaTagDescriptions.[]', function() {
    return this.get('_metaTagDescriptions').map((desc) => {
      let o = {};
      o[desc.namePropertyKey] = desc.namePropertyValue;
      let v = typeof desc.value === 'undefined' ? this.get(`_resolved${desc.valueProperty}`) : desc.value;
      if (typeof v === 'undefined' || v === null) {
        return null;
      } else {
        o[desc.valuePropertyKey] = v;
        return o;
      }
    }).reduce((r, x) => {
      if (x) {
        r.push(x);
      }
      return r;
    }, []);
  })
};

const PROPS = getConfigItem('props');

for (let i in PROPS) {
  let p = PROPS[i];
  serviceCfg[`default${p}`] = getDefaultProp(p);
  serviceCfg[`_resolved${p}`] = getProp(p);
}

export default Service.extend(serviceCfg);
