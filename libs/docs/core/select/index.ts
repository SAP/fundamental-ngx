import { Routes } from '@angular/router';
import { moduleDeprecationsProvider } from '@fundamental-ngx/cdk/utils';
import { DeprecatedSelectCSSClasses } from '@fundamental-ngx/core/select';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./select-header/select-header.component').then((c) => c.SelectHeaderComponent),
        providers: [
            moduleDeprecationsProvider(DeprecatedSelectCSSClasses),
            currentComponentProvider('select'),
            ApiDocsService
        ],
        children: [
            {
                path: '',
                loadComponent: () => import('./select-docs.component').then((c) => c.SelectDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.select } }
        ]
    }
];
