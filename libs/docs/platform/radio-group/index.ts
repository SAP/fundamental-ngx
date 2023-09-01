import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-radio-group-header/platform-radio-group-header.component').then(
                (c) => c.PlatformRadioGroupHeaderComponent
            ),
        providers: [currentComponentProvider('radio-group'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-radio-group-docs.component').then((c) => c.PlatformRadioGroupDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.radioGroup } }
        ]
    }
];
