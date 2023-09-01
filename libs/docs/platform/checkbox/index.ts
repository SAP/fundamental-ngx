import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-checkbox-header/platform-checkbox-header.component').then(
                (c) => c.PlatformCheckboxHeaderComponent
            ),
        providers: [currentComponentProvider('checkbox'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-checkbox-docs.component').then((c) => c.PlatformCheckboxDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.checkbox } }
        ]
    }
];
