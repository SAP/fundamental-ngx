import { Routes } from '@angular/router';
import { DynamicPageDocsComponent } from './dynamic-page-docs.component';
import { DynamicPageDocsHeaderComponent } from './dynamic-page-header/dynamic-page-docs-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: DynamicPageDocsHeaderComponent,
        children: [
            {
                path: '',
                component: DynamicPageDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'dynamic-page';
export const API_FILE_KEY = 'dynamicPage';
