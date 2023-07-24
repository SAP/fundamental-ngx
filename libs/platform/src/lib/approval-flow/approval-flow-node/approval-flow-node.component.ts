import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
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
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';

import { RtlService } from '@fundamental-ngx/cdk/utils';
import { MenuComponent } from '@fundamental-ngx/core/menu';
import { ObjectStatus } from '@fundamental-ngx/core/object-status';
import { GridListItemComponent } from '@fundamental-ngx/core/grid-list';

import { ApprovalFlowDropZoneDirective } from './approval-flow-drop-zone.directive';
import { ApprovalGraphNode, ApprovalGraphNodeMetadata, ApprovalStatus } from '../interfaces';
import { isNodeApproved, isNodeStarted } from '../helpers';
import { ApprovalFlowNodeTarget } from '../approval-flow-add-node/approval-flow-add-node.component';
import { TranslationResolver } from '@fundamental-ngx/i18n';

const NODE_STATUS_CLASS_MAP = {
    approved: 'positive',
    rejected: 'negative',
    'in progress': 'informative',
    'not started': ''
};

const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

let defaultId = 0;

/**
 * @deprecated
 * ApprovalFlowNode component is deprecated since version 0.40.0
 */
@Component({
    selector: 'fdp-approval-flow-node',
    templateUrl: './approval-flow-node.component.html',
    styleUrls: ['./approval-flow-node.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'fdp-approval-flow-node',
        '[class.fdp-approval-flow-node--first-root]': 'meta?.firstOfMultipleRootNodes',
        '[class.fdp-approval-flow-node--first-final]': 'meta?.firstOfMultipleFinalNodes'
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

    /** A reference to the app custom statuses */
    @Input()
    approvalStatusTemplate: TemplateRef<any>;

    /** Custom status to color mapping  */
    @Input()
    statusColorMapping: Record<ApprovalStatus, ObjectStatus>;

    /** Whether the node is in edit mode */
    @Input()
    @HostBinding('class.fdp-approval-flow-node--edit-mode')
    isEdit: boolean;

    /** Whether the node after is blank */
    @Input()
    @HostBinding('class.fdp-approval-flow-node--next-blank')
    isNextNodeBlank: boolean;

    /** @hidden */
    @HostBinding('class.fdp-approval-flow-node--blank')
    get _blank(): boolean {
        return !!this.node?.blank;
    }

    /** @hidden */
    @HostBinding('class.fdp-approval-flow-node--space')
    get _space(): boolean {
        return !!this.node?.space;
    }

    /** @hidden */
    @HostBinding('class.fdp-approval-flow-node--root')
    get _isRoot(): boolean {
        return this.meta?.isRoot;
    }

    /** @hidden */
    @HostBinding('class.fdp-approval-flow-node--final')
    get _isFinal(): boolean {
        return this.meta?.isFinal;
    }

    /** @hidden */
    @HostBinding('class.fdp-approval-flow-node--line-before')
    get _renderLineBefore(): boolean {
        return !this.node?.blank;
    }

    /** @hidden */
    @HostBinding('class.fdp-approval-flow-node--line-after')
    get _renderLineAfter(): boolean {
        return !this.node?.blank || this._isFinal;
    }

    /** @hidden */
    @HostBinding('class.fdp-approval-flow-node--approved')
    get _isApproved(): boolean {
        return this.node && isNodeApproved(this.node);
    }

    /** @hidden */
    @HostBinding('class.fdp-approval-flow-node--parent-approved')
    get _isParentApproved(): boolean {
        if (!this.meta?.parents?.length) {
            return !!this.meta?.rootNodesApproved;
        }

        return this.meta.parents.every((node) => isNodeApproved(node));
    }

    /** @hidden */
    @HostBinding('class.fdp-approval-flow-node--selected')
    get _isNodeSelected(): boolean {
        return this.isEdit && this._isSelected;
    }

    /** @hidden */
    @HostBinding('class.fdp-approval-flow-node--parallel-start')
    get _isParallelStart(): boolean {
        return Boolean(this.meta?.parallelStart);
    }

    /** @hidden */
    @HostBinding('class.fdp-approval-flow-node--parallel-end')
    get _isParallelEnd(): boolean {
        return Boolean(this.meta?.parallelEnd);
    }

    /** @hidden */
    @HostBinding('class.fdp-approval-flow-node--first-in-parallel')
    get _isFirstInParallel(): boolean {
        return Boolean(this.meta?.isFirstInParallel);
    }

    /** @hidden */
    @HostBinding('class.fdp-approval-flow-node--last-in-parallel')
    get _isLastInParallel(): boolean {
        return Boolean(this.meta?.isLastInParallel);
    }

    /** Whether the node is blank and the final */
    @HostBinding('class.fdp-approval-flow-node--last-blank')
    get _lastBlank(): boolean {
        return this._blank && this.node.targets.length === 0;
    }

    /** @hidden */
    get _isSelected(): boolean {
        return !!this.node.selected;
    }

    /** @hidden */
    _objectStatus: ObjectStatus;

    /** @hidden */
    _showDueDateWarning = false;

    /** @hidden */
    _dueIn = 0;

    /** Event emitted on add node button clicked, value is the placement for the new node */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    onAdd = new EventEmitter<ApprovalFlowNodeTarget>();

    /** Event emitted on edit node button clicked */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    onEdit = new EventEmitter<void>();

    /** Event emitted on delete node button clicked */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    onDelete = new EventEmitter<void>();

    /** @hidden */
    @ViewChild(MenuComponent)
    _menu: MenuComponent;

    /** @hidden */
    @ViewChild('overflowMenuButton')
    _overflowMenuButton: TemplateRef<any>;

    /** @hidden */
    @ViewChild('nodeContent')
    _nodeContent: TemplateRef<any>;

    /** @hidden */
    @ViewChildren(ApprovalFlowDropZoneDirective)
    _dropZones: QueryList<ApprovalFlowDropZoneDirective>;

    /** @hidden */
    @ContentChild(GridListItemComponent)
    _gridListItem: GridListItemComponent<ApprovalGraphNode>;

    /** @hidden */
    readonly approvalFlowNodeId = 'fdp-approval-flow-node-' + defaultId++;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private _translationResolver = new TranslationResolver();

    /** @hidden */
    constructor(
        private readonly _elRef: ElementRef,
        private readonly _cdr: ChangeDetectorRef,
        @Optional() private readonly _rtlService: RtlService
    ) {}

    /** @hidden */
    get _nativeElement(): HTMLElement {
        return this._elRef.nativeElement;
    }

    /** @hidden */
    get _isNotStarted(): boolean {
        return !isNodeStarted(this.node);
    }

    /** @hidden */
    get _isEditActionsAvailable(): boolean {
        return this.node.status === 'approved' || this.node.status === 'rejected';
    }

    /** @hidden */
    get _activeDropZones(): ApprovalFlowDropZoneDirective[] {
        return this._dropZones.filter((z) => z.active);
    }

    /** @hidden */
    get _isAnyDropZoneActive(): boolean {
        return this._activeDropZones.length > 0;
    }

    /** @hidden */
    get _isVerticalLineBeforeSolid(): boolean {
        if (!this.meta?.parents.length) {
            return !!this.meta?.isVerticalLineBeforeSolid;
        }

        return this.meta.parents.every((parentNode) => isNodeApproved(parentNode));
    }

    /** @hidden */
    get _isVerticalLineAfterSolid(): boolean {
        if (!this.node?.targets.length) {
            return !!this.meta?.isVerticalLineAfterSolid;
        }

        return this._isVerticalLineBeforeSolid && this.allNodesInColumnApproved;
    }

    /** @hidden */
    get _showAddButton(): boolean {
        return this.isEdit && !this._blank && !this._space && !this.node?.disableActions;
    }

    /** @hidden */
    get _showAfterAllAddButton(): boolean {
        return this.isEdit && !this._space && !this.node?.disableActions;
    }

    /** @hidden */
    _dropZonePartial(placement: ApprovalFlowNodeTarget): boolean {
        return (
            (!this._blank && (!this.isNextNodeBlank || placement === 'before')) ||
            (this._lastBlank && placement === 'after-all')
        );
    }

    /** @hidden */
    ngOnInit(): void {
        this._checkNodeStatus();

        this._subscriptions.add(this._rtlService?.rtl.subscribe(() => this._cdr.markForCheck()));
    }

    /** @hidden */
    ngOnChanges(): void {
        this._checkNodeStatus();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    _onMenuOpen(): void {
        this._menu.refreshPosition();
    }

    /** @hidden */
    _focus(options?: FocusOptions): void {
        this._gridListItem?.focus(options);
    }

    /** @hidden */
    _deactivateDropZones(): void {
        this._dropZones.forEach((dropZone) => (dropZone.active = false));
        this._cdr.detectChanges();
    }

    /** @hidden */
    _checkIfNodeDraggedInDropZone(nodeRect: DOMRect): void {
        this._dropZones.forEach((dropZone) => dropZone._checkIfNodeDraggedInDropZone(nodeRect));
        this._cdr.detectChanges();
    }

    /** @hidden */
    private _checkNodeStatus(): void {
        if (!this.node) {
            return;
        }

        if (this.checkDueDate && this.node.dueDate) {
            const dueThreshold = Number(new Date(this.node.dueDate)) - this.dueDateThreshold * DAY_IN_MILLISECONDS;
            const nowAndDueDiff = Date.now() - dueThreshold;

            this._dueIn = Math.round(nowAndDueDiff / DAY_IN_MILLISECONDS);
            this._showDueDateWarning = !isNodeApproved(this.node) && dueThreshold < Date.now();
            this._objectStatus = this._showDueDateWarning ? 'critical' : this._getNodeStatusClass();

            this._cdr.detectChanges();

            return;
        }

        this._objectStatus = this._getNodeStatusClass();
        this._cdr.detectChanges();
    }

    /** @hidden */
    private _getNodeStatusClass(): ObjectStatus {
        return (
            this.statusColorMapping
                ? this.statusColorMapping[this.node.status]
                : NODE_STATUS_CLASS_MAP[this.node.status]
        ) as ObjectStatus;
    }
}
