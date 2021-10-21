import { parseVersion } from './utils/parse-version';
import packageInfo from '../../../../../../../package.json';
import packageLockInfo from '../../../../../../../package-lock.json';

export class StackblitzDependencies {
    private static _libDependencies: string[] = ['@fundamental-ngx/platform', '@fundamental-ngx/core'];

    private static _dependencies: string[] = [
        '@angular/animations',
        '@angular/cdk',
        '@angular/core',
        '@angular/compiler',
        '@angular/common',
        '@angular/forms',
        '@angular/localize',
        '@angular/router',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        '@sap-theming/theming-base-content',
        'core-js',
        'focus-trap',
        'fundamental-styles',
        'moment',
        'tslib',
        'typescript',
        'focus-trap'
    ];

    static GetDependencies(): object {
        const _dependencies: object = {};

        this._libDependencies.forEach((libDep) => (_dependencies[libDep] = parseVersion(packageInfo.version)));

        this._dependencies.forEach((dep) => {
            if (packageLockInfo.dependencies && packageLockInfo.dependencies[dep]) {
                _dependencies[dep] = packageLockInfo.dependencies[dep].version;
            } else {
                throw new Error('Dependency ' + dep + ' not found in package-lock.json');
            }
        });

        return _dependencies;
    }

    static GetAngularJson(): string {
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
}
