import { Routes } from '@angular/router';
import { ObjectMarkerHeaderComponent } from './object-marker-header/object-marker-header.component';
import { PlatformObjectMarkerDocsComponent } from './platform-object-marker-docs.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: ObjectMarkerHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformObjectMarkerDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'object-marker';
export const API_FILE_KEY = 'objectMarker';
