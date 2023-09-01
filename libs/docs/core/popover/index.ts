import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./popover-header/popover-header.component').then((c) => c.PopoverHeaderComponent),
        providers: [currentComponentProvider('popover'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./popover-docs.component').then((c) => c.PopoverDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.popover } }
        ]
    }
];
