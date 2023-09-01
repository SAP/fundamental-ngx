import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, CURRENT_LIB, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./moment-datetime-adapter-header/moment-datetime-adapter-header.component').then(
                (c) => c.MomentDatetimeAdapterHeaderComponent
            ),
        providers: [
            { provide: CURRENT_LIB, useValue: 'moment-adapter' },
            currentComponentProvider('moment-datetime-adapter'),
            ApiDocsService
        ],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./moment-datetime-adapter-docs.component').then((c) => c.MomentDatetimeAdapterDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.momentDatetimeAdapter } }
        ]
    }
];
