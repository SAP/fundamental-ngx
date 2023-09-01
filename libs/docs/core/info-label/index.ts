import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

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
