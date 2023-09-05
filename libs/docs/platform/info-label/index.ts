import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-info-label-header/platform-info-label-header.component').then(
                (c) => c.PlatformInfoLabelHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-info-label-docs.component').then((c) => c.PlatformInfoLabelDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'info-label';
export const API_FILE_KEY = 'infoLabel';
