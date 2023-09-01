import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-object-attribute-header/platform-object-attribute-header.component').then(
                (c) => c.PlatformObjectAttributeHeaderComponent
            ),
        providers: [currentComponentProvider('object-attribute'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-object-attribute-docs.component').then(
                        (c) => c.PlatformObjectAttributeDocsComponent
                    )
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.objectAttribute } }
        ]
    }
];
