import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./datetime-picker-header/datetime-picker-header.component').then(
                (c) => c.DatetimePickerHeaderComponent
            ),
        providers: [currentComponentProvider('datetime-picker'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./datetime-picker-docs.component').then((c) => c.DatetimePickerDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.datetimePicker } }
        ]
    }
];
