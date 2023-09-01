import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-vhd-header/platform-vhd-header.component').then((c) => c.PlatformVhdHeaderComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./platform-vhd.docs.component').then((c) => c.PlatformVhdDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'vhd';
export const API_FILE_KEY = 'valueHelpDialog';
export const I18N_KEY = 'platformVHD';
