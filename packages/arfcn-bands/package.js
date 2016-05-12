Package.describe({
  name: 'marvin:arfcn-bands',
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

  // Core packages
  api.use([
    'ecmascript',
    'mongo',
    'underscore',
  ]);

  // Community
  api.use([
    'aldeed:collection2@2.5.0',
    'aldeed:simple-schema@1.4.0',
    'ecwyne:mathjs@2.4.0',
    'marvin:arfcns'
  ]);

  // Common
  api.addFiles([
    'arfcn-bands.js'
  ]);

  api.export("ARFCNBands");
});

Package.onTest(function(api) {
  api.use([
    'ecmascript',
    'tinytest',
  ]);

  api.use([
    'marvin:arfcn-bands',
    'marvin:arfcns',
  ]);

  api.addFiles([
    'arfcn-bands-tests.js',
  ]);
});
