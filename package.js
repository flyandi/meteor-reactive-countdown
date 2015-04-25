Package.describe({
  name: 'flyandi:reactive-countdown',
  version: '0.0.1',
  summary: 'A simple reactive countdown timer for Meteor',
  git: 'https://github.com/flyandi/meteor-reactive-countdown.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');
  api.addFiles('ReactiveCountdown.js');
  api.export('ReactiveCountdown')

});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('flyandi:reactivecountdown');
  api.addFiles('ReactiveCountdown.test.js');
});