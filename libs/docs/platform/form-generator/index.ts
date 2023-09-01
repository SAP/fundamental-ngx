import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-form-generator-header/platform-form-generator-header.component').then(
                (c) => c.PlatformFormGeneratorHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-form-generator-docs.component').then((c) => c.PlatformFormGeneratorDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'form-generator';
export const API_FILE_KEY = 'formGenerator';
