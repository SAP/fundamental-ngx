import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./textarea-header/textarea-header.component').then((c) => c.TextareaHeaderComponent),
        providers: [currentComponentProvider('textarea'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./textarea-docs.component').then((c) => c.TextareaDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.form } }
        ]
    }
];
