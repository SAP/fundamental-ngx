import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./focusable-item-header/focusable-item-header.component').then(
                (c) => c.FocusableItemHeaderComponent
            ),
        providers: [currentComponentProvider('focusable-item'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./focusable-item-docs.component').then((c) => c.FocusableItemDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.focusableItem } }
        ]
    }
];
