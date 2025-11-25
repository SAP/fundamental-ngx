import { Routes } from '@angular/router';
import { ToggleButtonHeader } from './header/toggle-button-header';
import { ToggleButtonDocs } from './toggle-button-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: ToggleButtonHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: ToggleButtonDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'toggle-button';
export const API_FILE_KEY = 'toggleButton';
