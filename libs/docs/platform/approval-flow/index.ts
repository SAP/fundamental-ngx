import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-approval-flow-header/platform-approval-flow-header.component').then(
                (c) => c.PlatformApprovalFlowHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-approval-flow-docs.component').then((c) => c.PlatformApprovalFlowDocsComponent)
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
