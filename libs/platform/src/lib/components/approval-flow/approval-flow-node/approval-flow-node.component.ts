import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { MenuComponent, ObjectStatus, RtlService } from '@fundamental-ngx/core';
import { Subscription } from 'rxjs';

import { ApprovalFlowDropZoneDirective } from './approval-flow-drop-zone.directive';
import { ApprovalGraphNode, ApprovalGraphNodeMetadata, ApprovalStatus } from '../interfaces';
import { isNodeApproved } from '../helpers';

const NODE_STATUS_CLASS_MAP = {
    'approved': 'positive',
    'rejected': 'negative',
    'in progress': 'informative',
    'not started': ''
};

const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

@Component({
    selector: 'fdp-approval-flow-node',
    templateUrl: './approval-flow-node.component.html',
    styleUrls: ['./approval-flow-node.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fdp-approval-flow-node'
    }
})
export class ApprovalFlowNodeComponent implements OnInit, OnChanges, OnDestroy {
    /** Approval flow graph node */
    @Input() node: ApprovalGraphNode;

    /** Node metadata */
    @Input() meta: ApprovalGraphNodeMetadata;

    /** Whether node element has arrow on the left side pointing to the node */
    @Input() renderArrow = false;

    /** Whether to display due date warning in status */
    @Input() checkDueDate = false;

    /** Number of days before due date when status changes to `warning` with text 'Due in X days'.
     *  Not used if 'checkDueDate' equals false */
    @Input() dueDateThreshold = 7;

    /** Whether nodes in column in which current node placed are approved
     *  Used to render appropriate vertical line after (dashed/solid)
     */
    @Input() allNodesInColumnApproved = false;

    /** Whether the node is in edit mode */
    @Input()
    @HostBinding('class.approval-flow-node--edit-mode')
    isEdit: boolean;

    /** Whether the node after is blank */
    @Input()
    @HostBinding('class.approval-flow-node--next-blank')
    isNextNodeBlank: boolean;

    /** @hidden */
    @HostBinding('class.approval-flow-node--blank')
    get _blank(): boolean {
        return this.node?.blank;
    }

    /** @hidden */
    @HostBinding('class.approval-flow-node--space')
    get _space(): boolean {
        return this.node?.space;
    }

    /** @hidden */
    @HostBinding('class.approval-flow-node--root')
    get _isRoot(): boolean {
        return this.meta?.isRoot
    }

    /** @hidden */
    @HostBinding('class.approval-flow-node--final')
    get _isFinal(): boolean {
        return this.meta?.isFinal;
    }

    /** @hidden */
    @HostBinding('class.approval-flow-node--line-before')
    get _renderLineBefore(): boolean {
        return !this.node?.blank;
    }

    /** @hidden */
    @HostBinding('class.approval-flow-node--line-after')
    get _renderLineAfter(): boolean {
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
            return this.node && isNodeApproved(this.node);
        }

        return this.meta.parents.every(node => isNodeApproved(node));
    }

    /** @hidden */
    @HostBinding('class.approval-flow-node--selected')
    get _isNodeSelected(): boolean {
        return this.isEdit && this._isSelected;
    }

    /** @hidden */
    @HostBinding('class.approval-flow-node--parallel-start')
    get _isParallelStart(): boolean {
        return Boolean(this.meta?.parallelStart);
    }

    /** @hidden */
    @HostBinding('class.approval-flow-node--parallel-end')
    get _isParallelEnd(): boolean {
        return Boolean(this.meta?.parallelEnd);
    }

    /** @hidden */
    @HostBinding('class.approval-flow-node--first-in-parallel')
    get _isFirstInParallel(): boolean {
        return Boolean(this.meta?.isFirstInParallel);
    }

    /** @hidden */
    @HostBinding('class.approval-flow-node--last-in-parallel')
    get _isLastInParallel(): boolean {
        return Boolean(this.meta?.isLastInParallel);
    }

    /** @hidden */
    @HostBinding('attr.dir')
    _dir: string;

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

    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(
        private elRef: ElementRef,
        private _cdr: ChangeDetectorRef,
        @Optional() private _rtlService: RtlService
    ) {}

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
        return this.node.status === 'approved'
            || this.node.status === 'rejected';
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
    get _isVerticalLineBeforeSolid(): boolean {
        if (!this.meta?.parents.length) {
            return this.meta?.isVerticalLineBeforeSolid;
        }

        return this.meta.parents.every(parentNode => isNodeApproved(parentNode));
    }

    /** @hidden */
    get _isVerticalLineAfterSolid(): boolean {
        if (!this.node?.targets.length) {
            return this.meta?.isVerticalLineAfterSolid;
        }

        return this._isVerticalLineBeforeSolid && this.allNodesInColumnApproved;
    }

    /** @hidden */
    get _isRenderAddButtonAfter(): boolean {
        return this.meta?.canAddNodeAfter;
    }

    /** @hidden */
    ngOnInit(): void {
        this._checkNodeStatus();

        this._subscriptions.add(
            this._rtlService?.rtl.subscribe(isRtl => {
                this._dir = isRtl ? 'rtl' : 'ltr';
                this._cdr.detectChanges();
            })
        );
    }

    /** @hidden */
    ngOnChanges(): void {
        this._checkNodeStatus();
    }

    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
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
        this._cdr.detectChanges();
    }

    /** @hidden */
    _checkIfNodeDraggedInDropZone(nodeRect: DOMRect): void {
        this.dropZones.forEach(dropZone => dropZone._checkIfNodeDraggedInDropZone(nodeRect));
        this._cdr.detectChanges();
    }

    /** @hidden */
    private _checkNodeStatus(): void {
        if (!this.node) {
            return;
        }

        if (this.checkDueDate && this.node.dueDate) {
            const dueThreshold = Number(new Date(this.node.dueDate)) - (this.dueDateThreshold * DAY_IN_MILLISECONDS);
            const nowAndDueDiff = Date.now() - dueThreshold;

            this._dueIn = Math.round(nowAndDueDiff / DAY_IN_MILLISECONDS);
            this._showDueDateWarning = !isNodeApproved(this.node) && dueThreshold < Date.now();
            this._objectStatus = this._showDueDateWarning ? 'critical' : getNodeStatusClass(this.node.status);

            this._cdr.detectChanges();

            return;
        }

        this._objectStatus = getNodeStatusClass(this.node.status);
        this._cdr.detectChanges();
    }

}

function getNodeStatusClass(status: ApprovalStatus): ObjectStatus {
    return NODE_STATUS_CLASS_MAP[status] as ObjectStatus;
}
