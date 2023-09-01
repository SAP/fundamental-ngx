import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./object-number-header/object-number-header.component').then((c) => c.ObjectNumberHeaderComponent),
        providers: [currentComponentProvider('object-number'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./object-number-docs.component').then((c) => c.ObjectNumberDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.objectNumber } }
        ]
    }
];
