import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./breakpoint-header/breakpoint-header.component').then((c) => c.BreakpointHeaderComponent),
        providers: [currentComponentProvider('breakpoint'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./breakpoint-docs.component').then((c) => c.BreakpointDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.breakpoint } }
        ]
    }
];
