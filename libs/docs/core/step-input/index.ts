import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./step-input-header/step-input-header.component').then((c) => c.StepInputHeaderComponent),
        providers: [currentComponentProvider('step-input'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./step-input-docs.component').then((c) => c.StepInputDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.stepInput } }
        ]
    }
];
