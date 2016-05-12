Package.describe({
  name: 'marvin:gsm-scanners',
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
    'underscore'
  ]);

  // Community
  api.use([
    'harrison:papa-parse@1.1.1',
    'marvin:arfcns',
    'marvin:gsm-readings',
    'marvin:status',
    'marvin:bts-broadcasts',
    'marvin:arfcn-bands',
  ]);

  // Common
  api.addFiles([
    'gsm-scanners.js'
  ]);

  // Server
  api.addFiles([
    'gsm-scanners-server.js',
    'scanners/test-scanner.js',
    'scanners/p1-rtlsdr-scanner.js',
    'scanners/p2-bts.js',
    'scanners/p1-kal.js'
  ], 'server');

  api.export("GSMScanners");
});

Package.onTest(function(api) {
  api.use([
    'ecmascript',
    'tinytest',
    'underscore'
  ]);

  api.use([
    'marvin:gsm-scanners',
    'marvin:arfcns',
    'marvin:gsm-readings',
    'marvin:arfcn-bands',
  ]);

  api.addFiles([
    'gsm-scanners-tests.js',
    'scanners/p2-bts-tests.js',
    'scanners/p1-kal-tests.js',
  ]);

  api.addFiles([
    'scanners/p1-rtlsdr-scanner-tests.js',
  ], 'server')
});
