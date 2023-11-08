import { Routes } from '@angular/router';
import { PlatformFormGeneratorDocsComponent } from './platform-form-generator-docs.component';
import { PlatformFormGeneratorHeaderComponent } from './platform-form-generator-header/platform-form-generator-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformFormGeneratorHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformFormGeneratorDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'form-generator';
export const API_FILE_KEY = 'formGenerator';
