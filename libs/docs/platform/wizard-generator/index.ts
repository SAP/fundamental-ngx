import { Routes } from '@angular/router';
import { PlatformWizardGeneratorDocsComponent } from './platform-wizard-generator-docs.component';
import { PlatformWizardGeneratorHeaderComponent } from './platform-wizard-generator-header/platform-wizard-generator-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformWizardGeneratorHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformWizardGeneratorDocsComponent
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
