exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    getPageTimeout: 60000,
    allScriptsTimeout: 500000,

    specs: ['*.spec.js'],

    baseURL: 'http://localhost:3001/',
    framework: 'jasmine',
};
