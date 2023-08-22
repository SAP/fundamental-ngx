import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./busy-indicator-header/busy-indicator-header.component').then(
                (c) => c.BusyIndicatorHeaderComponent
            ),
        providers: [currentComponentProvider('busy-indicator'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./busy-indicator-docs.component').then((c) => c.BusyIndicatorDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.busyIndicator } }
        ]
    }
];
