import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./time-picker-header/time-picker-header.component').then((c) => c.TimePickerHeaderComponent),
        providers: [currentComponentProvider('time-picker'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./time-picker-docs.component').then((c) => c.TimePickerDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.timePicker } }
        ]
    }
];
