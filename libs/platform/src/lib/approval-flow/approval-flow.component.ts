import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
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
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';

import { KeyUtil, RtlService } from '@fundamental-ngx/core/utils';
import { MessageToastService } from '@fundamental-ngx/core/message-toast';
import { GridListComponent, GridListSelectionEvent } from '@fundamental-ngx/core/grid-list';
import { DialogService } from '@fundamental-ngx/core/dialog';

import { ApprovalFlowApproverDetailsComponent } from './approval-flow-approver-details/approval-flow-approver-details.component';
import { ApprovalFlowNodeComponent } from './approval-flow-node/approval-flow-node.component';
import {
    AddNodeDialogFormData,
    APPROVAL_FLOW_NODE_TYPES,
    ApprovalFlowAddNodeComponent,
    ApprovalFlowNodeTarget
} from './approval-flow-add-node/approval-flow-add-node.component';
import { displayUserFn, getBlankApprovalGraphNode, getGraphNodes, isNodeTargetsIncludeId, trackByFn } from './helpers';
import { ApprovalDataSource, ApprovalGraphNode, ApprovalNode, ApprovalProcess, ApprovalStatus, ApprovalUser } from './interfaces';
import { ApprovalFlowSelectTypeComponent, SelectTypeDialogFormData } from './approval-flow-select-type/approval-flow-select-type.component';
import {
    ApprovalFlowGraph,
    ApprovalGraphMetadata,
    generateApprovalFlowGraph,
    generateApprovalFlowGraphMetadata
} from './approval-flow-graph';
import { ApprovalFlowMessage, ApprovalFlowMessageType } from './approval-flow-messages/approval-flow-messages.component';


