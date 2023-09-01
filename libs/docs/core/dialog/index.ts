import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./dialog-docs-header/dialog-docs-header.component').then((c) => c.DialogDocsHeaderComponent),
        providers: [currentComponentProvider('dialog'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./dialog-docs.component').then((c) => c.DialogDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.dialog } }
        ]
    }
];
