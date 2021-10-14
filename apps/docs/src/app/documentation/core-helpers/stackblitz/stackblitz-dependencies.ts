import { parseVersion } from './utils/parse-version';
import packageInfo from '../../../../../../../package.json';
import packageLockInfo from '../../../../../../../package-lock.json';

export class StackblitzDependencies {
    private static _libDependencies: string[] = ['@fundamental-ngx/platform', '@fundamental-ngx/core'];

    private static _ngDependencies: string[] = [
        '@angular/animations',
        '@angular/cdk',
        '@angular/core',
        '@angular/compiler',
        '@angular/common',
        '@angular/forms',
        '@angular/localize',
        '@angular/router',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic'
    ];

    private static _dependencies: string[] = [
        '@sap-theming/theming-base-content',
        'core-js',
        'focus-trap',
        'fundamental-styles',
        'moment',
        'tslib',
        'typescript',
        'focus-trap'
    ];

    static getDependencies(): object {
        const _dependencies: object = {};

        const libVersion = parseVersion(packageInfo.version);

        this._libDependencies.forEach((libDep) => (_dependencies[libDep] = libVersion));

        this._dependencies.forEach((dep) => {
            if (packageLockInfo.dependencies && packageLockInfo.dependencies[dep]) {
                _dependencies[dep] = parseVersion(packageLockInfo.dependencies[dep].version);
            } else {
                throw new Error('Dependency ' + dep + ' not found in package-lock.json');
            }
        });

        const ngVersion = this.resolveNgVersion(libVersion);
        this._ngDependencies.forEach((dep) => {
            _dependencies[dep] = ngVersion;
        });

        return _dependencies;
    }

    static getAngularJson(): string {
        return `
        {
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "fundamental-ngx-example": {
      "root": "",
      "sourceRoot": "src",
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss"
        }
      },
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "aot": true,
            "outputPath": "dist",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "tsconfig.app.json",
            "assets": [
              "src/assets",
              {
                "glob": "**/css_variables.css",
                "input": "./node_modules/@sap-theming/theming-base-content/content/Base/baseLib/",
                "output": "./assets/theming-base/"
              },
              {
                "glob": "**/*",
                "input": "./node_modules/fundamental-styles/dist/theming/",
                "output": "./assets/fundamental-styles-theming/"
              }
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          },
          "configurations": {
            "production": {
              "fileReplacements": [],
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "namedChunks": false,
              "aot": true,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true,
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "2mb",
                  "maximumError": "5mb"
                }
              ]
            }
          }
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "fundamental-ngx-example:build"
          },
          "configurations": {
            "production": {
              "browserTarget": "fundamental-ngx-example:build:production"
            }
          }
        }
      }
    }
  },
  "defaultProject": "fundamental-ngx-example"
}
        `;
    }

    /**
     * ngx-fundamental introduced breaking change by migrating to Angular 12 in v0.33.0
     * This function contrains an extra logic in order to bring compatibility between Angular and ngx-fundamental,
     *
     * @param parsedLibVersion ngx-fundamental version, that was processed by "parseVersion" function
     * @returns version of Angular packages to be used
     */
    private static resolveNgVersion(parsedLibVersion: string): string {
        const [, minor] = parsedLibVersion.split('.').map((n) => parseInt(n, 10));
        if (minor === 32) {
            return '^11';
        } else {
            return '^12';
        }
    }
}
