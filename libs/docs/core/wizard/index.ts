import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./wizard-header/wizard-header.component').then((c) => c.WizardHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./wizard-docs.component').then((c) => c.WizardDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'wizard';
export const API_FILE_KEY = 'wizard';
export const I18N_KEY = 'coreWizard';
