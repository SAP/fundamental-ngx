import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-panel-header/platform-panel-header.component').then(
                (c) => c.PlatformPanelHeaderComponent
            ),
        providers: [currentComponentProvider('panel'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./platform-panel-docs.component').then((c) => c.PlatformPanelDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.panel } }
        ]
    }
];
