import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-datetime-picker-header/platform-datetime-picker-header.component').then(
                (c) => c.PlatformDatetimePickerHeaderComponent
            ),
        providers: [currentComponentProvider('datetime-picker'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-datetime-picker-docs.component').then(
                        (c) => c.PlatformDatetimePickerDocsComponent
                    )
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.datetimePicker } }
        ]
    }
];
