import { Routes } from '@angular/router';
import { TroubleshootingDocsComponent } from './troubleshooting-docs.component';
import { TroubleshootingHeaderComponent } from './troubleshooting-header/troubleshooting-header.component';

export const LIBRARY_NAME = 'troubleshooting';
export const ROUTES: Routes = [
    {
        path: '',
        component: TroubleshootingHeaderComponent,
        data: { primary: true },
        children: [
            {
                path: '',
                component: TroubleshootingDocsComponent
            }
        ]
    }
];
