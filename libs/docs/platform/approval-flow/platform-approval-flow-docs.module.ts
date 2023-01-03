import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { MultiInputModule } from '@fundamental-ngx/core/multi-input';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { PlatformApprovalFlowModule } from '@fundamental-ngx/platform/approval-flow';
import { MessageToastModule } from '@fundamental-ngx/core/message-toast';
import {
    ApiComponent,
    currentComponentProvider,
    getI18nKey,
    I18nDocsComponent,
    SharedDocumentationPageModule
} from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { PlatformApprovalFlowHeaderComponent } from './platform-approval-flow-header/platform-approval-flow-header.component';
import { PlatformApprovalFlowDocsComponent } from './platform-approval-flow-docs.component';
import { PlatformApprovalFlowExampleComponent } from './examples/platform-approval-flow-example.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformApprovalFlowHeaderComponent,
        children: [
            { path: '', component: PlatformApprovalFlowDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.approvalFlow } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('platformApprovalFlow') }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformApprovalFlowModule,
        FdDatetimeModule,
        MultiInputModule,
        MessageToastModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformApprovalFlowHeaderComponent,
        PlatformApprovalFlowDocsComponent,
        PlatformApprovalFlowExampleComponent
    ],
    providers: [RtlService, currentComponentProvider('approval-flow')]
})
export class PlatformApprovalFlowDocsModule {}
