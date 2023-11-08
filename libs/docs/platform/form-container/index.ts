import { Routes } from '@angular/router';
import { PlatformFormContainerDocsComponent } from './platform-form-container-docs.component';
import { PlatformFormContainerHeaderComponent } from './platform-form-container-header/platform-form-container-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformFormContainerHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformFormContainerDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'form-container';
export const API_FILE_KEY = 'formContainer';
