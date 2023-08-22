import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-form-container-header/platform-form-container-header.component').then(
                (c) => c.PlatformFormContainerHeaderComponent
            ),
        providers: [currentComponentProvider('form-container'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-form-container-docs.component').then((c) => c.PlatformFormContainerDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.formContainer } }
        ]
    }
];
