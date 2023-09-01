import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./layout-panel-docs-header/layout-panel-docs-header.component').then(
                (c) => c.LayoutPanelDocsHeaderComponent
            ),
        providers: [currentComponentProvider('layout-panel'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./layout-panel-docs.component').then((c) => c.LayoutPanelDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.layoutPanel } }
        ]
    }
];
