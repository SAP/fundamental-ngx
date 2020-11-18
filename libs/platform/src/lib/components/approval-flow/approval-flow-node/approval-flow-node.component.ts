import { Component, EventEmitter, HostBinding, Input, OnInit, Output, TemplateRef } from '@angular/core';
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

    @Input() renderArrow = false;

    @HostBinding('class.blank')
    @Input() blank: boolean;

    @HostBinding('class.line-before')
    _renderLineBefore = false;

    @HostBinding('class.line-after')
    _renderLineAfter = true;

    @HostBinding('class.approved-node')
    _isApproved = false;

    @HostBinding('class.parent-approved-node')
    _isParentApproved = false;

    @Output() onNodeClick = new EventEmitter<void>();

    _status: ObjectStatus;

    constructor() {}

    ngOnInit(): void {
        this._status = getNodeStatusClass(this.node.status);
        const hasParent = Boolean(this.node['parent']);
        if (hasParent) {
            this._isParentApproved = this.node['parent'].status === 'approved';
        }
        this._isApproved = this.node.status === 'approved';
        this._renderLineBefore = hasParent;
        // this._renderLineAfter = !this.blank;
    }

    openDialog(): void {
        this.onNodeClick.emit();
    }

}

function getNodeStatusClass(status: ApprovalStatus): ObjectStatus {
    return NODE_STATUS_CLASS_MAP[status] as ObjectStatus;
}
