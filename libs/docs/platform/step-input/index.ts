import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-step-input-header/platform-step-input-header.component').then(
                (c) => c.PlatformStepInputHeaderComponent
            ),
        providers: [currentComponentProvider('step-input'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-step-input-docs.component').then((c) => c.PlatformStepInputDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.stepInput } }
        ]
    }
];
