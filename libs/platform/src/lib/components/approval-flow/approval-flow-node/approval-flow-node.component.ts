import { Component, Input, OnInit } from '@angular/core';
import { ApprovalNode } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-approval-flow-node',
    templateUrl: './approval-flow-node.component.html',
    styleUrls: ['./approval-flow-node.component.scss']
})
export class ApprovalFlowNodeComponent implements OnInit {
    @Input() node: ApprovalNode;

    constructor() {
    }

    ngOnInit(): void {
    }

}
