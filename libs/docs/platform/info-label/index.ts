import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-info-label-header/platform-info-label-header.component').then(
                (c) => c.PlatformInfoLabelHeaderComponent
            ),
        providers: [currentComponentProvider('info-label'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-info-label-docs.component').then((c) => c.PlatformInfoLabelDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.infoLabel } }
        ]
    }
];
