import { Routes } from '@angular/router';
import { WizardHeader } from './header/wizard-header';
import { WizardDocs } from './wizard-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: WizardHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: WizardDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'wizard';
export const API_FILE_KEY = 'wizard';
