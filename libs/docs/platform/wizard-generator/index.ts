import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-wizard-generator-header/platform-wizard-generator-header.component').then(
                (c) => c.PlatformWizardGeneratorHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-wizard-generator-docs.component').then(
                        (c) => c.PlatformWizardGeneratorDocsComponent
                    )
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'wizard-generator';
export const API_FILE_KEY = 'wizardGenerator';
export const I18N_KEY = 'platformWizardGenerator';
