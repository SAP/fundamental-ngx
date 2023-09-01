import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./object-marker-header/object-marker-header.component').then((c) => c.ObjectMarkerHeaderComponent),
        providers: [currentComponentProvider('object-marker'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-object-marker-docs.component').then((c) => c.PlatformObjectMarkerDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.objectMarker } }
        ]
    }
];
