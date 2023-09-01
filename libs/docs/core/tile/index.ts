import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./tile-docs-header/tile-docs-header.component').then((c) => c.TileDocsHeaderComponent),
        providers: [currentComponentProvider('tile'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./tile-docs.component').then((c) => c.TileDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.tile } }
        ]
    }
];
