import { Routes } from '@angular/router';
import { SidePanelDocsComponent } from './side-panel-docs.component';
import { SidePanelHeaderComponent } from './side-panel-header/side-panel-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: SidePanelHeaderComponent,
        children: [
            {
                path: '',
                component: SidePanelDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'side-panel';
export const API_FILE_KEY = 'sidePanel';
