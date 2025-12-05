import { Routes } from '@angular/router';
import { TabContainerHeader } from './header/tab-container-header';
import { TabContainerDocs } from './tab-container-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: TabContainerHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: TabContainerDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'tab-container';
export const API_FILE_KEY = 'tabContainer';
