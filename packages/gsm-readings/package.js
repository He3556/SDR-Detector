Package.describe({
  name: 'marvin:gsm-readings',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Store GSM readings',
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
    'marvin:bts-broadcasts',
    'marvin:status',
    'marvin:detectors'
  ]);

  // Common
  api.addFiles([
    'gsm-readings.js'
  ]);

  api.export("GSMReadings");
});

Package.onTest(function(api) {
  api.use([
    'ecmascript',
    'tinytest',
    'underscore'
  ]);

  api.use([
    'marvin:gsm-readings',
    'marvin:arfcns',
    'marvin:basestations',
    'marvin:bts-broadcasts',
  ]);

  api.addFiles([
    'gsm-readings-tests.js'
  ], 'server');
});
