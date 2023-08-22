import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-action-bar-header/platform-action-bar-header.component').then(
                (c) => c.PlatformActionBarHeaderComponent
            ),
        providers: [currentComponentProvider('action-bar'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-action-bar-docs.component').then((c) => c.PlatformActionBarDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.actionbar } }
        ]
    }
];
