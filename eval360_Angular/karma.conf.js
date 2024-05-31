module.exports = function (config) {
    config.set({
      basePath: '',
      frameworks: ['mocha', 'chai'],
      plugins: [
        require('karma-mocha'),
        require('karma-chai'),
        require('karma-chrome-launcher'),
        require('karma-webpack'),
        require('karma-sourcemap-loader'),
        require('karma-mocha-reporter')
      ],
      files: [
        { pattern: './src/test.ts', watched: false }
      ],
      preprocessors: {
        './src/test.ts': ['webpack', 'sourcemap']
      },
      webpack: {
        // Configuración de Webpack
        mode: 'development',
        module: {
          rules: [
            {
              test: /\.ts$/,
              use: 'ts-loader',
              exclude: /node_modules/
            }
          ]
        },
        resolve: {
          extensions: ['.ts', '.js']
        }
      },
      reporters: ['mocha'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['Chrome'],
      singleRun: false,
      concurrency: Infinity
    });
  };