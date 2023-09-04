import { Routes } from '@angular/router';
import { CURRENT_LIB } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./moment-datetime-adapter-header/moment-datetime-adapter-header.component').then(
                (c) => c.MomentDatetimeAdapterHeaderComponent
            ),
        providers: [
            {
                provide: CURRENT_LIB,
                useValue: 'moment-adapter'
            }
        ],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./moment-datetime-adapter-docs.component').then((c) => c.MomentDatetimeAdapterDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'moment-datetime-adapter';
export const API_FILE_KEY = 'momentDatetimeAdapter';
