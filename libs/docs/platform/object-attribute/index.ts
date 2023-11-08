import { Routes } from '@angular/router';
import { PlatformObjectAttributeDocsComponent } from './platform-object-attribute-docs.component';
import { PlatformObjectAttributeHeaderComponent } from './platform-object-attribute-header/platform-object-attribute-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformObjectAttributeHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformObjectAttributeDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'object-attribute';
export const API_FILE_KEY = 'objectAttribute';
