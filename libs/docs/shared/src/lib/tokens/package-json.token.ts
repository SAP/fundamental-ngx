import { InjectionToken } from '@angular/core';

export const PACKAGE_JSON = new InjectionToken<Record<string, any>>('PackageJson');
export const CORE_PACKAGE_JSON = new InjectionToken<Record<string, any>>('CorePackageJson');
