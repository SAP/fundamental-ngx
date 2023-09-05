import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-time-picker-header/platform-time-picker-header.component').then(
                (c) => c.PlatformTimePickerHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-time-picker-docs.component').then((c) => c.PlatformTimePickerDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'time-picker';
export const API_FILE_KEY = 'timePicker';
