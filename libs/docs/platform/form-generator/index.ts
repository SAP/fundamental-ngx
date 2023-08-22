import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-form-generator-header/platform-form-generator-header.component').then(
                (c) => c.PlatformFormGeneratorHeaderComponent
            ),
        providers: [currentComponentProvider('form-generator'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-form-generator-docs.component').then((c) => c.PlatformFormGeneratorDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.formGenerator } }
        ]
    }
];
