import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-form-container-header/platform-form-container-header.component').then(
                (c) => c.PlatformFormContainerHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-form-container-docs.component').then((c) => c.PlatformFormContainerDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'form-container';
export const API_FILE_KEY = 'formContainer';
