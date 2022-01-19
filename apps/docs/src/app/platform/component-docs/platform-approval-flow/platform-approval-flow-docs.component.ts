import { Component } from '@angular/core';

import approvalFlowSrc from '!./platform-approval-flow-examples/platform-approval-flow-example.component.html?raw';
import approvalFlowTsSrc from '!./platform-approval-flow-examples/platform-approval-flow-example.component.ts?raw';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-approval-flow',
    templateUrl: './platform-approval-flow-docs.component.html'
})
export class PlatformApprovalFlowDocsComponent {
    basic: ExampleFile[] = [
        {
            language: 'html',
            code: approvalFlowSrc,
            fileName: 'platform-approval-flow-example',
            name: 'approval-flow-example.component.html'
        },
        {
            language: 'typescript',
            code: approvalFlowTsSrc,
            fileName: 'platform-approval-flow-example',
            component: 'PlatformApprovalFlowExampleComponent',
            name: 'approval-flow-example.component.ts'
        }
    ];
}
