import { Routes } from '@angular/router';
import { PlatformThumbnailHeaderComponent } from './platform-thumbnail-header/platform-thumbnail-header.component';
import { PlatformThumbnailDocsComponent } from './platform-thumbnail.docs.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformThumbnailHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformThumbnailDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'thumbnail';
export const API_FILE_KEY = 'thumbnail';
export const I18N_KEY = 'platformThumbnail';
