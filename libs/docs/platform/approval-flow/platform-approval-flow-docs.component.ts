import { Component } from '@angular/core';
import { MessageToastModule } from '@fundamental-ngx/core/message-toast';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { PlatformApprovalFlowCustomStatusExampleComponent } from './examples/platform-approval-flow-custom-status-example.component';
import { PlatformApprovalFlowExampleComponent } from './examples/platform-approval-flow-example.component';

const approvalFlowSrc = 'platform-approval-flow-example.component.html';
const approvalFlowTsSrc = 'platform-approval-flow-example.component.ts';
const approvalFlowStatusTsSrc = 'platform-approval-flow-custom-status-example.component.ts';
const approvalFlowStatusSrc = 'platform-approval-flow-custom-status-example.component.html';

@Component({
    selector: 'app-approval-flow',
    templateUrl: './platform-approval-flow-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        PlatformApprovalFlowExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        DescriptionComponent,
        MessageToastModule,
        PlatformApprovalFlowCustomStatusExampleComponent
    ]
})
export class PlatformApprovalFlowDocsComponent {
    basic: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(approvalFlowSrc),
            fileName: 'platform-approval-flow-example',
            name: 'approval-flow-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(approvalFlowTsSrc),
            fileName: 'platform-approval-flow-example',
            component: 'PlatformApprovalFlowExampleComponent',
            name: 'approval-flow-example'
        }
    ];

    status: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(approvalFlowStatusSrc),
            fileName: 'platform-approval-flow-custom-status-example',
            name: 'platform-approval-flow-custom-status-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(approvalFlowStatusTsSrc),
            fileName: 'platform-approval-flow-custom-status-example',
            component: 'PlatformApprovalFlowCustomStatusExampleComponent',
            name: 'platform-approval-flow-custom-status-example'
        }
    ];
}
