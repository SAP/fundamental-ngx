import { Routes } from '@angular/router';
import { BreakpointDocsComponent } from './breakpoint-docs.component';
import { BreakpointHeaderComponent } from './breakpoint-header/breakpoint-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: BreakpointHeaderComponent,
        children: [
            {
                path: '',
                component: BreakpointDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'breakpoint';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/cdk/utils';
export const API_FILE_KEY = 'breakpoint';
