import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./breadcrumb-header/breadcrumb-header.component').then((c) => c.BreadcrumbHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./breadcrumb-docs.component').then((c) => c.BreadcrumbDocsComponent)
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
