import { Routes } from '@angular/router';
import { TimelineHeader } from './header/timeline-header';
import { TimelineDocs } from './timeline-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: TimelineHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: TimelineDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'timeline';
export const API_FILE_KEY = 'timeline';
