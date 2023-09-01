import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./infinite-scroll-header/infinite-scroll-header.component').then(
                (c) => c.InfiniteScrollHeaderComponent
            ),
        providers: [currentComponentProvider('infinite-scroll'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./infinite-scroll-docs.component').then((c) => c.InfiniteScrollDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.infiniteScroll } }
        ]
    }
];
