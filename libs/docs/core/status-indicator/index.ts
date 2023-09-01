import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./status-indicator-header/status-indicator-header.component').then(
                (c) => c.StatusIndicatorHeaderComponent
            ),
        providers: [currentComponentProvider('status-indicator'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./status-indicator-docs.component').then((c) => c.StatusIndicatorDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.statusIndicator } }
        ]
    }
];
