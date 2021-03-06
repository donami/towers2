module.exports = function (config) {
  config.set({
    // base path used to resolve all patterns
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai-as-promised', 'chai'],

    // list of files/patterns to load in the browser
    files: [
      { pattern: 'spec.bundle.js', watched: false },
      // 'node_modules/angular-cookies/angular-cookies.js',
      'client/app/components/**/*.html',
    ],

    // files to exclude
    exclude: [],

    plugins: [
      require("karma-chai"),
      require("karma-chai-as-promised"),
      require("karma-chrome-launcher"),
      require("karma-mocha"),
      require("karma-mocha-reporter"),
      require("karma-sourcemap-loader"),
      require("karma-webpack"),
      require('karma-ng-html2js-preprocessor'),
      require('karma-coverage')
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'spec.bundle.js': ['webpack', 'sourcemap'],
      // "client/app/components/**/*.html": ["ng-html2js"]
    },

    // ngHtml2JsPreprocessor: {
    //     // If your build process changes the path to your templates,
    //     // use stripPrefix and prependPrefix to adjust it.
    //     stripPrefix: "client/",
    //     // prependPrefix: "client/",
    //
    //     // the name of the Angular module to create
    //     moduleName: "templates"
    // },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.js/, exclude: [/app\/lib/, /node_modules/], loader: 'babel' },
          {
            test: /\.js$/,
            loaders: ['isparta'],
            exclude: /node_modules|\.spec.js$|\.test.js$|\.mock\.js$/ // exclude node_modules and test files
          },
          { test: /\.html/, loader: 'raw' },
          { test: /\.styl$/, loader: 'style!css!stylus' },
          { test: /\.css$/, loader: 'style!css' }
        ]
      }
    },

    webpackServer: {
      noInfo: true // prevent console spamming when running in Karma!
    },

    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],

    coverageReporter: {
      reporters: [
        {type: 'lcov', dir: 'coverage/', subdir: '.'},
        {type: 'json', dir: 'coverage/', subdir: '.'},
        {type: 'text-summary'}
      ]
    },

    // web server port
    port: 9876,

    // enable colors in the output
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // toggle whether to watch files and rerun tests upon incurring changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // if true, Karma runs tests once and exits
    singleRun: false
  });
};
