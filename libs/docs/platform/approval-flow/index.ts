import { Routes } from '@angular/router';
import { PlatformApprovalFlowDocsComponent } from './platform-approval-flow-docs.component';
import { PlatformApprovalFlowHeaderComponent } from './platform-approval-flow-header/platform-approval-flow-header.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: PlatformApprovalFlowHeaderComponent,
        children: [
            {
                path: '',
                component: PlatformApprovalFlowDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'approval-flow';
export const API_FILE_KEY = 'approvalFlow';
export const I18N_KEY = 'platformApprovalFlow';
