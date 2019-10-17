module.exports = {
    $schema: './node_modules/@angular/cli/lib/config/schema.json',
    version: 1,
    newProjectRoot: 'projects',
    projects: {
        'my-fd-ngx-dream': {
            projectType: 'application',
            schematics: {
                '@schematics/angular:component': {
                    style: 'scss'
                }
            },
            root: '',
            sourceRoot: 'src',
            prefix: '',
            architect: {
                build: {
                    builder: '@angular-devkit/build-angular:browser',
                    options: {
                        outputPath: 'dist/my-fd-ngx-dream',
                        index: 'src/index.html',
                        main: 'src/main.ts',
                        polyfills: 'src/polyfills.ts',
                        tsConfig: 'tsconfig.app.json',
                        aot: false,
                        assets: ['src/favicon.ico', 'src/assets'],
                        styles: ['src/styles.scss'],
                        scripts: []
                    },
                    configurations: {
                        production: {
                            optimization: true,
                            outputHashing: 'all',
                            sourceMap: false,
                            extractCss: true,
                            namedChunks: false,
                            aot: true,
                            extractLicenses: true,
                            vendorChunk: false,
                            buildOptimizer: true,
                            budgets: [
                                {
                                    type: 'initial',
                                    maximumWarning: '2mb',
                                    maximumError: '5mb'
                                }
                            ]
                        }
                    }
                },
                serve: {
                    builder: '@angular-devkit/build-angular:dev-server',
                    options: {
                        browserTarget: 'my-fd-ngx-dream:build'
                    },
                    configurations: {
                        production: {
                            browserTarget: 'my-fd-ngx-dream:build:production'
                        }
                    }
                },
                'extract-i18n': {
                    builder: '@angular-devkit/build-angular:extract-i18n',
                    options: {
                        browserTarget: 'my-fd-ngx-dream:build'
                    }
                },
                test: {
                    builder: '@angular-devkit/build-angular:karma',
                    options: {
                        main: 'src/test.ts',
                        polyfills: 'src/polyfills.ts',
                        tsConfig: 'tsconfig.spec.json',
                        karmaConfig: 'karma.conf.js',
                        assets: ['src/favicon.ico', 'src/assets'],
                        styles: ['src/styles.scss'],
                        scripts: []
                    }
                },
                lint: {
                    builder: '@angular-devkit/build-angular:tslint',
                    options: {
                        tsConfig: ['tsconfig.app.json', 'tsconfig.spec.json', 'e2e/tsconfig.json'],
                        exclude: ['**/node_modules/**']
                    }
                },
                e2e: {
                    builder: '@angular-devkit/build-angular:protractor',
                    options: {
                        protractorConfig: 'e2e/protractor.conf.js',
                        devServerTarget: 'my-fd-ngx-dream:serve'
                    },
                    configurations: {
                        production: {
                            devServerTarget: 'my-fd-ngx-dream:serve:production'
                        }
                    }
                }
            }
        }
    },
    defaultProject: 'my-fd-ngx-dream'
};
