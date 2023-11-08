import { Routes } from '@angular/router';
import { ActionSheetDocsComponent } from './action-sheet-docs.component';
import { ActionSheetHeaderComponent } from './action-sheet-header/action-sheet-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: ActionSheetHeaderComponent,
        children: [
            {
                path: '',
                component: ActionSheetDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'action-sheet';
export const API_FILE_KEY = 'actionSheet';
