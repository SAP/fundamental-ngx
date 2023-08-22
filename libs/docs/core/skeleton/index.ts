import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./skeleton-header/skeleton-header.component').then((c) => c.SkeletonHeaderComponent),
        providers: [currentComponentProvider('skeleton'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./skeleton-docs.component').then((c) => c.SkeletonDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.skeleton } }
        ]
    }
];
