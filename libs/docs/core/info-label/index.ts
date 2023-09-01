import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./info-label-header/info-label-header.component').then((c) => c.InfoLabelHeaderComponent),
        providers: [currentComponentProvider('info-label'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./info-label-docs.component').then((c) => c.InfoLabelDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.infoLabel } }
        ]
    }
];
