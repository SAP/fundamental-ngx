import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./selectable-list-header/selectable-list-header.component').then(
                (c) => c.SelectableListHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./selectable-list-docs.component').then((c) => c.SelectableListDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'selectable-list';
export const API_FILE_KEY = 'selectableList';
