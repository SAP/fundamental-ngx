import { Routes } from '@angular/router';
import { ObjectMarkerDocsComponent } from './object-marker-docs.component';
import { ObjectMarkerHeaderComponent } from './object-marker-header/object-marker-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: ObjectMarkerHeaderComponent,
        children: [
            {
                path: '',
                component: ObjectMarkerDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'object-marker';
export const API_FILE_KEY = 'objectMarker';
