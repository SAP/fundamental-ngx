import { Routes } from '@angular/router';
import { DynamicSideContentDocs } from './dynamic-side-content-docs';
import { DynamicSideContentHeader } from './header/dynamic-side-content-header';

export const ROUTES: Routes = [
    {
        path: '',
        component: DynamicSideContentHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: DynamicSideContentDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'dynamic-side-content';
export const API_FILE_KEY = 'dynamicSideContent';

export * from './dynamic-side-content-docs';
export * from './examples/dynamic-side-content-sample';
export * from './header/dynamic-side-content-header';
