import { Routes } from '@angular/router';
import { BreadcrumbDocsComponent } from './breadcrumb-docs.component';
import { BreadcrumbHeaderComponent } from './breadcrumb-header/breadcrumb-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: BreadcrumbHeaderComponent,
        children: [
            {
                path: '',
                component: BreadcrumbDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'breadcrumb';
export const API_FILE_KEY = 'breadcrumb';
export const I18N_KEY = 'coreBreadcrumb';
