import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./progress-indicator-header/progress-indicator-header.component').then(
                (c) => c.ProgressIndicatorHeaderComponent
            ),
        providers: [currentComponentProvider('progress-indicator'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./progress-indicator-docs.component').then((c) => c.ProgressIndicatorDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.progressIndicator } }
        ]
    }
];
