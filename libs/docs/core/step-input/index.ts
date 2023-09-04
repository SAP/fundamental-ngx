import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./step-input-header/step-input-header.component').then((c) => c.StepInputHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./step-input-docs.component').then((c) => c.StepInputDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'step-input';
export const API_FILE_KEY = 'stepInput';
export const I18N_KEY = 'coreStepInput';
