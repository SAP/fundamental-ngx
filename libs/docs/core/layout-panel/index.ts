import { Routes } from '@angular/router';
import { LayoutPanelDocsHeaderComponent } from './layout-panel-docs-header/layout-panel-docs-header.component';
import { LayoutPanelDocsComponent } from './layout-panel-docs.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: LayoutPanelDocsHeaderComponent,
        children: [
            {
                path: '',
                component: LayoutPanelDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'layout-panel';
export const API_FILE_KEY = 'layoutPanel';
