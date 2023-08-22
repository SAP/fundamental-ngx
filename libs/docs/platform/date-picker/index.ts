import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-date-picker-header/platform-date-picker-header.component').then(
                (c) => c.PlatformDatePickerHeaderComponent
            ),
        providers: [currentComponentProvider('date-picker'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-date-picker-docs.component').then((c) => c.PlatformDatePickerDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.datePicker } }
        ]
    }
];
