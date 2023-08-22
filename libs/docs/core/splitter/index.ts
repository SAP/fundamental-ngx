import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./splitter-header/splitter-header.component').then((c) => c.SplitterHeaderComponent),
        providers: [currentComponentProvider('splitter'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./splitter-docs.component').then((c) => c.SplitterDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.splitter } }
        ]
    }
];
