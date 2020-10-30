import { Component } from '@angular/core';

import * as approvalFlowTs from '!raw-loader!./platform-approval-flow-examples/platform-approval-flow-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-approval-flow',
    templateUrl: './platform-approval-flow-docs.component.html'
})
export class PlatformApprovalFlowDocsComponent {

    approvalFlowTs = approvalFlowTs;
    basic: ExampleFile[] = [
        {
            language: 'ts',
            code: approvalFlowTs,
            fileName: 'platform-approval-flow-example',
        }
    ];

}
