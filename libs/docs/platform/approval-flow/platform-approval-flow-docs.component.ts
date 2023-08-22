import { Component } from '@angular/core';

const approvalFlowSrc = 'platform-approval-flow-example.component.html';
const approvalFlowTsSrc = 'platform-approval-flow-example.component.ts';
const approvalFlowStatusTsSrc = 'platform-approval-flow-custom-status-example.component.ts';
const approvalFlowStatusSrc = 'platform-approval-flow-custom-status-example.component.html';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { PlatformApprovalFlowCustomStatusExampleComponent } from './examples/platform-approval-flow-custom-status-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { PlatformApprovalFlowExampleComponent } from './examples/platform-approval-flow-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

@Component({
    selector: 'app-approval-flow',
    templateUrl: './platform-approval-flow-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        PlatformApprovalFlowExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        DescriptionComponent,
        PlatformApprovalFlowCustomStatusExampleComponent
    ]
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
