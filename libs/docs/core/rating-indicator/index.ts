import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./rating-indicator-docs-header/rating-indicator-docs-header.component').then(
                (c) => c.RatingIndicatorDocsHeaderComponent
            ),
        providers: [currentComponentProvider('rating-indicator'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./rating-indicator-docs.component').then((c) => c.RatingIndicatorDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.ratingIndicator } }
        ]
    }
];
