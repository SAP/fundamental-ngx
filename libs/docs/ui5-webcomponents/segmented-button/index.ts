import { Routes } from '@angular/router';
import { SegmentedButtonHeader } from './header/segmented-button-header';
import { SegmentedButtonDocs } from './segmented-button-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: SegmentedButtonHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: SegmentedButtonDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'segmented-button';
export const API_FILE_KEY = 'segmentedButton';
