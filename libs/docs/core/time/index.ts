import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./time-header/time-header.component').then((c) => c.TimeHeaderComponent),
        providers: [currentComponentProvider('time'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./time-docs.component').then((c) => c.TimeDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.time } }
        ]
    }
];
