import { Routes } from '@angular/router';
import { SelectableListDocsComponent } from './selectable-list-docs.component';
import { SelectableListHeaderComponent } from './selectable-list-header/selectable-list-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: SelectableListHeaderComponent,
        children: [
            {
                path: '',
                component: SelectableListDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'selectable-list';
export const API_FILE_KEY = 'selectableList';
