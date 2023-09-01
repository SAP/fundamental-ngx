import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./timeline-header-docs/timeline-header-docs.component').then((c) => c.TimelineHeaderDocsComponent),
        providers: [currentComponentProvider('timeline'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./timeline-docs.component').then((c) => c.TimelineDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.timeline } }
        ]
    }
];
