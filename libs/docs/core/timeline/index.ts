import { Routes } from '@angular/router';
import { TimelineDocsComponent } from './timeline-docs.component';
import { TimelineHeaderDocsComponent } from './timeline-header-docs/timeline-header-docs.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: TimelineHeaderDocsComponent,
        children: [
            {
                path: '',
                component: TimelineDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'timeline';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/timeline';
export const API_FILE_KEY = 'timeline';
