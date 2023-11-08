import { Routes } from '@angular/router';
import { WizardDocsComponent } from './wizard-docs.component';
import { WizardHeaderComponent } from './wizard-header/wizard-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: WizardHeaderComponent,
        children: [
            {
                path: '',
                component: WizardDocsComponent
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
