import { Routes } from '@angular/router';
import { FixedCardLayoutDocsHeaderComponent } from './fixed-card-layout-docs-header/fixed-card-layout-docs-header.component';
import { FixedCardLayoutDocsComponent } from './fixed-card-layout-docs.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: FixedCardLayoutDocsHeaderComponent,
        children: [
            {
                path: '',
                component: FixedCardLayoutDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'fixed-card-layout';
export const API_FILE_KEY = 'fixedCardLayout';
