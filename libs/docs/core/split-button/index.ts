import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./split-button-header/split-button-header.component').then((c) => c.SplitButtonHeaderComponent),
        providers: [currentComponentProvider('split-button'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./split-button-docs.component').then((c) => c.SplitButtonDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.splitButton } }
        ]
    }
];
