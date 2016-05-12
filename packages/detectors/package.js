Package.describe({
  name: 'marvin:detectors',
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
    'underscore'
  ]);

  api.use([
      'marvin:arfcns',
      'marvin:status',
      'marvin:threats',
      'marvin:basestations',
  ]);

  api.addFiles([
    'detectors-server.js',
    'detectors/new-channel.js',
    'detectors/signal-strength.js',
    'detectors/changing-basestation.js',
    'detectors/missing-channel.js',
    'detectors/paging.js',
  ], "server");

  api.export("Detectors");
});

Package.onTest(function(api) {
  api.use([
    'ecmascript',
    'tinytest',
    'underscore'
  ]);

  api.use([
    'marvin:detectors',
    'marvin:status',
    'marvin:arfcns',
    'marvin:gsm-readings',
    'marvin:threats',
    'marvin:basestations'
  ]);

  api.addFiles([
    'detectors/changing-basestation-tests.js',
    'detectors/paging-tests.js',
    'detectors/new-channel-tests.js',
    'detectors/missing-channel-tests.js',
    'detectors/signal-strength-tests.js',
  ], 'server');
});
