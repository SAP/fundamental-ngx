import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./focusable-list-header/focusable-list-header.component').then(
                (c) => c.FocusableListHeaderComponent
            ),
        providers: [currentComponentProvider('focusable-list'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./focusable-list-docs.component').then((c) => c.FocusableListDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.focusableList } }
        ]
    }
];
