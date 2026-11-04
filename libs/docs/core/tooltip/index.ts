import { Routes } from '@angular/router';
import { TooltipDocsComponent } from './tooltip-docs.component';
import { TooltipHeaderComponent } from './tooltip-header/tooltip-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: TooltipHeaderComponent,
        children: [
            {
                path: '',
                component: TooltipDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'tooltip';
export const API_FILE_KEY = 'tooltip';
