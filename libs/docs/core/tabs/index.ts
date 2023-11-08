import { Routes } from '@angular/router';
import { TabsDocsComponent } from './tabs-docs.component';
import { TabsHeaderComponent } from './tabs-header/tabs-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: TabsHeaderComponent,
        children: [
            {
                path: '',
                component: TabsDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'tabs';
export const API_FILE_KEY = 'tabs';
export const I18N_KEY = 'coreTabs';
