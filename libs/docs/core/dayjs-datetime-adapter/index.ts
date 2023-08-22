import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./dayjs-datetime-adapter-header/dayjs-datetime-adapter-header.component').then(
                (c) => c.DayjsDatetimeAdapterHeaderComponent
            ),
        providers: [currentComponentProvider('dayjs-datetime-adapter'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./dayjs-datetime-adapter-docs.component').then((c) => c.DayjsDatetimeAdapterDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.dayjsDatetimeAdapter } }
        ]
    }
];
