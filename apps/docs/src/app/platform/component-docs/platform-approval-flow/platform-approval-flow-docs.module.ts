import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FdDatetimeModule, MultiInputModule, RtlService } from '@fundamental-ngx/core';
import { PlatformApprovalFlowModule } from '@fundamental-ngx/platform';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { PlatformApprovalFlowHeaderComponent } from './platform-approval-flow-header/platform-approval-flow-header.component';
import { PlatformApprovalFlowDocsComponent } from './platform-approval-flow-docs.component';
import { PlatformApprovalFlowExampleComponent } from './platform-approval-flow-examples/platform-approval-flow-example.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformApprovalFlowHeaderComponent,
        children: [
            { path: '', component: PlatformApprovalFlowDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.approvalFlow } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformApprovalFlowModule,
        FdDatetimeModule,
        MultiInputModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformApprovalFlowHeaderComponent,
        PlatformApprovalFlowDocsComponent,
        PlatformApprovalFlowExampleComponent
    ],
    providers: [RtlService]
})
export class PlatformApprovalFlowDocsModule {

}
