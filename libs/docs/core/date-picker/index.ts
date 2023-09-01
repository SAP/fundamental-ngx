import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./date-picker-header/date-picker-header.component').then((c) => c.DatePickerHeaderComponent),
        providers: [currentComponentProvider('date-picker'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./date-picker-docs.component').then((c) => c.DatePickerDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.datePicker } }
        ]
    }
];
