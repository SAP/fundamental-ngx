import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-display-list-item-header/platform-display-list-item-header.component').then(
                (c) => c.PlatformDisplayListItemHeaderComponent
            ),
        providers: [currentComponentProvider('display-list-item'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-display-list-item-docs.component').then(
                        (c) => c.PlatformDisplayListItemDocsComponent
                    )
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.displaylistitem } }
        ]
    }
];
