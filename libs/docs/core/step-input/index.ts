import { Routes } from '@angular/router';
import { StepInputDocsComponent } from './step-input-docs.component';
import { StepInputHeaderComponent } from './step-input-header/step-input-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: StepInputHeaderComponent,
        children: [
            {
                path: '',
                component: StepInputDocsComponent
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
