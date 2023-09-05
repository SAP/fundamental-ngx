import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./dayjs-datetime-adapter-header/dayjs-datetime-adapter-header.component').then(
                (c) => c.DayjsDatetimeAdapterHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./dayjs-datetime-adapter-docs.component').then((c) => c.DayjsDatetimeAdapterDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'dayjs-datetime-adapter';
export const API_FILE_KEY = 'dayjsDatetimeAdapter';
