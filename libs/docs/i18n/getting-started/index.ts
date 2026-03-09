import { Routes } from '@angular/router';
import { GettingStartedDocsComponent } from './getting-started-docs.component';
import { GettingStartedHeaderComponent } from './getting-started-header/getting-started-header.component';

export const LIBRARY_NAME = 'getting-started';
export const ROUTES: Routes = [
    {
        path: '',
        component: GettingStartedHeaderComponent,
        data: { primary: true },
        children: [
            {
                path: '',
                component: GettingStartedDocsComponent
            }
        ]
    }
];
