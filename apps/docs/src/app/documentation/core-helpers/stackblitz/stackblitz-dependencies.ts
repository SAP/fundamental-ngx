import packageInfo from '../../../../../../../package.json';
import packageLockInfo from '../../../../../../../package-lock.json';

export class StackblitzDependencies {
    private static _libDependencies: string[] = ['@fundamental-ngx/platform', '@fundamental-ngx/core'];

    private static _ngDependencies: string[] = [
        '@angular/animations',
        '@angular/cdk',
        '@angular/core',
        '@angular/compiler',
        '@angular/compiler-cli',
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
        'dayjs',
        'moment',
        'tslib',
        'typescript',
        'focus-trap',
        'fast-deep-equal',
        'lodash-es'
    ];

    static getDependencies(): Record<string, any> {
        const _dependencies: Record<string, any> = {};

        this._libDependencies.forEach((libDep) => (_dependencies[libDep] = packageInfo.version));

        [...this._dependencies, ...this._ngDependencies].forEach((dep) => {
            if (packageLockInfo.dependencies && packageLockInfo.dependencies[dep]) {
                _dependencies[dep] = packageLockInfo.dependencies[dep].version;
            } else {
                throw new Error('Dependency ' + dep + ' not found in package-lock.json');
            }
        });

        return _dependencies;
    }
}
