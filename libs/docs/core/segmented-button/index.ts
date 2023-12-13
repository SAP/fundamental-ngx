import { Routes } from '@angular/router';
import { SegmentedButtonDocsComponent } from './segmented-button-docs.component';
import { SegmentedButtonHeaderComponent } from './segmented-button-header/segmented-button-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: SegmentedButtonHeaderComponent,
        children: [
            {
                path: '',
                component: SegmentedButtonDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'segmented-button';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/segmented-button';
export const API_FILE_KEY = 'segmentedButton';
