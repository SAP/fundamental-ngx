import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-feed-input-header/platform-feed-input-header.component').then(
                (c) => c.PlatformFeedInputHeaderComponent
            ),
        providers: [currentComponentProvider('feed-input'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-feed-input-docs.component').then((c) => c.PlatformFeedInputDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.feedInput } }
        ]
    }
];
