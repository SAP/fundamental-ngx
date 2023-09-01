import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./object-marker-header/object-marker-header.component').then((c) => c.ObjectMarkerHeaderComponent),
        providers: [currentComponentProvider('object-marker'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./object-marker-docs.component').then((c) => c.ObjectMarkerDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.objectMarker } }
        ]
    }
];
