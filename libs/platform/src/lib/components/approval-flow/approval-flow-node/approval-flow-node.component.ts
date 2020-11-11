import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ApprovalNode, ApprovalStatus } from '@fundamental-ngx/platform';
import { DialogService, MessageToastService, ObjectStatus } from '@fundamental-ngx/core';

const NODE_STATUS_CLASS_MAP = {
    'approved': 'positive',
    'rejected': 'negative',
    'in progress': 'informative',
    'not started': ''
};

@Component({
    selector: 'fdp-approval-flow-node',
    templateUrl: './approval-flow-node.component.html',
    styleUrls: ['./approval-flow-node.component.scss']
})
export class ApprovalFlowNodeComponent implements OnInit {
    @Input() node: ApprovalNode;

    @Output() onNodeClick = new EventEmitter<void>();

    _status: ObjectStatus;

    constructor() {}

    ngOnInit(): void {
        this._status = getNodeStatusClass(this.node.status);
    }

    openDialog(): void {
        this.onNodeClick.emit();
    }

}

function getNodeStatusClass(status: ApprovalStatus): ObjectStatus {
    return NODE_STATUS_CLASS_MAP[status] as ObjectStatus;
}
