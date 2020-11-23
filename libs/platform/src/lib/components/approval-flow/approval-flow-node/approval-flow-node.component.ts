import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { ObjectStatus } from '@fundamental-ngx/core';

import { ApprovalNode, ApprovalStatus } from '../interfaces';

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

    @Input() renderCarouselStartMarker = false;

    @Input() renderCarouselEndMarker = false;

    @Input()
    @HostBinding('class.blank')
    blank: boolean;

    @Input()
    @HostBinding('class.line-before')
    renderLineBefore = false;

    @Input()
    @HostBinding('class.line-after')
    renderLineAfter = true;

    @HostBinding('class.approved-node')
    _isApproved = false;

    @HostBinding('class.parent-approved-node')
    _isParentApproved = false;

    @Output() onNodeClick = new EventEmitter<void>();

    _status: ObjectStatus;

    ngOnInit(): void {
        this._status = getNodeStatusClass(this.node.status);
        const hasParent = Boolean(this.node['parent']);
        if (hasParent) {
            this._isParentApproved = this.node['parent'].status === 'approved';
        }
        this._isApproved = this.node.status === 'approved';
    }

    openDialog(): void {
        this.onNodeClick.emit();
    }

}

function getNodeStatusClass(status: ApprovalStatus): ObjectStatus {
    return NODE_STATUS_CLASS_MAP[status] as ObjectStatus;
}
