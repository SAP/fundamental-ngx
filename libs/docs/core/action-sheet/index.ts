import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./action-sheet-header/action-sheet-header.component').then((c) => c.ActionSheetHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./action-sheet-docs.component').then((c) => c.ActionSheetDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'action-sheet';
export const API_FILE_KEY = 'actionSheet';
