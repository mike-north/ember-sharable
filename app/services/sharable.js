import { computed, get } from '@ember/object';
import Service from '@ember/service';
import config from '../config/environment';
import defaultMetaTags from 'ember-sharable/utils/default-meta-tags';
import defaultLinkTags from 'ember-sharable/utils/default-link-tags';

const DEFAULT_CONFIG = {
  props: ['description', 'title', 'image', 'url', 'twitterHandle'],
  current: {},
  metaTagDescriptions: defaultMetaTags,
  linkTagDescriptions: defaultLinkTags,
  defaults: {
    ogType: 'website'
  }
};

function getProp(propName) {
  let currentPropKey = `current.${propName}`;
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
  return get(cfg, `sharable.${key}`) || get(DEFAULT_CONFIG, key);
}

function getDefaultProp(propName) {
  return getConfigItem(`defaults.${propName}`) || null;
}

const PROPS = getConfigItem('props');

const serviceCfg = {
  _metaTagDescriptions: getConfigItem('metaTagDescriptions'),
  _linkTagDescriptions: getConfigItem('linkTagDescriptions'),
  _resolvedMetaTags: computed('_metaTagDescriptions.[]', `current.${PROPS.join(',')}`, function() {
    return this.get('_metaTagDescriptions')
      .map(desc => {
        let o = {};
        o[desc.namePropertyKey] = desc.namePropertyValue;
        let v = typeof desc.value === 'undefined' ? this.get(`_resolved${desc.valueProperty}`) : desc.value;
        if (typeof v === 'undefined' || v === null) {
          return null;
        } else {
          o[desc.valuePropertyKey] = v;
          return o;
        }
      })
      .reduce((r, x) => {
        if (x) {
          r.push(x);
        }
        return r;
      }, []);
  }),
  _resolvedLinkTags: computed('_linkTagDescriptions.[]', `current.${PROPS.join(',')}`, function() {
    return this.get('_linkTagDescriptions')
      .map(desc => {
        let o = {};
        o[desc.namePropertyKey] = desc.namePropertyValue;
        let v = typeof desc.value === 'undefined' ? this.get(`_resolved${desc.valueProperty}`) : desc.value;
        if (typeof v === 'undefined' || v === null) {
          return null;
        } else {
          o[desc.valuePropertyKey] = v;
          return o;
        }
      })
      .reduce((r, x) => {
        if (x) {
          r.push(x);
        }
        return r;
      }, []);
  })
};

for (let i = 0; i < PROPS.length; i++) {
  let p = PROPS[i];
  serviceCfg[`default${p}`] = getDefaultProp(p);
  serviceCfg[`_resolved${p}`] = getProp(p);
}

export default Service.extend(serviceCfg);
