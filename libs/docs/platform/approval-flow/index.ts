import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import {
    ApiComponent,
    ApiDocsService,
    I18nDocsComponent,
    currentComponentProvider,
    getI18nKey
} from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./platform-approval-flow-header/platform-approval-flow-header.component').then(
                (c) => c.PlatformApprovalFlowHeaderComponent
            ),
        providers: [currentComponentProvider('approval-flow'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./platform-approval-flow-docs.component').then((c) => c.PlatformApprovalFlowDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.approvalFlow } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('platformApprovalFlow') }
        ]
    }
];
