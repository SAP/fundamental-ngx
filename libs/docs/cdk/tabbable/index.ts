import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./tabbable-header/tabbable-header.component').then((c) => c.TabbableHeaderComponent),
        providers: [currentComponentProvider('tabbable'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./tabbable-docs.component').then((c) => c.TabbableDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.tabbable } }
        ]
    }
];
