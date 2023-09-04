import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-step-input-header/platform-step-input-header.component').then(
                (c) => c.PlatformStepInputHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-step-input-docs.component').then((c) => c.PlatformStepInputDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'step-input';
export const API_FILE_KEY = 'stepInput';
