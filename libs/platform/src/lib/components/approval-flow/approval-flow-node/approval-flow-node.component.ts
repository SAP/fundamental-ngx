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
    Output,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { MenuComponent, ObjectStatus } from '@fundamental-ngx/core';

import { ApprovalFlowDropZoneDirective } from './approval-flow-drop-zone.directive';
import { ApprovalGraphNode, ApprovalGraphNodeMetadata, ApprovalNode, ApprovalStatus } from '../interfaces';
import { isNodeApproved } from '../helpers';

const NODE_STATUS_CLASS_MAP = {
    'approved': 'positive',
    'rejected': 'negative',
    'in progress': 'informative',
    'not started': ''
};

const DAY_IN_MILISECONDS = 1000 * 60 * 60 * 24;

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

    /** Node metadata */
    @Input() meta: ApprovalGraphNodeMetadata;

    /** Whether node element has arrow on the left side pointing to the node */
    @Input() renderArrow = false;

    /** Whether node element has carousel start marker. Should be set to 'true' for the first node */
    @Input() renderCarouselStartMarker = false;

    /** Whether node element has carousel end marker. Should be set to 'true' for the last node */
    @Input() renderCarouselEndMarker = false;

    /** Whether add button should be rendered after node. Should be set to 'true' for the last nodes in parallel/last node */
    @Input() renderAddButtonAfter = false;

    /** Whether to display due date warning in status */
    @Input() checkDueDate = false;

    /** Number of days before due date when status changes to `warning` with text 'Due in X days'.
     *  Not used if 'checkDueDate' equals false */
    @Input() dueDateThreshold = 7;

    /** Whether node is blank */
    @HostBinding('class.approval-flow-node--blank')
    get blank(): boolean {
        return this.node?.blank;
    }

     /** Whether node is spacer */
    @HostBinding('class.approval-flow-node--space')
    get space(): boolean {
        return this.node?.space;
    }

    /** Whether the node is in edit mode */
    @Input()
    @HostBinding('class.approval-flow-node--edit-mode')
    isEdit: boolean;

    /** Whether node element has connection line before the node element */
    @HostBinding('class.approval-flow-node--line-before')
    get renderLineBefore(): boolean {
        return !this.node?.blank;
    }

    /** Whether node element has connection line after the node element */
    @HostBinding('class.approval-flow-node--line-after')
    get renderLineAfter(): boolean {
        return !this.node?.blank;
    }

    /** @hidden */
    @HostBinding('class.approval-flow-node--approved')
    get _isApproved(): boolean {
        return this.node && isNodeApproved(this.node);
    }

    /** @hidden */
    @HostBinding('class.approval-flow-node--parent-approved')
    get _isParentApproved(): boolean {
        if (!this.meta?.parents?.length) {
            return true;
        }

        return this.meta.parents.every(node => isNodeApproved(node));
    }

    /** @hidden */
    @HostBinding('class.approval-flow-node--selected')
    get _isNodeSelected(): boolean {
        return this.isEdit && this._isSelected;
    }

    /** @hidden */
    @HostBinding('class.approval-flow-node--blank-top')
    get _isBlankTopNode(): boolean {
        return Boolean(this.blank && this.meta?.nextHNode);
    }

    /** @hidden */
    @HostBinding('class.approval-flow-node--parallel-start')
    get _isParallelStart(): boolean {
        return Boolean(this.meta?.parallelStart);
    }

    /** @hidden */
    @HostBinding('class.approval-flow-node--in-parallel')
    get _isInParallel(): boolean {
        return Boolean(this.meta?.isParallel);
    }

    /** @hidden */
    @HostBinding('class.approval-flow-node--last-in-parallel')
    get _isLastInParallel(): boolean {
        return Boolean(this.meta?.isLastInParallel);
    }

    /** @hidden */
    _isSelected = false;

    /** @hidden */
    _objectStatus: ObjectStatus;

    /** @hidden */
    _showDueDateWarning = false;

    /** @hidden */
    _dueIn = 0;

    @Output() onNodeClick = new EventEmitter<void>();

    @Output() onNodeCheck = new EventEmitter<boolean>();

    @Output() onAdd = new EventEmitter<string>();

    @Output() onEdit = new EventEmitter<void>();

    @Output() onDelete = new EventEmitter<void>();

    @ViewChild(MenuComponent) menu: MenuComponent;

    @ViewChildren(ApprovalFlowDropZoneDirective) dropZones: QueryList<ApprovalFlowDropZoneDirective>;

    /** @hidden */
    constructor(private elRef: ElementRef, private cd: ChangeDetectorRef) {
    }

    /** @hidden */
    get _nativeElement(): HTMLElement {
        return this.elRef.nativeElement;
    }

    /** @hidden */
    get _isNotStarted(): boolean {
        return this.node.status === 'not started';
    }

    /** @hidden */
    get _isEditActionsAvailable(): boolean {
        return this.node.status === 'approved' || this.node.status === 'rejected';
    }

    /** @hidden */
    get _activeDropZones(): ApprovalFlowDropZoneDirective[] {
        return this.dropZones.filter(z => z.active);
    }

    /** @hidden */
    get _isAnyDropZoneActive(): boolean {
        return this._activeDropZones.length > 0;
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
    _onClick(): void {
        this.onNodeClick.emit();
    }

    /** @hidden */
    _onCheck(isChecked: boolean): void {
        this.onNodeCheck.emit(isChecked);
    }

    /** @hidden */
    _onMenuOpen(): void {
        this.menu.refreshPosition();
    }

    /** @hidden */
    _focus(): void {
        this._nativeElement.focus({ preventScroll: true });
    }

    /** @hidden */
    _deactivateDropZones(): void {
        this.dropZones.forEach(dropZone => dropZone.active = false);
        this.cd.detectChanges();
    }

    /** @hidden */
    _checkIfNodeDraggedInDropZone(nodeRect: DOMRect): void {
        this.dropZones.forEach(dropZone => dropZone._checkIfNodeDraggedInDropZone(nodeRect));
        this.cd.detectChanges();
    }

    /** @hidden */
    private _checkNodeStatus(): void {
        if (!this.node) {
            return;
        }

        if (this.checkDueDate) {
            const dueThreshold = Number(new Date(this.node.dueDate)) - (this.dueDateThreshold * DAY_IN_MILISECONDS);
            const nowAndDueDiff = Date.now() - dueThreshold;
            this._dueIn = Math.round(nowAndDueDiff / DAY_IN_MILISECONDS);
            this._showDueDateWarning = !isNodeApproved(this.node) && dueThreshold < Date.now();
            this._objectStatus = this._showDueDateWarning ? 'critical' : getNodeStatusClass(this.node.status);
            this.cd.detectChanges();
            return;
        }

        this._objectStatus = getNodeStatusClass(this.node.status);
        this.cd.detectChanges();
    }

}

function getNodeStatusClass(status: ApprovalStatus): ObjectStatus {
    return NODE_STATUS_CLASS_MAP[status] as ObjectStatus;
}
