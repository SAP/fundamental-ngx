import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnChanges,
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
export class ApprovalFlowNodeComponent implements OnInit, OnChanges {
    @Input() node: ApprovalGraphNode;

    @Input() parent: ApprovalNode;

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
    get _isApproved(): boolean {
        return this.node && isNodeApproved(this.node);
    }

    @HostBinding('class.parent-approved')
    get _isParentApproved(): boolean {
        return this.parent && isNodeApproved(this.parent);
    }

    _objectStatus: ObjectStatus;

    @Output() onNodeClick = new EventEmitter<void>();

    constructor(private elRef: ElementRef, private cd: ChangeDetectorRef) {}

    get nativeElement(): HTMLElement {
        return this.elRef.nativeElement;
    }

    ngOnInit(): void {
        this.checkNodeStatus();
    }

    ngOnChanges(): void {
        this.checkNodeStatus();
    }

    checkNodeStatus(): void {
        if (!this.node) {
            return;
        }

        this._objectStatus = getNodeStatusClass(this.node.status);
        this.cd.detectChanges();
    }

    focus(): void {
        this.nativeElement.focus({ preventScroll: true });
    }

    openDialog(): void {
        this.onNodeClick.emit();
    }

}

function isNodeApproved(node: ApprovalNode): boolean {
    return node.status === 'approved'
}

function getNodeStatusClass(status: ApprovalStatus): ObjectStatus {
    return NODE_STATUS_CLASS_MAP[status] as ObjectStatus;
}
