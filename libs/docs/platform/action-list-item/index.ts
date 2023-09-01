import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-action-list-item-header/platform-action-list-item-header.component').then(
                (c) => c.PlatformActionListItemHeaderComponent
            ),
        providers: [currentComponentProvider('action-list-item'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-action-list-item-docs.component').then(
                        (c) => c.PlatformActionListItemDocsComponent
                    )
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.actionlistitem } }
        ]
    }
];
