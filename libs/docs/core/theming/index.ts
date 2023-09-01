import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./theming-header/theming-header.component').then((c) => c.ThemingHeaderComponent),
        providers: [currentComponentProvider('theming'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./theming-docs.component').then((c) => c.ThemingDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.theming } }
        ]
    }
];
