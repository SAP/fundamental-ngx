import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-multi-input-header/platform-multi-input-header.component').then(
                (c) => c.PlatformMultiInputHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-multi-input-docs.component').then((c) => c.PlatformMultiInputDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'multi-input';
export const API_FILE_KEY = 'multiInput';
