import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | home');

test('visiting /home', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(document.querySelectorAll('meta[name="twitter:card"]').length, 1, 'One twitter:card tag');
    assert.equal(document.querySelectorAll('meta[name="twitter:title"]').length, 1, 'One twitter:title tag');
    assert.equal(
      document.querySelectorAll('meta[name="twitter:title"]')[0].content,
      'Another thing',
      'Correct twitter:title content'
    );
    assert.equal(
      document.querySelectorAll('meta[name="twitter:description"]')[0].content,
      'Rich metadata for sharing pages on Ember.js apps',
      'Correct twitter:description content'
    );
    assert.equal(
      document.querySelectorAll('meta[property="og:url"]')[0].content,
      'https://ember-sharable-demo.herokuapp.com/',
      'Correct og:url content'
    );
    assert.equal(
      document.querySelectorAll('meta[property="og:description"]')[0].content,
      'Rich metadata for sharing pages on Ember.js apps',
      'Correct og:description content'
    );
    assert.equal(
      document.querySelectorAll('meta[property="og:title"]')[0].content,
      'Another thing',
      'Correct og:title content'
    );
    assert.equal(
      document.querySelectorAll('link[rel="image_src"]')[0].href,
      'https://avatars2.githubusercontent.com/u/12159343?v=3&s=200',
      'Correct reddit image content'
    );
  });

  visit('/home');

  andThen(function() {
    assert.equal(currentURL(), '/home');
    assert.equal(document.querySelectorAll('meta[name="twitter:card"]').length, 1, 'One twitter:card tag');
    assert.equal(document.querySelectorAll('meta[name="twitter:title"]').length, 1, 'One twitter:title tag');
    assert.equal(
      document.querySelectorAll('meta[name="twitter:title"]')[0].content,
      'Home Route',
      'Correct twitter:title content'
    );
  });
});
