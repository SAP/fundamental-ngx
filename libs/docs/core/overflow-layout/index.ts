import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./overflow-layout-header/overflow-layout-header.component').then(
                (c) => c.OverflowLayoutHeaderComponent
            ),
        providers: [currentComponentProvider('overflow-layout'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./overflow-layout-docs.component').then((c) => c.OverflowLayoutDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.overflowLayout } }
        ]
    }
];
