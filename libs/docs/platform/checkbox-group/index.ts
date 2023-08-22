import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-checkbox-group-header/platform-checkbox-group-header.component').then(
                (c) => c.PlatformCheckboxGroupHeaderComponent
            ),
        providers: [currentComponentProvider('checkbox-group'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-checkbox-group-docs.component').then((c) => c.PlatformCheckboxGroupDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.checkboxGroup } }
        ]
    }
];
