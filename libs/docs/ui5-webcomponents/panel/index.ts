import { Routes } from '@angular/router';
import { PanelHeader } from './header/panel-header';
import { PanelDocs } from './panel-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: PanelHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: PanelDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'panel';
export const API_FILE_KEY = 'panel';
