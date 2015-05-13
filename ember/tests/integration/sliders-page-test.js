import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import Pretender from 'pretender';

var App, server;

module('Integration - Slider Page', {
  beforeEach: function() {
    App = startApp();
      var sliders = [
        { id: 1, name: 'Bugs Bunny', slide_ids: [1,2] },
        { id: 2, name: 'Wile E. Coyote', slide_ids: [3] },
        { id: 3, name: 'Yosemite Sam', slide_ids: [4,5,6] }
      ];

      var slides = [
        { id: 1, title: "What's up with Docs?", slider_id: 1 },
        { id: 2, title: "Of course, you know, this means war.", slider_id: 1 },
        { id: 3, title: "Getting the most from the Acme categlog.", slider_id: 2 },
        { id: 4, title: "Shaaaad up!", slider_id: 3 },
        { id: 5, title: "Ah hates rabbits.", slider_id: 3 },
        { id: 6, title: "The Great horni-todes", slider_id: 3 }
      ];

      server = new Pretender(function() {
        this.get('/api/sliders', function(request) {
          return [200, {"Content-Type": "application/json"}, JSON.stringify({sliders: sliders, slides: slides})];
        });

        this.get('/api/sliders/:id', function(request) {
          var slider = sliders.find(function(slider) {
            if (slider.id === parseInt(request.params.id, 10)) {
              return slider;
            }
          });

          var sliderSlides = slides.filter(function(slide) {
            if (slide.slider_id === slider.id) {
              return true;
            }
          });

          return [200, {"Content-Type": "application/json"}, JSON.stringify({slider: slider, slides: slides})];
        });
      });

  },
  afterEach: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('Should allow navigation to the slider page from the landing page', function(assert) {
  visit('/').then(function() {
    click('a:contains("Sliders")').then(function() {
      assert.equal(find('h3').text(), 'Sliders');
    });
  });
});

test('Should list all sliders and number of slides', function(assert) {
  visit('/sliders').then(function() {
    assert.equal(find('a:contains("Bugs Bunny (2)")').length, 1);
    assert.equal(find('a:contains("Wile E. Coyote (1)")').length, 1);
    assert.equal(find('a:contains("Yosemite Sam (3)")').length, 1);
  });
});

test('Should be able to navigate to a slider page', function(assert) {
  visit('/sliders').then(function() {
    click('a:contains("Bugs Bunny")').then(function() {
      assert.equal(find('h4').text(), 'Bugs Bunny');
    });
  });
});

test('Should be able visit a slider page', function(assert) {
  visit('/sliders/1').then(function() {
    assert.equal(find('h4').text(), 'Bugs Bunny');
  });
});

test('Should list all slides for a slider', function(assert) {
  visit('/sliders/1').then(function() {
    assert.equal(find('li:contains("What\'s up with Docs?")').length, 1);
    assert.equal(find('li:contains("Of course, you know, this means war.")').length, 1);
  });
});
