import { Routes } from '@angular/router';
import { MicroProcessFlowDocsComponent } from './micro-process-flow-docs.component';
import { MicroProcessFlowHeaderComponent } from './micro-process-flow-header/micro-process-flow-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: MicroProcessFlowHeaderComponent,
        children: [
            {
                path: '',
                component: MicroProcessFlowDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'micro-process-flow';
export const API_FILE_KEY = 'microProcessFlow';
