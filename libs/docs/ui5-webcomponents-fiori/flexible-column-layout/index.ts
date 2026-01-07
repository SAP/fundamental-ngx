import { Routes } from '@angular/router';
import { FlexibleColumnLayoutDocs } from './flexible-column-layout-docs';
import { FlexibleColumnLayoutHeader } from './header/flexible-column-layout-header';

export const ROUTES: Routes = [
    {
        path: '',
        component: FlexibleColumnLayoutHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: FlexibleColumnLayoutDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'flexible-column-layout';
export const API_FILE_KEY = 'flexibleColumnLayout';

export * from './examples/flexible-column-layout-sample';
export * from './flexible-column-layout-docs';
export * from './header/flexible-column-layout-header';
