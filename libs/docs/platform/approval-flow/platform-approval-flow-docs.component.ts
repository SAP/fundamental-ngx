import { Component } from '@angular/core';

const approvalFlowSrc = 'platform-approval-flow-example.component.html';
const approvalFlowTsSrc = 'platform-approval-flow-example.component.ts';
const approvalFlowStatusTsSrc = 'platform-approval-flow-custom-status-example.component.ts';
const approvalFlowStatusSrc = 'platform-approval-flow-custom-status-example.component.html';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-approval-flow',
    templateUrl: './platform-approval-flow-docs.component.html'
})
export class PlatformApprovalFlowDocsComponent {
    basic: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(approvalFlowSrc),
            fileName: 'platform-approval-flow-example',
            name: 'approval-flow-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(approvalFlowTsSrc),
            fileName: 'platform-approval-flow-example',
            component: 'PlatformApprovalFlowExampleComponent',
            name: 'approval-flow-example.component.ts'
        }
    ];

    status: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(approvalFlowStatusSrc),
            fileName: 'platform-approval-flow-custom-status-example.component',
            name: 'platform-approval-flow-custom-status-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(approvalFlowStatusTsSrc),
            fileName: 'platform-approval-flow-custom-status-example',
            component: 'PlatformApprovalFlowCustomStatusExampleComponent',
            name: 'platform-approval-flow-custom-status-example.component.ts'
        }
    ];
}
