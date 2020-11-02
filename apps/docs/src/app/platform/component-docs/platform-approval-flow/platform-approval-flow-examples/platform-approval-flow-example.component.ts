import { Component } from '@angular/core';

import { ApprovalFlowExampleDataSource } from './data-source.class';

@Component({
    selector: 'fdp-approval-flow-example',
    template: `<fdp-approval-flow title="Basic Approval Flow Demo" [dataSource]="dataSource"></fdp-approval-flow>`
})
export class PlatformApprovalFlowExampleComponent {
    dataSource = new ApprovalFlowExampleDataSource();
}
