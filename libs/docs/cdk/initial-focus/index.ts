import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./initial-focus-header/initial-focus-header.component').then((c) => c.InitialFocusHeaderComponent),
        providers: [currentComponentProvider('initial-focus'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./initial-focus-docs.component').then((c) => c.InitialFocusDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.initialFocus } }
        ]
    }
];
