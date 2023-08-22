import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./feed-list-item-header/feed-list-item-header.component').then(
                (c) => c.FeedListItemHeaderComponent
            ),
        providers: [currentComponentProvider('feed-list-item'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./feed-list-item-docs.component').then((c) => c.FeedListItemDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.feedListItem } }
        ]
    }
];
