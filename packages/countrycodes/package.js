Package.describe({
  name: 'marvin:countrycodes',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Holds information about the Country and Network',
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
    'underscore'
  ]);

  // Community
  api.use([
    'aldeed:collection2@2.5.0',
    'aldeed:simple-schema@1.4.0',
    'matb33:collection-hooks@0.8.1',
    'marvin:arfcns',
    'marvin:basestations',
    'marvin:status'
  ]);


  // Common
  api.addFiles([
    'countrycodes.js'
  ]);

  api.addFiles("private/mcc-mnc-table.json", 'server', { isAsset: true });

  api.addFiles([
    'seed.js'
  ], 'server')

  api.export("CountryCodes");
});


Package.onTest(function(api) {
  api.use([
    'ecmascript',
    'tinytest'
  ]);

  api.use('marvin:countrycodes')

  api.addFiles([
    'countrycodes-test.js'
  ], 'server');
});
