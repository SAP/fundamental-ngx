import { version } from '../../../../../../../package.json';
import { dependencies } from '../../../../../../../package-lock.json'

export class StackblitzDependencies {

    private static _libDependencies: string[] = [
        '@fundamental-ngx/platform',
        '@fundamental-ngx/core'
    ];

    private static _dependencies: string[] = [
        '@angular/animations',
        '@angular/cdk',
        '@angular/core',
        '@angular/compiler',
        '@angular/common',
        '@angular/forms',
        '@angular/router',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        'core-js',
        'fundamental-styles',
        'moment',
        'popper.js',
        'tslib',
        'typescript'
    ];

    static GetDependencies(): object {

        const _dependencies: object = {};

        this._libDependencies.forEach(libDep => _dependencies[libDep] = version);

        this._dependencies.forEach(dep => {
            if (dependencies && dependencies[dep]) {
                _dependencies[dep] = dependencies[dep].version;
            } else {
                throw new Error('Dependency ' + dep + ' not found in package-lock.json');
            }
        });

        return _dependencies;
    }
}
