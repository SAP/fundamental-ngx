import { Routes } from '@angular/router';
import { PlatformPanelDocsComponent } from './platform-panel-docs.component';
import { PlatformPanelHeaderComponent } from './platform-panel-header/platform-panel-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformPanelHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformPanelDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'panel';
export const API_FILE_KEY = 'panel';
