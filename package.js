Package.describe({
    name: 'perfectsofttunisia:autoform-bs-datetimepicker',
    version: '1.0.7',
    summary: 'Custom bootstrap-datetimepicker input type with timezone support for AutoForm',
    git: 'https://github.com/benbahrikhawla/autoform-bs-datetimepicker',
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.use('templating@1.0.0');
    api.use('blaze@2.0.0');
    api.use('aldeed:autoform@4.0.0 || 5.0.0 || 6.0.0');

    // Ensure momentjs packages load before this one if used
    api.use('momentjs:moment@2.8.4', 'client', {
        weak: true
    });
    api.use('mrt:moment-timezone@0.2.1', 'client', {
        weak: true
    });

    api.addFiles([
        'autoform-datetimepicker.html',
        'autoform-datetimepicker.js',
        'input-type-config.js',
    ], 'client');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('perfectsofttunisia:autoform-bs-datetimepicker');
    api.mainModule('autoform-bs-datetimepicker-tests.js');
});