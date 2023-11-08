import { Routes } from '@angular/router';
import { InlineHelpDocsComponent } from './inline-help-docs.component';
import { InlineHelpHeaderComponent } from './inline-help-header/inline-help-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: InlineHelpHeaderComponent,
        children: [
            {
                path: '',
                component: InlineHelpDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'inline-help';
export const API_FILE_KEY = 'inlineHelp';
