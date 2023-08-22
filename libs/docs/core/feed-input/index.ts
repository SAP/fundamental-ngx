import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./feed-input-header/feed-input-header.component').then((c) => c.FeedInputHeaderComponent),
        providers: [currentComponentProvider('feed-input'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./feed-input-docs.component').then((c) => c.FeedInputDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.feedInput } }
        ]
    }
];
