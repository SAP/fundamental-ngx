import { Routes } from '@angular/router';
import { PlatformPageFooterDocsComponent } from './platform-page-footer-docs.component';
import { PlatformPageFooterHeaderComponent } from './platform-page-footer-header/platform-page-footer-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformPageFooterHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformPageFooterDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'page-footer';
export const API_FILE_KEY = 'footer';
