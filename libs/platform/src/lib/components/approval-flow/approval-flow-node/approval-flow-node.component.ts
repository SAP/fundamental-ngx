import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding, HostListener,
    Input,
    OnChanges,
    OnInit,
    Output
} from '@angular/core';
import { ObjectStatus } from '@fundamental-ngx/core';

import { ApprovalGraphNode } from '../approval-flow.component';
import { ApprovalNode, ApprovalStatus } from '../interfaces';
import { isNodeApproved } from '../helpers';

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
    /** Approval flow graph node */
    @Input() node: ApprovalGraphNode;

    /** A reference to a parent node */
    @Input() parent: ApprovalNode;

    /** Whether node element has arrow on the left side pointing to the node */
    @Input() renderArrow = false;

    /** Whether node element has carousel start marker. Should be set to 'true' for the first node */
    @Input() renderCarouselStartMarker = false;

    /** Whether node element has carousel end marker. Should be set to 'true' for the last node */
    @Input() renderCarouselEndMarker = false;

    /** Whether to display add node button before in Edit mode */
    @Input() canAddNodeBefore = false;

    /** Whether to display add node button after in Edit mode */
    @Input() canAddNodeAfter = false;

    /** Whether node is blank */
    @Input()
    @HostBinding('class.approval-flow-node--blank')
    blank: boolean;

    /** Whether the node is in edit mode */
    @HostBinding('class.approval-flow-node--edit-mode')
    @Input() isEdit: boolean;

    /** Whether node element has connection line before the node element */
    @Input()
    @HostBinding('class.approval-flow-node--line-before')
    renderLineBefore = false;

    /** Whether node element has connection line after the node element */
    @Input()
    @HostBinding('class.approval-flow-node--line-after')
    renderLineAfter = true;

    /** @hidden */
    @HostBinding('class.approval-flow-node--approved')
    get _isApproved(): boolean {
        return this.node && isNodeApproved(this.node);
    }

    /** @hidden */
    @HostBinding('class.approval-flow-node--parent-approved')
    get _isParentApproved(): boolean {
        if (!this.parent) {
            return true;
        }

        return this.parent && isNodeApproved(this.parent);
    }

    /** @hidden */
    @HostBinding('class.approval-flow-node--selected')
    get _isNodeSelected(): boolean {
        return this.isEdit && this._isSelected;
    }

    /** @hidden */
    // make public input?
    _isSelected = false;

    /** @hidden */
    _objectStatus: ObjectStatus;

    @Output() onNodeClick = new EventEmitter<void>();

    @Output() onNodeCheck = new EventEmitter<boolean>();

    @Output() onAdd = new EventEmitter<void>();

    @Output() onDelete = new EventEmitter<void>();

    /** @hidden */
    constructor(private elRef: ElementRef, private cd: ChangeDetectorRef) {}

    /** @hidden */
    get _nativeElement(): HTMLElement {
        return this.elRef.nativeElement;
    }

    /** @hidden */
    ngOnInit(): void {
        this._checkNodeStatus();
    }

    /** @hidden */
    ngOnChanges(): void {
        this._checkNodeStatus();
    }

    /** @hidden */
    _focus(): void {
        this._nativeElement.focus({ preventScroll: true });
    }

    /** @hidden */
    _onCheck(isChecked: boolean): void {
        this.onNodeCheck.emit(isChecked);
    }

    /** @hidden */
    @HostListener('click')
    _onClick(): void {
        if (this.node.blank) {
            return;
        }
        this.onNodeClick.emit();
    }

    /** @hidden */
    private _checkNodeStatus(): void {
        if (!this.node) {
            return;
        }

        this._objectStatus = getNodeStatusClass(this.node.status);
        this.cd.detectChanges();
    }

}

function getNodeStatusClass(status: ApprovalStatus): ObjectStatus {
    return NODE_STATUS_CLASS_MAP[status] as ObjectStatus;
}
