import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./disabled-header/disabled-header.component').then((c) => c.DisabledHeaderComponent),
        providers: [currentComponentProvider('disabled'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./disabled-docs.component').then((c) => c.DisabledDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.disabled } }
        ]
    }
];
