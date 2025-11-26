import { Routes } from '@angular/router';
import { ToolbarHeader } from './header/toolbar-header';
import { ToolbarDocs } from './toolbar-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: ToolbarHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: ToolbarDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'toolbar';
export const API_FILE_KEY = 'toolbar';
