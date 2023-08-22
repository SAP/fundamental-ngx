import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./panel-docs-header/panel-docs-header.component').then((c) => c.PanelDocsHeaderComponent),
        providers: [currentComponentProvider('panel'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./panel-docs.component').then((c) => c.PanelDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.panel } }
        ]
    }
];
