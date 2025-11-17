import { Routes } from '@angular/router';
import { BusyIndicatorDocs } from './busy-indicator-docs';
import { BusyIndicatorHeader } from './header/busy-indicator-header';

export const ROUTES: Routes = [
    {
        path: '',
        component: BusyIndicatorHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: BusyIndicatorDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'busy-indicator';
export const API_FILE_KEY = 'busyIndicator';
