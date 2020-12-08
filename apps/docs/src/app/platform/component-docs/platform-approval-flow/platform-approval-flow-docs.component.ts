import { Component } from '@angular/core';

import * as approvalFlowTs from '!raw-loader!./platform-approval-flow-examples/platform-approval-flow-example.component.ts';
import * as approvalFlowDataSource from '!raw-loader!./platform-approval-flow-examples/approval-flow-example-data-source.class.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-approval-flow',
    templateUrl: './platform-approval-flow-docs.component.html'
})
export class PlatformApprovalFlowDocsComponent {
    basic: ExampleFile[] = [
        {
            language: 'typescript',
            code: approvalFlowTs,
            fileName: 'platform-approval-flow-example',
            name: 'approval-flow-example.component.ts'
        },
        {
            language: 'typescript',
            code: approvalFlowDataSource,
            fileName: 'platform-approval-flow-data-source',
            name: 'approval-flow-example-data-source.class.ts'
        }
    ];

}
