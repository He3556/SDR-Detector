Package.describe({
  name: 'marvin:basestations',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use([
    'ecmascript',
    'mongo',
  ]);

  // Community
  api.use([
    'aldeed:collection2@2.5.0',
    'aldeed:simple-schema@1.4.0',
    'marvin:arfcns'
  ]);

  api.addFiles('basestations.js');

  api.export("Basestations");
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use([
    'marvin:basestations',
    'marvin:arfcns'
  ]);
  api.addFiles('basestations-tests.js');
});