@Component({
    selector: 'fdp-approval-flow',
    templateUrl: './approval-flow.component.html',
    styleUrls: ['./approval-flow.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ApprovalFlowComponent implements OnInit, OnDestroy {
    /** Title which is displayed in the header of the Approval Flow component. */
    @Input() title = 'Approval process';

    /** Data source for the Approval Flow component. */
    @Input() dataSource: ApprovalDataSource;

    /** A reference to the user details template */
    @Input() userDetailsTemplate: TemplateRef<any>;

    /** Whether to display due date warning in status */
    @Input() checkDueDate = false;

    /** Number of days before due date when status changes to `warning` with text 'Due in X days'.
     *  Not used if 'checkDueDate' equals false */
    @Input() dueDateThreshold = 7;

    /** A list of approval statuses that allow sending reminders to their approvers */
    @Input() allowSendRemindersForStatuses: ApprovalStatus[] = ['in progress', 'not started'];

    /** Whether the approval flow is editable */
    @Input() isEditAvailable = false;

    /** Text label for watchers list */
    @Input() watchersLabel = 'Watchers';

    /** Event emitted on approval flow node click. */
    @Output() nodeClick = new EventEmitter<ApprovalNode>();

    /** @hidden */
    @ViewChild('graphContainerEl') _graphContainerEl: ElementRef;

    /** @hidden */
    @ViewChild('graphEl') _graphEl: ElementRef;

    /** @hidden */
    @ViewChild('reminderTemplate') _reminderTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild('gridList') _gridList: GridListComponent<ApprovalGraphNode>;

    /** @hidden */
    @ViewChildren(ApprovalFlowNodeComponent) _nodeComponents: QueryList<ApprovalFlowNodeComponent>;

    /** @hidden */
    _approvalProcess: ApprovalProcess;

    /** @hidden */
    _initialApprovalProcess: ApprovalProcess;

    /** @hidden */
    _previousApprovalProcess: ApprovalProcess;

    /** @hidden */
    _graph: ApprovalFlowGraph;

    /** @hidden */
    _isCarousel = false;

    /** @hidden */
    _carouselScrollX = 0;

    /** @hidden */
    _carouselStep = 0;

    /** @hidden */
    _maxCarouselStep = 0;

    /** @hidden */
    _graphMetadata: ApprovalGraphMetadata = {};

    /** @hidden */
    _isEditMode = false;

    /** @hidden */
    _usersForWatchersList: ApprovalUser[] = [];

    /** @hidden */
    _selectedWatchers: ApprovalUser[] = [];

    /** @hidden */
    _messages: ApprovalFlowMessage[] = [];

    /** @hidden */
    _displayUserFn = displayUserFn;

    /** @hidden */
    _trackByFn = trackByFn;

    /** @hidden */
    _emptyApprovalFlowSpotConfig = {
        spot: { url: '', id: 'sapIllus-Spot-NoData' }
    }

    /** @hidden */
    _multipleRootNodes = false;

    /** @hidden */
    _multipleFinalNodes = false;

    /** @hidden */
    _dragDropInProgress = false;

    /** @hidden */
    private _editModeInitSub: Subscription;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(
        private readonly _dialogService: DialogService,
        private readonly _messageToastService: MessageToastService,
        private readonly _cdr: ChangeDetectorRef,
        @Optional() private readonly _rtlService: RtlService
    ) { }

    /** @hidden */
    get _rtl(): boolean {
        return this._rtlService?.rtl.getValue();
    }

    /** @hidden */
    get _selectedNodes(): ApprovalGraphNode[] {
        return getGraphNodes(this._graph).filter(node => node.selected);
    }

    /** @hidden */
    ngOnInit(): void {
        if (!this.dataSource) {
            return;
        }

        this._subscriptions.add(
            this.dataSource.fetch().subscribe(approvalProcess => {
                this._initialApprovalProcess = cloneApprovalProcess(approvalProcess);
                this._buildView(approvalProcess);
            })
        );

        this._listenOnResize();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    _isNextNodeBlank(node: ApprovalGraphNode, columnIndex: number, nodeIndex: number): boolean {
        const nextNode = this._graph.columns[columnIndex + 1]?.nodes[nodeIndex];
        const nextNodeBlank = nextNode?.blank;
        const nextNodeParallelEnd = this._graphMetadata[nextNode?.id]?.parallelEnd;

        return !node.blank
            && nextNodeBlank
            && !nextNodeParallelEnd;
    }

    /** @hidden */
    _isCdkDragDisabled(node: ApprovalGraphNode): boolean {
        return !this._isEditMode || node.blank || node.space || node.status !== 'not started';
    }

    /** @hidden Node click handler */
    _onNodeClick(node: ApprovalNode): void {
        if (this._dragDropInProgress) {
            return;
        }

        const dialog = this._dialogService.open(ApprovalFlowApproverDetailsComponent, {
            data: {
                node: node,
                allowSendReminder: this.allowSendRemindersForStatuses.includes(node.status),
                ...this._defaultDialogOptions
            }
        });

        dialog.afterClosed.subscribe((reminderTargets) => {
            if (Array.isArray(reminderTargets)) {
                this._sendReminders(reminderTargets, node);
            }
        });

        this.nodeClick.emit(node);
    }

    /** @hidden */
    _onNodeSelectionChange(event: GridListSelectionEvent<ApprovalGraphNode>): void {
        this._graph.columns.forEach(column => {
            column.nodes.forEach(node => {
                node.selected = !!event.selection.find(_node => _node.id === node.id);
            });
        });
    }

    /** @hidden Watcher's avatar click handler */
    _onWatcherClick(watcher: ApprovalUser): void {
        this._dialogService.open(ApprovalFlowApproverDetailsComponent, {
            data: {
                watcher: watcher,
                ...this._defaultDialogOptions
            }
        });
    }

    /** @hidden Send approval reminders to selected users */
    _sendReminders(targets: ApprovalUser[], node: ApprovalNode): void {
        this.dataSource.sendReminders(targets, node).pipe(take(1)).subscribe(() => {
            this._messageToastService.open(this._reminderTemplate, {
                data: {
                    targets: targets,
                    node: node
                },
                duration: 5000
            });
        });
    }

    /** Scroll to the next horizontal slide */
    nextSlide(stepSize = 1): void {
        this._checkCarouselStatus();

        if (Math.abs(this._carouselScrollX) === this._scrollDiff) {
            return;
        }

        const newOffset = this._carouselScrollX - this._carouselStepSize * stepSize;
        const newCarouselStep = this._carouselStep + stepSize;

        this._carouselScrollX = (Math.abs(newOffset) > this._scrollDiff) ? -this._scrollDiff : newOffset;
        this._carouselStep = newCarouselStep <= this._maxCarouselStep ? newCarouselStep : this._maxCarouselStep;
        this._cdr.detectChanges();
    }

    /** Scroll to the previous horizontal slide */
    previousSlide(stepSize = 1): void {
        this._checkCarouselStatus();

        if (this._carouselStep === 0) {
            return;
        }

        if (this._carouselStep === 1) {
            this._carouselScrollX = 0;
        } else {
            this._carouselScrollX += this._carouselStepSize * stepSize;
            this._carouselScrollX = this._carouselScrollX <= 0 ? this._carouselScrollX : 0;
        }

        const newCarouselStep = this._carouselStep - stepSize;
        this._carouselStep = newCarouselStep > 0 ? newCarouselStep : 0;
        this._cdr.detectChanges();
    }

    /** @hidden Handle node keydown and focus other node based on which key is pressed */
    _onNodeKeyDown(
        event: KeyboardEvent,
        node: ApprovalGraphNode,
        firstColumn: boolean,
        firstNode: boolean,
        lastColumn: boolean,
        lastNode: boolean
    ): void {
        if (!KeyUtil.isKeyCode(event, [TAB, UP_ARROW, DOWN_ARROW, RIGHT_ARROW, LEFT_ARROW])) {
            return;
        }

        const { nodeIndex, columnIndex } = this._graphMetadata[node.id];
        const isTab = KeyUtil.isKeyCode(event, TAB);
        const isShift = event.shiftKey;
        const isTabMoveForwardPossible = !isShift && !lastNode && !lastColumn;
        const isTabMoveBackwardPossible = isShift && !firstNode && !firstColumn;

        if (isTab && !isTabMoveForwardPossible && !isTabMoveBackwardPossible) {
            return;
        }

        if (isTab) {
            const nodesSequence = getGraphNodes(this._graph).filter(n => !n.blank && !n.space)
            const currentNodeIndex = nodesSequence.findIndex(n => n === node);
            const diff = isShift ? -1 : 1;
            const nextNode = nodesSequence[currentNodeIndex + diff];

            if (nextNode) {
                event.preventDefault();
                this._focusNode(nextNode, 1);
                return;
            }
        }

        event.preventDefault();
        let nextFocusTarget;

        if (KeyUtil.isKeyCode(event, UP_ARROW) && nodeIndex > 0) {
            nextFocusTarget = this._getNextVerticalNode(nodeIndex, columnIndex, 'up');
        }

        if (KeyUtil.isKeyCode(event, DOWN_ARROW)) {
            nextFocusTarget = this._getNextVerticalNode(nodeIndex, columnIndex, 'down');
        }

        if (KeyUtil.isKeyCode(event, LEFT_ARROW)) {
            nextFocusTarget = this._getNextHorizontalNode(nodeIndex, columnIndex, this._rtl ? 'right' : 'left');
        }

        if (KeyUtil.isKeyCode(event, RIGHT_ARROW)) {
            nextFocusTarget = this._getNextHorizontalNode(nodeIndex, columnIndex, this._rtl ? 'left' : 'right');
        }

        if (nextFocusTarget?.nextNode) {
            this._focusNode(nextFocusTarget.nextNode, nextFocusTarget.stepSize);
        }
    }

    /** @hidden Fetch all necessary data and enter edit mode */
    _enterEditMode(): void {
        this._editModeInitSub = this.dataSource.fetchWatchers().pipe(take(1))
            .subscribe(watchers => {
                this._usersForWatchersList = watchers;
                this._selectedWatchers = [...this._approvalProcess.watchers];
                this._isEditMode = true;
                this._initialApprovalProcess = cloneApprovalProcess(this._approvalProcess);
            });
    }

    /** @hidden Send update approval process calls to DataSource and exit edit mode*/
    _saveEditModeChanges(): void {
        this._editModeInitSub?.unsubscribe();

        this._initialApprovalProcess = null;
        this._isEditMode = false;
        this._messages = [];

        this.dataSource.updateApprovals(this._approvalProcess.nodes);

        if (this._isWatchersListChanged) {
            this.dataSource.updateWatchers(this._selectedWatchers);
        }
    }

    /** @hidden Restore initial approval flow state and exit edit mode */
    _exitEditMode(): void {
        this._editModeInitSub?.unsubscribe();

        this._approvalProcess = cloneApprovalProcess(this._initialApprovalProcess);
        this._initialApprovalProcess = null;
        this._isEditMode = false;
        this._messages = [];

        this._buildView(this._approvalProcess);
    }

    /** @hidden Restore previously saved approval process state */
    _undoLastAction(): void {
        this._approvalProcess = cloneApprovalProcess(this._previousApprovalProcess);
        this._previousApprovalProcess = null;

        this._buildView(this._approvalProcess);
    }

    /** @hidden Open add node dialog */
    _addNode(source: ApprovalGraphNode, type: ApprovalFlowNodeTarget): void {
        const showNodeTypeSelect = type === 'before' && !source.actionsConfig?.disableAddParallel;

        const dialog = this._dialogService.open(ApprovalFlowAddNodeComponent, {
            data: {
                nodeTarget: type,
                showNodeTypeSelect: showNodeTypeSelect,
                node: Object.assign(getBlankApprovalGraphNode(), { blank: false }),
                checkDueDate: this.checkDueDate,
                ...this._defaultDialogOptions
            }
        });

        dialog.afterClosed.subscribe((data: AddNodeDialogFormData ) => {
            if (!data) {
                return;
            }

            const { node, nodeType, toNextSerial } = data;

            if (!node) {
                return;
            }

            this._cacheCurrentApprovalProcess();

            node.id = `tempId${(Math.random() * 1000).toFixed()}`;

            switch (type) {
                case 'empty':
                    this._enterEditMode();
                    break;

                case 'before':
                    if (nodeType === APPROVAL_FLOW_NODE_TYPES.SERIAL) {
                        node.targets = [source.id];
                        this._replaceTargets(source.id, [node.id]);
                    }

                    if (nodeType === APPROVAL_FLOW_NODE_TYPES.PARALLEL) {
                        this._processAddingParallelNode(node, source, toNextSerial);
                    }

                    break;

                case 'before-all':
                    node.targets = this._graph.columns[0].nodes.map(_node => _node.id);
                    break;

                case 'after':
                    node.targets = source.targets;
                    source.targets = [node.id];
                    break;

                case 'after-all':
                    const targetParents = this._graphMetadata[source.targets[0]]?.parents;

                    if (targetParents) {
                        node.targets = source.targets;
                        this._replaceTargets(source.id, [node.id]);

                        this._approvalProcess.nodes = this._approvalProcess.nodes.filter(_node => _node.id !== source.id);
                    } else {
                        this._graph.columns[this._graph.columns.length - 1].nodes.forEach(_node => _node.targets.push(node.id));
                    }

                    break;

                case 'parallel':
                    this._processAddingParallelNode(node, source, toNextSerial);
                    break;
            }

            this._showMessage(node.approvalTeamId ? 'teamAddSuccess' : 'approverAddSuccess');
            this._approvalProcess.nodes.push(node);
            this._buildView(this._approvalProcess);
        });
    }

    /** @hidden Open edit node dialog */
    _editNode(node: ApprovalNode): void {
        const dialog = this._dialogService.open(ApprovalFlowAddNodeComponent, {
            data: {
                isEdit: true,
                node: Object.assign({}, node),
                checkDueDate: this.checkDueDate,
                ...this._defaultDialogOptions
            }
        });

        dialog.afterClosed.subscribe((data: { node: ApprovalNode }) => {
            const updatedNode = data?.node;

            if (!updatedNode) {
                return;
            }

            this._cacheCurrentApprovalProcess();
            this._updateNode(updatedNode);
            this._showMessage('nodeEdit');
            this._buildView(this._approvalProcess);
        });
    }

    /** @hidden "Delete" button click handler */
    _onNodeDelete(nodeToDelete: ApprovalNode): void {
        this._cacheCurrentApprovalProcess();
        this._deleteNode(nodeToDelete);
        this._showMessage(nodeToDelete.approvalTeamId ? 'teamRemove' : 'nodeRemove');
        this._buildView(this._approvalProcess);
    }

    /** @hidden */
    _deleteSelectedNodes(): void {
        this._cacheCurrentApprovalProcess();

        const nodesToDelete = this._nodeComponents
            .filter(nodeComponent => nodeComponent._isSelected)
            .map(nodeComponent => nodeComponent.node);

        nodesToDelete
            .forEach(node => {
                this._deleteNode(node);
                this._buildView(this._approvalProcess);
            });

        this._showMessage('nodesRemove');
    }

    /** @hidden Node drag move handler, used to check if need to highlight a drop zone rectangle */
    _onNodeDragMoved(node: ApprovalGraphNode): void {
        const draggedNodeDimensions = this._nodeComponents
            .find(comp => comp.node === node)._nativeElement.getBoundingClientRect();

        this._nodeComponents
            .forEach(component => {
                if (component.node !== node && Boolean(component._dropZones.length)) {
                    component._checkIfNodeDraggedInDropZone(draggedNodeDimensions)
                }
            });
    }

    /** @hidden Node drop handler */
    _onNodeDrop(nodeToDrop: ApprovalGraphNode, drag: CdkDrag): void {
        drag.reset();

        setTimeout(() => this._dragDropInProgress = false);

        const dropTarget = this._nodeComponents.find(n => n._isAnyDropZoneActive);

        if (!dropTarget) {
            return;
        }

        this._cacheCurrentApprovalProcess();

        const placement = dropTarget._activeDropZones[0].placement;

        this._nodeComponents.forEach(n => n._deactivateDropZones());

        if (placement === 'after') {
            this._deleteNode(nodeToDrop);
            this._buildView(this._approvalProcess);

            const nextNode = getGraphNodes(this._graph).find(node => node.id === dropTarget.node.targets[0]);

            if (nextNode?.blank) {
                this._deleteNode(nextNode);
                this._buildView(this._approvalProcess);
            }

            nodeToDrop.targets = this._approvalProcess.nodes.find(node => node.id === dropTarget.node.id).targets;
            dropTarget.node.targets = [nodeToDrop.id];

            this._finishDragDropProcess(nodeToDrop);
        }

        if (placement === 'before') {
            const dialog = this._dialogService.open(ApprovalFlowSelectTypeComponent);

            dialog.afterClosed.subscribe((data: SelectTypeDialogFormData) => {
                if (!data) {
                    return;
                }

                const { type, toNextSerial } = data;

                this._deleteNode(nodeToDrop);
                this._buildView(this._approvalProcess);

                if (type === APPROVAL_FLOW_NODE_TYPES.SERIAL) {
                    this._replaceTargets(dropTarget.node.id, [nodeToDrop.id]);
                    nodeToDrop.targets = [dropTarget.node.id];
                }

                if (type === APPROVAL_FLOW_NODE_TYPES.PARALLEL) {
                    this._processAddingParallelNode(nodeToDrop, dropTarget.node, toNextSerial);
                }

                this._finishDragDropProcess(nodeToDrop);
            });
        }

        if (placement === 'before-all') {
            this._deleteNode(nodeToDrop);

            const firstColumnNodes = this._graph.columns[0].nodes;
            nodeToDrop.targets = firstColumnNodes.map(node => node.id);

            this._finishDragDropProcess(nodeToDrop);
        }

        if (placement === 'after-all') {
            this._deleteNode(nodeToDrop);
            this._buildView(this._approvalProcess);

            nodeToDrop.targets = [...dropTarget.node.targets];

            if (dropTarget.node.targets.length === 0) {
                const lastColumnNodes = this._graph.columns[this._graph.columns.length - 1].nodes;
                lastColumnNodes.forEach(node => node.targets.push(nodeToDrop.id));
            } else {
                this._approvalProcess.nodes = this._approvalProcess.nodes.filter(node => node.id !== dropTarget.node.id);
                this._replaceTargets(dropTarget.node.id, [nodeToDrop.id]);
            }

            this._finishDragDropProcess(nodeToDrop);
        }
    }

    /** @hidden */
    private _finishDragDropProcess(nodeToDrop: ApprovalGraphNode): void {
        this._approvalProcess.nodes.push(nodeToDrop);
        this._buildView(this._approvalProcess);
    }

    /** @hidden */
    private _showMessage(type: ApprovalFlowMessageType): void {
        this._messages = [{ type: type }];
    }

    /** @hidden Build Approval Flow graph and render it */
    private _buildView(approvalProcess: ApprovalProcess): void {
        this._approvalProcess = approvalProcess;
        this._graph = generateApprovalFlowGraph(this._approvalProcess.nodes);

        if (this._graph.errors) {
            this._showMessage('error');
            return;
        }

        this._graphMetadata = generateApprovalFlowGraphMetadata(this._graph);

        const nodes = getGraphNodes(this._graph);
        this._approvalProcess.nodes = nodes.filter(node => !node.space);
        this._multipleRootNodes = nodes.filter(node => this._graphMetadata[node.id].isRoot).length > 1;
        this._multipleFinalNodes = nodes.filter(node => this._graphMetadata[node.id].isFinal).length > 1;

        this._cdr.detectChanges();
        this._checkCarouselStatus();
        this._gridList?.clearSelection();

        if (!this._isEditMode) {
            this._resetCarousel();
        }
    }

    /** @hidden Listen window resize and distribute cards on column change */
    private _listenOnResize(): void {
        this._subscriptions.add(
            fromEvent(window, 'resize')
                .pipe(debounceTime(60))
                .subscribe(() => {
                    this._resetCarousel();
                    this._checkCarouselStatus();
                })
        );
    }

    /** @hidden */
    private _focusNode(node: ApprovalGraphNode, step: number): void {
        const nodeToFocus = this._nodeComponents.find(comp => comp.node === node);

        if (!nodeToFocus) {
            return;
        }

        const nodeRect = nodeToFocus._nativeElement.getBoundingClientRect();
        const graphContainerRect = this._graphContainerEl.nativeElement.getBoundingClientRect();
        const graphVisibilityThreshold = graphContainerRect.width;
        const nodeOffsetFromContainerEdge = this._rtl
            ? (graphContainerRect.right - nodeRect.right)
            : (nodeRect.left - graphContainerRect.left);

        nodeToFocus._focus();

        if ((nodeOffsetFromContainerEdge + nodeRect.width) > graphVisibilityThreshold) {
            this.nextSlide(step);
            return;
        }

        if (nodeOffsetFromContainerEdge < 0) {
            this.previousSlide(step);
        }
    }

    /** @hidden Update node object in local approval process data structure */
    private _updateNode(node: ApprovalNode): void {
        const nodeIndex = this._approvalProcess.nodes.findIndex(n => n.id === node.id);

        if (nodeIndex > -1) {
            this._approvalProcess.nodes[nodeIndex] = node;
        }
    }

    /** @hidden Delete node object in local approval process data structure */
    private _deleteNode(nodeToDelete: ApprovalNode): void {
        const nodesToDelete = [nodeToDelete];
        const graphNodes = getGraphNodes(this._graph);
        let currNode = graphNodes.find(node => node.id === nodeToDelete.id);
        let nextNode: ApprovalGraphNode;

        do {
            if (currNode.targets.length === 1) {
                nextNode = graphNodes.find(node => node.id === currNode.targets[0]);

                if (nextNode?.blank && this._graphMetadata[nextNode.id].parents.length === 1) {
                    nodesToDelete.push(nextNode);

                    currNode = nextNode;
                    nextNode = graphNodes.find(node => node.id === currNode.targets[0]);
                }
            }
        } while (nextNode?.blank && this._graphMetadata[nextNode.id].parents.length === 1);

        const parent = this._graphMetadata[nodeToDelete.id].parents[0];
        const target = nodeToDelete.targets[0];
        const isParentParallelStart = this._graphMetadata[parent?.id]?.parallelStart;
        const isTargetParallelEnd = this._graphMetadata[target]?.parallelEnd;
        const targets = (isParentParallelStart && isTargetParallelEnd) || nodesToDelete.length > 1 ? [] : currNode.targets;

        this._replaceTargets(nodeToDelete.id, targets);

        this._approvalProcess.nodes = this._approvalProcess.nodes.filter(node => !nodesToDelete.includes(node));
    }

    /** @hidden */
    private _addParallelTargets(targetNodeId: string, nodeIdToAdd: string): void {
        this._approvalProcess.nodes.forEach(node => {
            if (isNodeTargetsIncludeId(node, targetNodeId)) {
                node.targets.push(nodeIdToAdd);
            }
        });
    }

    /** @hidden Replace all occurrences of "idToReplace" in all nodes' "targets" with ones in "replaceWith" array */
    private _replaceTargets(IdToReplace: string, replaceWithId: string[]): void {
        this._approvalProcess.nodes.forEach(n => {
            if (isNodeTargetsIncludeId(n, IdToReplace)) {
                n.targets = n.targets.filter(_id => _id !== IdToReplace);
                n.targets.push(...replaceWithId);
            }
        });
    }

    /** @hidden Save current state of approval process data to be able to undo an action made in edit mode */
    private _cacheCurrentApprovalProcess(): void {
        this._previousApprovalProcess = cloneApprovalProcess(this._approvalProcess);
    }

    /** @hidden Check if need to add carousel controls */
    private _checkCarouselStatus(): void {
        if (!this._graphEl) {
            return;
        }

        this._isCarousel = this._graphEl.nativeElement.scrollWidth > this._graphEl.nativeElement.clientWidth;
        this._maxCarouselStep = Math.ceil(this._scrollDiff / this._carouselStepSize);
        this._cdr.detectChanges();
    }

    /** @hidden Reset the current state of carousel */
    private _resetCarousel(): void {
        this._carouselStep = 0;
        this._carouselScrollX = 0;
    }

    /** @hidden */
    private _getNextHorizontalNode = (
        nodeIndex: number,
        columnIndex: number,
        direction: 'left' | 'right',
        stepSize = 1
    ) => {
        const indexDiff = (direction === 'right' ? 1 : -1);
        const nextColumn = this._graph.columns[columnIndex + indexDiff];
        const nextNode = nextColumn?.nodes[nodeIndex];

        if (!nextNode) {
            return { nextNode: undefined, stepSize: stepSize };
        }

        if (nextNode.blank || nextNode.space) {
            return this._getNextHorizontalNode(nodeIndex, columnIndex + indexDiff, direction, stepSize + 1);
        }

        return { nextNode: nextNode, stepSize: stepSize };
    };

    /** @hidden */
    private _getNextVerticalNode = (
        nodeIndex: number,
        columnIndex: number,
        direction: 'up' | 'down',
        stepSize = 1
    ) => {
        const indexDiff = (direction === 'down' ? 1 : -1);
        const currColumn = this._graph.columns[columnIndex];
        const nextNode = currColumn.nodes[nodeIndex + indexDiff];

        if (!nextNode) {
            return { nextNode: undefined, stepSize: stepSize };
        }

        if (nextNode.blank || nextNode.space) {
            return this._getNextVerticalNode(nodeIndex + indexDiff, columnIndex, direction, stepSize + 1);
        }

        return { nextNode: nextNode, stepSize: stepSize };
    };

    /** @hidden */
    private get _carouselStepSize(): number {
        return this._graphEl.nativeElement.scrollWidth / this._graphEl.nativeElement.children.length;
    }

    /** @hidden */
    private get _scrollDiff(): number {
        return this._graphEl.nativeElement.scrollWidth - this._graphEl.nativeElement.clientWidth;
    }

    /** @hidden */
    private get _defaultDialogOptions(): any {
        return {
            approvalFlowDataSource: this.dataSource,
            userDetailsTemplate: this.userDetailsTemplate,
            rtl: this._rtl
        };
    }

    /** @hidden */
    private get _isWatchersListChanged(): boolean {
        return this._selectedWatchers.length !== this._approvalProcess.watchers.length ||
            this._selectedWatchers.some(watcher => !this._approvalProcess.watchers.find(_watcher => _watcher === watcher));
    }

    /** @hidden */
    private _findSerialNode(yIndex: number, targets: string[]): string[] {
        const targetIsParent = targets.some(targetId => this._graphMetadata[targetId].nodeIndex <= yIndex - 1);

        if (targetIsParent) {
            return targets;
        }

        const targetNode = this._approvalProcess.nodes.find(node => node.id === targets[0]);
        return this._findSerialNode(yIndex, targetNode.targets);
    }

    /** @hidden */
    private _processAddingParallelNode(addedNode: ApprovalGraphNode, sourceNode: ApprovalGraphNode, toNextSerial = false): void {
        addedNode.targets = sourceNode.targets;

        this._addParallelTargets(sourceNode.id, addedNode.id);

        if (toNextSerial) {
            let yIndex = this._graphMetadata[sourceNode.id].nodeIndex;
            let targets = sourceNode.targets;

            if (yIndex === 0) {
                const sourceNodeMetadata = this._graphMetadata[sourceNode.id];
                const columnNodes = this._graph.columns[sourceNodeMetadata.columnIndex].nodes;
                const nextParallelNode = columnNodes.find((node, index) => index > 0 && !node.space);

                if (nextParallelNode) {
                    yIndex = this._graphMetadata[nextParallelNode.id].columnIndex;
                    targets = nextParallelNode.targets;

                    addedNode.targets = this._findSerialNode(yIndex, targets);
                    return;
                }

                addedNode.targets = sourceNode.targets;
                return;
            }

            addedNode.targets = this._findSerialNode(yIndex, targets);
        }
    }
}

function cloneApprovalProcess(approvalProcess: ApprovalProcess): ApprovalProcess {
    return {
        watchers: [...approvalProcess.watchers],
        nodes: approvalProcess.nodes.map(n => ({ ...n, targets: [...n.targets], approvers: [...n.approvers] }))
    };
}
