import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./object-marker-header/object-marker-header.component').then((c) => c.ObjectMarkerHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-object-marker-docs.component').then((c) => c.PlatformObjectMarkerDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'object-marker';
export const API_FILE_KEY = 'objectMarker';
