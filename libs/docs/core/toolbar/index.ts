import { Routes } from '@angular/router';
import { moduleDeprecationsProvider } from '@fundamental-ngx/cdk/utils';
import { DeprecatedToolbarSizeDirective } from '@fundamental-ngx/core/toolbar';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./toolbar-header/toolbar-header.component').then((c) => c.ToolbarHeaderComponent),
        providers: [
            moduleDeprecationsProvider(DeprecatedToolbarSizeDirective),
            currentComponentProvider('toolbar'),
            ApiDocsService
        ],
        children: [
            {
                path: '',
                loadComponent: () => import('./toolbar-docs.component').then((c) => c.ToolbarDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.toolbar } }
        ]
    }
];
