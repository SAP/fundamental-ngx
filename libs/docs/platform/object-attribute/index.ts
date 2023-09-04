import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-object-attribute-header/platform-object-attribute-header.component').then(
                (c) => c.PlatformObjectAttributeHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-object-attribute-docs.component').then(
                        (c) => c.PlatformObjectAttributeDocsComponent
                    )
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'object-attribute';
export const API_FILE_KEY = 'objectAttribute';
