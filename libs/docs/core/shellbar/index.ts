import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./shellbar-docs-header/shellbar-docs-header.component').then((c) => c.ShellbarDocsHeaderComponent),
        providers: [currentComponentProvider('shellbar'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./shellbar-docs.component').then((c) => c.ShellbarDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.shellbar } }
        ]
    }
];
