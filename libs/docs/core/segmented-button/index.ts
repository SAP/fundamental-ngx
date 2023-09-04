import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./segmented-button-header/segmented-button-header.component').then(
                (c) => c.SegmentedButtonHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./segmented-button-docs.component').then((c) => c.SegmentedButtonDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'segmented-button';
export const API_FILE_KEY = 'segmentedButton';
