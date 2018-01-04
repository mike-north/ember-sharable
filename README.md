# Ember-sharable [![Build Status](https://travis-ci.org/levanto-financial/ember-sharable.svg?branch=master)](https://travis-ci.org/levanto-financial/ember-sharable)

[![Greenkeeper badge](https://badges.greenkeeper.io/mike-north/ember-sharable.svg)](https://greenkeeper.io/)

This README outlines the details of collaborating on this Ember addon.

## About

<img src="http://i66.tinypic.com/6z4m74.png" alt="Twitter Card Example" align="right" width=400/>

When links are shared in facebook, twitter, slack, and many other sites, meta tags are used in order to provide a rich representation of the linked content. Read more about this here


* [Twitter Cards Documentation](https://dev.twitter.com/cards/overview)
* [Facebook Opengraph Object Properties Documentation](https://developers.facebook.com/docs/sharing/opengraph/object-properties)


## Installation

You can install this addon using ember-cli
```
ember install ember-sharable
```

## Use

Metadata tags in your app's `<head>` are updated on each `Ember.Router` `didTransition` event. You can control this data at two different levels: application-wide defauts, and per-route configuration.

The properties that you can customize are:

* title
* description
* url (may result in a redirect when users click the shared link -- consult the above platform-specific documentation for further details)
* img
* twitterHandle

### Application-Wide Defaults

You can set application-wide defaults in your `config/environment.js` file, using the `ENV` object.

**config/environment.js**
```js
var ENV = {
  ...
  sharable: {
    defaults: {
      title: 'My App Title',
      description: 'This is an awesome app, and it looks great when you share articles on social media!'
    }
  }
  ...
} 

```

### Route-Specific Customization

You can override these application-wide defaults using the `sharableMeta` object in a given route.

**app/routes/index.js***

```js

export default Ember.Route.extend({
  sharableMeta: {
    title: 'My App - Home'
  }
});


```


## Extending

It's easy to add new metadata tags and new properties to use for populating those tags with data.

Example: I want to add 
```html
<meta name='mascot' content='tomster'/>
````

to the `<head>` of my app, where the mascot can change on a per-route basis. We want to add this to the existing list of typical meta tags for the addon.

**config/environment.js***

```js
import defaultMetaTags from 'ember-sharable/utils/default-meta-tags';

var ENV = {
  ...

  sharable: {
    metaTagDescriptions: defaultMetaTags.concat([
    { namePropertyKey: 'name',
      namePropertyValue: 'mascot',
      valuePropertyKey: 'content',
      valueProperty: 'mascotName' }
    ]),
    defaults: {
      mascotName: 'tomster'
    }
  }
}

```

And then on a particular route we could customize it 

**app/routes/java.js**
```js
export default Ember.Route.extend({
  sharableMeta: {
    mascotName: 'duke'
  }
})
```

## Contributing

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
