import { Routes } from '@angular/router';
import { PlatformVhdHeaderComponent } from './platform-vhd-header/platform-vhd-header.component';
import { PlatformVhdDocsComponent } from './platform-vhd.docs.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformVhdHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformVhdDocsComponent
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
