import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./focusable-grid-header/focusable-grid-header.component').then(
                (c) => c.FocusableGridHeaderComponent
            ),
        providers: [currentComponentProvider('focusable-grid'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./focusable-grid-docs.component').then((c) => c.FocusableGridDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.focusableGrid } }
        ]
    }
];
