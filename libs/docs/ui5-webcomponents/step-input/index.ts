import { Routes } from '@angular/router';
import { StepInputHeader } from './header/step-input-header';
import { StepInputDocs } from './step-input-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: StepInputHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: StepInputDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'step-input';
export const API_FILE_KEY = 'stepInput';
