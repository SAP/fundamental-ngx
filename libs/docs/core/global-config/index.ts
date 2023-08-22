import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./global-config-header/global-config-header.component').then((c) => c.GlobalConfigHeaderComponent),
        providers: [currentComponentProvider('global-config'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./global-config-docs.component').then((c) => c.GlobalConfigDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.globalConfig } }
        ]
    }
];
