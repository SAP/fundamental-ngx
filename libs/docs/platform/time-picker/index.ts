import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-time-picker-header/platform-time-picker-header.component').then(
                (c) => c.PlatformTimePickerHeaderComponent
            ),
        providers: [currentComponentProvider('time-picker'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-time-picker-docs.component').then((c) => c.PlatformTimePickerDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.timePicker } }
        ]
    }
];
