import { Routes } from '@angular/router';
import { ClickedDocsComponent } from './clicked-docs.component';
import { ClickedHeaderComponent } from './clicked-header/clicked-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: ClickedHeaderComponent,
        children: [
            {
                path: '',
                component: ClickedDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'clicked';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/cdk/utils';
export const API_FILE_KEY = 'clicked';
