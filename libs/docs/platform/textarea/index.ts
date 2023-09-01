import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-textarea-header/platform-textarea-header.component').then(
                (c) => c.PlatformTextareaHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-textarea-docs.component').then((c) => c.PlatformTextareaDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'textarea';
export const API_FILE_KEY = 'textarea';
export const I18N_KEY = 'platformTextarea';
