import { Routes } from '@angular/router';
import { SwitchDocsComponent } from './switch-docs.component';
import { SwitchHeaderComponent } from './switch-header/switch-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: SwitchHeaderComponent,
        children: [
            {
                path: '',
                component: SwitchDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'switch';
export const API_FILE_KEY = 'switch';
