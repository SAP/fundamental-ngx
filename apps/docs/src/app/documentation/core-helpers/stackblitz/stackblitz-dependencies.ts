import { dependencies, version, devDependencies } from '../../../../../../../package.json';

export class StackblitzDependencies {

    private static _libDependencies: string[] = [
        '@fundamental-ngx/platform',
        '@fundamental-ngx/core'
    ];

    private static _dependencies: string[] = [
        'fundamental-styles',
        'moment',
        '@angular/animations',
        '@angular/cdk',
        'popper.js',
        'tslib'
    ];

    static GetDependencies(): object {

        const allDependencies: object = Object.assign(dependencies, devDependencies);

        const _dependencies: object = {};

        this._libDependencies.forEach(libDep => _dependencies[libDep] = version);

        this._dependencies.forEach(dep => {
            if (allDependencies && allDependencies[dep]) {
                _dependencies[dep] = allDependencies[dep];
            } else {
                throw new Error('Dependency ' + dep + ' not found in package.json');
            }
        });

        return _dependencies;
    }
}
