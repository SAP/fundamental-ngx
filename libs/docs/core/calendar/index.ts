import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./calendar-header/calendar-header.component').then((c) => c.CalendarHeaderComponent),
        providers: [currentComponentProvider('calendar'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./calendar-docs.component').then((c) => c.CalendarDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.calendar } }
        ]
    }
];
