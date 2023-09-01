import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./scrollbar-header/scrollbar-header.component').then((c) => c.ScrollbarHeaderComponent),
        providers: [currentComponentProvider('scrollbar'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./scrollbar-docs.component').then((c) => c.ScrollbarDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.scrollbar } }
        ]
    }
];
