Package.describe({
  name: 'marvin:status',
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
    'tracker',
    'underscore'
  ]);

  // Community
  api.use([
    'aldeed:collection2@2.5.0',
    'aldeed:simple-schema@1.4.0',
    'momentjs:moment@2.10.6'
  ])

  api.use([
    'marvin:threats'
  ])

  api.addFiles([
    'status.js',
  ]);

  api.export("Status");
});

Package.onTest(function(api) {
  api.use([
    'ecmascript',
    'tinytest'
  ]);

  api.use([
    'momentjs:moment@2.10.6'
  ])

  api.use([
    'marvin:status',
    'marvin:threats'
  ]);
  
  api.addFiles('status-tests.js');
});
