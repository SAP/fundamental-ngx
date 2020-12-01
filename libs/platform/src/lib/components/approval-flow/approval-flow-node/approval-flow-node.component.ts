import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { ObjectStatus } from '@fundamental-ngx/core';

import { ApprovalGraphNode } from '../approval-flow.component';
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
    styleUrls: ['./approval-flow-node.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fdp-approval-flow-node'
    }
})
export class ApprovalFlowNodeComponent implements OnInit {
    @Input() node: ApprovalGraphNode;

    @Input() debug = false;

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

    @HostBinding('class.approved')
    _isApproved = false;

    @HostBinding('class.parent-approved')
    _isParentApproved = false;

    _status: ObjectStatus;

    @Output() onNodeClick = new EventEmitter<void>();

    constructor(private elRef: ElementRef) {}

    get nativeElement(): HTMLElement {
        return this.elRef.nativeElement;
    }

    ngOnInit(): void {
        this._status = getNodeStatusClass(this.node.status);
        const hasParent = Boolean(this.node.parent);
        if (hasParent) {
            this._isParentApproved = this.node.parent.status === 'approved';
        }
        this._isApproved = this.node.status === 'approved';
    }

    focus(): void {
        this.nativeElement.focus({ preventScroll: true });
    }

    openDialog(): void {
        this.onNodeClick.emit();
    }

}

function getNodeStatusClass(status: ApprovalStatus): ObjectStatus {
    return NODE_STATUS_CLASS_MAP[status] as ObjectStatus;
}
