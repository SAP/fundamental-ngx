import { Routes } from '@angular/router';
import { TreeDocsComponent } from './tree-docs.component';
import { TreeHeaderComponent } from './tree-header/tree-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: TreeHeaderComponent,
        children: [
            {
                path: '',
                component: TreeDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'tree';
export const API_FILE_KEY = 'tree';
export const I18N_KEY = 'coreTree';
