import { Config, ConfigOptions } from 'karma';
import { ITslintPreprocessorConfig } from 'karma-tslint/lib/tslint.preprocessor';
import { KarmaTypescriptConfig } from 'karma-typescript/src/api/configuration';

export = (config: Config) => {
    config.set({

        basePath: '.',

        frameworks: ['jasmine', 'karma-typescript'],

        files: [
            './node_modules/es6-promise/dist/es6-promise.auto.min.js',
            './modules/**/*.ts',
            './test/**/*.ts'
        ],

        preprocessors: {
            './+(modules|test)/**/*.ts': ['tslint', 'karma-typescript']
        },

        karmaTypescriptConfig: {
            tsconfig: './tsconfig.json',
            reports: {
                'text-summary': null,
                html: {
                    'directory': './coverage/html'
                },
                json: {
                    'directory': './coverage',
                    'subdirectory': '.',
                    'filename': 'coverage.json',
                }
            },

            coverageOptions: {
                threshold: {
                    global: {
                        statements: 85,
                        branches: 85,
                        functions: 85,
                        lines: 85
                    }
                }
            }
        } as KarmaTypescriptConfig,

        tslintPreprocessor: {
            stopOnFailure: true
        } as ITslintPreprocessorConfig,

        reporters: [
            'progress', 'karma-typescript'
        ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        customLaunchers: {
            IE8: {
                base: 'IE',
                browserName: 'IE8',
                'x-ua-compatible': 'IE=EmulateIE9'
            },
            IE9: {
                base: 'IE',
                browserName: 'IE9',
                'x-ua-compatible': 'IE=EmulateIE9'
            },
            IE10: {
                base: 'IE',
                browserName: 'IE10',
                'x-ua-compatible': 'IE=EmulateIE10'
            }
        },
        singleRun: true,
        plugins: [
            'karma-chrome-launcher',
            'karma-edge-launcher',
            'karma-firefox-launcher',
            'karma-ie-launcher',
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-tslint',
            'karma-typescript'
        ]

    } as ConfigOptions);
};
