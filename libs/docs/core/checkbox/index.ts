import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./checkbox-header/checkbox-header.component').then((c) => c.CheckboxHeaderComponent),
        providers: [currentComponentProvider('checkbox'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./checkbox-docs.component').then((c) => c.CheckboxDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.checkbox } }
        ]
    }
];
