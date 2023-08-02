import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    Injector,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { combineLatest, fromEvent, merge, Subject, Subscription } from 'rxjs';
import { throttleTime, switchMap, mapTo, map, startWith, distinctUntilChanged } from 'rxjs/operators';

import { KeyUtil, RtlService } from '@fundamental-ngx/cdk/utils';
import { GridListComponent, GridListSelectionEvent } from '@fundamental-ngx/core/grid-list';
import { DialogService } from '@fundamental-ngx/core/dialog';

import {
    ApprovalFlowApproverDetailsComponent,
    ApprovalFlowApproverDetailsDialogRefData
} from './approval-flow-approver-details/approval-flow-approver-details.component';
import { ApprovalFlowNodeComponent } from './approval-flow-node/approval-flow-node.component';
import {
    AddNodeDialogFormData,
    APPROVAL_FLOW_NODE_TYPES,
    ApprovalFlowAddNodeComponent,
    AddNodeDialogRefData,
    ApprovalFlowNodeTarget
} from './approval-flow-add-node/approval-flow-add-node.component';
import {
    displayUserFn,
    getBlankApprovalGraphNode,
    getGraphNodes,
    isNodeTargetsIncludeId,
    trackByFn,
    userValueFn
} from './helpers';
import {
    ApprovalGraphNode,
    ApprovalGraphNodeMetadata,
    ApprovalNode,
    ApprovalProcess,
    ApprovalStatus,
    ApprovalTeam,
    ApprovalUser,
    SendRemindersData
} from './interfaces';
import {
    ApprovalFlowSelectTypeComponent,
    SelectTypeDialogFormData
} from './approval-flow-select-type/approval-flow-select-type.component';
import {
    ApprovalFlowGraph,
    ApprovalGraphMetadata,
    generateApprovalFlowGraph,
    generateApprovalFlowGraphMetadata
} from './approval-flow-graph';
import {
    ApprovalFlowMessage,
    ApprovalFlowMessageType
} from './approval-flow-messages/approval-flow-messages.component';
import {
    DataProvider,
    DATA_PROVIDERS,
    ApprovalFlowTeamDataSource,
    ApprovalFlowUserDataSource
} from '@fundamental-ngx/platform/shared';
import { cloneDeep, uniqBy } from 'lodash-es';
import { ObjectStatus } from '@fundamental-ngx/core/object-status';
import deprecated from 'deprecated-decorator';

let defaultId = 0;
/**
 * @deprecated
 * Approval Flow component is deprecated since version 0.40.0
 */
@deprecated()
@Component({
    selector: 'fdp-approval-flow',
    templateUrl: './approval-flow.component.html',
    styleUrls: ['./approval-flow.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ApprovalFlowComponent implements OnInit, OnChanges, OnDestroy {
    /** Title which is displayed in the header of the Approval Flow component. */
    @Input() title: string;

    /** Value of the approval flow component. */
    @Input() value: ApprovalProcess;

    /** Data source for the users of Approval Flow component. */
    @Input() userDataSource: ApprovalFlowUserDataSource<ApprovalUser>;

    /** Data source for the watchers of Approval Flow component. */
    @Input() watcherDataSource: ApprovalFlowUserDataSource<ApprovalUser>;

    /** Data source for the teams of Approval Flow component. */
    @Input() teamDataSource: ApprovalFlowTeamDataSource<ApprovalTeam>;

    /** A reference to the user details template */
    @Input() userDetailsTemplate: TemplateRef<any>;

    /** A reference to the app custom statuses */
    @Input() approvalStatusTemplate: TemplateRef<any>;

    /** Custom status to color mapping  */
    @Input()
    statusColorMapping: Record<ApprovalStatus, ObjectStatus>;

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
    @Input() watchersLabel: string;

    /** Enables or disables ability to add parallel nodes */
    @Input() allowAddParallelNodes = true;

    /** Disables save button, save button is enabled by default */
    @Input() disableSaveButton = false;

    /** Disables exit button, exit button is enabled by default */
    @Input() disableExitButton = false;

    /**
     * Name of the entity for which users DataProvider will be loaded.
     * Internally we should be able to do lookup to some registry
     * and retrieve the best matching DataProvider that is set on application level
     */
    @Input() usersDataProviderEntityKey?: string;

    /**
     * Name of the entity for which teams DataProvider will be loaded.
     * Internally we should be able to do lookup to some registry
     * and retrieve the best matching DataProvider that is set on application level
     */
    @Input() teamsDataProviderEntityKey?: string;

    /**
     * Name of the entity for which approval flow DataProvider will be loaded.
     * Internally we should be able to do lookup to some registry
     * and retrieve the best matching DataProvider that is set on application level
     */
    @Input() watchersDataProviderEntityKey?: string;

    /** Event emitted on approval flow node click. */
    @Output() nodeClick = new EventEmitter<ApprovalNode>();

    /** Event emitted on approval flow node add */
    @Output() afterNodeAdd = new EventEmitter<ApprovalNode>();

    /** Event emitted on approval flow node edit */
    @Output() afterNodeEdit = new EventEmitter<ApprovalNode>();

    /** Event emitted whenver save is clicked in edit mode  */
    @Output() valueChange = new EventEmitter<ApprovalProcess>();

    /** Event emitted whenever reminders should be sent */
    @Output() sendReminders = new EventEmitter<SendRemindersData>();

    /** Event emitted when data loading is started. */
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() onDataRequested = new EventEmitter<void>();

    /** Event emitted when data loading is finished. */
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() onDataReceived = new EventEmitter<void>();

    /** @hidden */
    @ViewChild('graphContainerEl') _graphContainerEl: ElementRef<HTMLDivElement>;

    /** @hidden */
    @ViewChild('graphEl') _graphEl: ElementRef<HTMLDivElement>;

    /** @hidden */
    @ViewChild('gridList') _gridList: GridListComponent<ApprovalGraphNode>;

    /** @hidden */
    @ViewChildren(ApprovalFlowNodeComponent) _nodeComponents: QueryList<ApprovalFlowNodeComponent>;

    /** @hidden */
    _approvalProcess: ApprovalProcess;

    /** @hidden */
    _initialApprovalProcess?: ApprovalProcess;

    /** @hidden */
    _previousApprovalProcess?: ApprovalProcess;

    /** @hidden */
    _graph: ApprovalFlowGraph;

    /** @hidden */
    _isCarousel = false;

    /** @hidden */
    _graphMetadata: ApprovalGraphMetadata = {};

    /** @hidden */
    _isEditMode = false;

    /** @hidden */
    _usersForWatchersList: ApprovalUser[] = [];

    /** @hidden */
    private _selectedWatchers: ApprovalUser[] = [];

    /** @hidden */
    _selectedWatcherIds: ApprovalUser['id'][] = [];

    /** @hidden */
    _messages: ApprovalFlowMessage[] = [];

    /** @hidden */
    _displayUserFn = displayUserFn;

    /** @hidden */
    _userValueFn = userValueFn;

    /** @hidden */
    _trackByFn = trackByFn;

    /** @hidden */
    _emptyApprovalFlowSpotConfig = {
        spot: { url: '', id: 'sapIllus-Spot-NoData' }
    };

    /** @hidden */
    _multipleRootNodes = false;

    /** @hidden */
    _multipleFinalNodes = false;

    /** @hidden */
    _dragDropInProgress = false;

    /** @hidden */
    readonly approvalFlowUniqueId = `fdp-approval-flow-${++defaultId}`;

    /** @hidden */
    private _editModeInitSub: Subscription;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private _dataSourceChanged$ = new Subject<void>();

    /** @hidden */
    constructor(
        private readonly _dialogService: DialogService,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _injector: Injector,
        @Optional() @Inject(DATA_PROVIDERS) private providers: Map<string, DataProvider<any>>,
        @Optional() private readonly _rtlService: RtlService
    ) {}

    /** Returns snapshot of the current and initial states of approval process */
    get approvalProcess(): ApprovalProcess {
        return cloneDeep(this._approvalProcess);
    }

    /** @hidden */
    get _rtl(): boolean {
        return this._rtlService?.rtl.getValue();
    }

    /** @hidden */
    get _selectedNodes(): ApprovalGraphNode[] {
        return getGraphNodes(this._graph).filter((node) => node.selected);
    }

    /** @hidden */
    ngOnInit(): void {
        if (!this.userDataSource) {
            const usersDP = this.usersDataProviderEntityKey && this.providers?.get(this.usersDataProviderEntityKey);
            if (usersDP) {
                this.userDataSource = new ApprovalFlowUserDataSource(usersDP);
            } else {
                console.error('Could not resolve users data source');
            }
        }
        if (!this.watcherDataSource) {
            const watchersDP =
                this.watchersDataProviderEntityKey && this.providers?.get(this.watchersDataProviderEntityKey);
            if (watchersDP) {
                this.watcherDataSource = new ApprovalFlowUserDataSource(watchersDP);
            } else {
                console.error('Could not resolve watchers data source');
            }
        }
        if (!this.teamDataSource) {
            const teamsDP = this.teamsDataProviderEntityKey && this.providers?.get(this.teamsDataProviderEntityKey);
            if (teamsDP) {
                this.teamDataSource = new ApprovalFlowTeamDataSource(teamsDP);
            } else {
                console.error('Could not resolve teams data source');
            }
        }

        this._listenOnResize();
        this._setupDataSourceSubscription();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.value) {
            const process = this.value ?? { watchers: [], nodes: [] };
            this._initialApprovalProcess = cloneDeep(process);
            this._buildView(process);
        }

        if (changes.userDataSource || changes.watcherDataSource || changes.teamDataSource) {
            this._dataSourceChanged$.next();
        }
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

        return !node.blank && !!nextNodeBlank && !nextNodeParallelEnd;
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

        const dialog = this._dialogService.open<ApprovalFlowApproverDetailsDialogRefData>(
            ApprovalFlowApproverDetailsComponent,
            {
                data: {
                    node,
                    allowSendReminder: this.allowSendRemindersForStatuses.includes(node.status),
                    ...this._defaultDialogOptions
                }
            },
            this._injector
        );

        dialog.afterClosed.subscribe((reminderTargets) => {
            if (Array.isArray(reminderTargets)) {
                this.sendReminders.emit({ users: reminderTargets, node });
            }
        });

        this.nodeClick.emit(node);
    }

    /** @hidden */
    _onNodeAdd(node: ApprovalNode): void {
        this.afterNodeAdd.emit(node);
    }

    /** @hidden */
    _onNodeEdit(node: ApprovalNode): void {
        this.afterNodeEdit.emit(node);
    }

    /** @hidden */
    _onNodeSelectionChange(event: GridListSelectionEvent<ApprovalGraphNode>): void {
        this._graph.columns.forEach((column) => {
            column.nodes.forEach((node) => {
                node.selected = !!event.selection.find((_node) => _node.id === node.id);
            });
        });
    }

    /** @hidden Watcher's avatar click handler */
    _onWatcherClick(watcher: ApprovalUser, event: Event): void {
        event.preventDefault();
        this._dialogService.open<ApprovalFlowApproverDetailsDialogRefData>(ApprovalFlowApproverDetailsComponent, {
            data: {
                watcher,
                ...this._defaultDialogOptions
            }
        });
    }

    /** Retrive metadata by node id */
    getNodeMetadataByNodeId(nodeId: string): ApprovalGraphNodeMetadata {
        return this._graphMetadata[nodeId];
    }

    /** Scroll to the next horizontal slide */
    nextSlide(dir = 1): void {
        const threshold = 1;

        let pos = 0;

        if (dir === 1) {
            const lastStep = this._carouselStepsRight === 1;
            const nextStep = this._carouselStepsCount - this._carouselStepsRight + 1;
            const visibleRightPoint = this._carouselStepSize * nextStep + (lastStep ? 0 : threshold);
            pos = visibleRightPoint - this._graphEl.nativeElement.clientWidth;
        } else {
            const lastStep = this._carouselStepsLeft === 1;
            const nextStep = this._carouselStepsLeft - 1;
            pos = this._carouselStepSize * nextStep - (lastStep ? 0 : threshold);
        }

        this._setScrollPosition(pos);

        this._cdr.detectChanges();
    }

    /** @hidden */
    _setScrollPosition(pos: number): void {
        this._graphContainerEl.nativeElement.scrollTo({
            left: pos,
            behavior: 'smooth'
        });
    }

    /** @hidden */
    private _moveColInView(colIndex: number): any {
        const node = this._graphEl.nativeElement.children[colIndex].firstElementChild;
        if (!node) {
            return;
        }

        const { x: nodeX, width } = node.getBoundingClientRect();

        const delta = this._graphContainerEl.nativeElement.getBoundingClientRect().x;

        const left = nodeX - delta;
        const right = left + width;

        if (left < 0) {
            this._setScrollPosition(this._graphContainerEl.nativeElement.scrollLeft + left);
        } else if (right > this._graphEl.nativeElement.clientWidth) {
            this._setScrollPosition(
                this._graphContainerEl.nativeElement.scrollLeft + right - this._graphEl.nativeElement.clientWidth
            );
        }
    }

    /** @hidden Handle node keydown and focus other node based on which key is pressed */
    _onNodeKeyDown(event: KeyboardEvent, node: ApprovalGraphNode): void {
        if (!KeyUtil.isKeyCode(event, [UP_ARROW, DOWN_ARROW, RIGHT_ARROW, LEFT_ARROW])) {
            return;
        }

        const { nodeIndex, columnIndex } = this._graphMetadata[node.id];

        event.preventDefault();

        let nextFocusTarget: ApprovalGraphNode | undefined;

        if (typeof nodeIndex === 'number' && typeof columnIndex === 'number') {
            if (KeyUtil.isKeyCode(event, UP_ARROW)) {
                if (nodeIndex > 0) {
                    nextFocusTarget = this._getNextVerticalNode(nodeIndex, columnIndex, 'up');
                }
            } else if (KeyUtil.isKeyCode(event, DOWN_ARROW)) {
                nextFocusTarget = this._getNextVerticalNode(nodeIndex, columnIndex, 'down');
            } else if (KeyUtil.isKeyCode(event, LEFT_ARROW)) {
                nextFocusTarget = this._getNextHorizontalNode(nodeIndex, columnIndex, this._rtl ? 'right' : 'left');
            } else if (KeyUtil.isKeyCode(event, RIGHT_ARROW)) {
                nextFocusTarget = this._getNextHorizontalNode(nodeIndex, columnIndex, this._rtl ? 'left' : 'right');
            }
        }

        if (nextFocusTarget) {
            this._focusNode(nextFocusTarget);
        }
    }

    /** @hidden Fetch all necessary data and enter edit mode */
    _enterEditMode(): void {
        // there's no support for searching in multi-input, so grabbing all watchers
        // triggering initial loading of data in data sources
        this.watcherDataSource.match();
        this._editModeInitSub = this.watcherDataSource.open().subscribe((watchers) => {
            this._usersForWatchersList = watchers;
            this._selectedWatchers = this._approvalProcess.watchers;
            this._selectedWatcherIds = this._selectedWatchers.map((w) => w.id);
            this._isEditMode = true;
            this._initialApprovalProcess = cloneDeep(this._approvalProcess);
            this._cdr.detectChanges();
        });
        this._subscriptions.add(this._editModeInitSub);
    }

    /** @hidden Send update approval process calls to DataSource and exit edit mode*/
    _saveEditModeChanges(): void {
        this._editModeInitSub?.unsubscribe();
        this.watcherDataSource.close();

        this._initialApprovalProcess = undefined;
        this._isEditMode = false;
        this._messages = [];

        const updated = {
            ...this._approvalProcess,
            watchers: this._selectedWatchers
        };

        this._buildView(updated);

        this.valueChange.emit(updated);
    }

    /** @hidden Restore initial approval flow state and exit edit mode */
    _exitEditMode(): void {
        this._editModeInitSub?.unsubscribe();
        this.watcherDataSource.close();

        this._approvalProcess = cloneDeep(this._initialApprovalProcess!);
        this._initialApprovalProcess = undefined;
        this._isEditMode = false;
        this._messages = [];

        this._buildView(this._approvalProcess);
    }

    /** @hidden */
    _watchersSelectionChanged(selectedIds: ApprovalUser['id'][]): void {
        const idsSet = new Set(selectedIds);
        // updating watchers selection
        // since it's possible "_usersForWatchersList" might not contain all selected values,
        // determine current selection based on what's already selected and "_usersForWatchersList"
        this._selectedWatchers = uniqBy(
            this._selectedWatchers.concat(this._usersForWatchersList).filter((user) => idsSet.has(user.id)),
            (u) => u.id
        );
    }

    /** @hidden Restore previously saved approval process state */
    _undoLastAction(): void {
        this._approvalProcess = cloneDeep(this._previousApprovalProcess!);
        this._previousApprovalProcess = undefined;

        this._buildView(this._approvalProcess);
    }

    /** @hidden Open add node dialog */
    _addNode(source: ApprovalGraphNode, type: ApprovalFlowNodeTarget): void {
        const showNodeTypeSelect = type === 'before' && !source.actionsConfig?.disableAddParallel;

        const dialog = this._dialogService.open<AddNodeDialogRefData>(
            ApprovalFlowAddNodeComponent,
            {
                data: {
                    nodeTarget: type,
                    showNodeTypeSelect,
                    node: Object.assign(getBlankApprovalGraphNode(), { blank: false }),
                    checkDueDate: this.checkDueDate,
                    ...this._defaultDialogOptions
                }
            },
            this._injector
        );

        dialog.afterClosed.subscribe((data: AddNodeDialogFormData) => {
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
                    node.targets = this._graph.columns[0].nodes.map((_node) => _node.id);
                    break;

                case 'after':
                    node.targets = source.targets;
                    source.targets = [node.id];
                    break;

                case 'after-all': {
                    const targetParents = this._graphMetadata[source.targets[0]]?.parents;

                    if (targetParents) {
                        node.targets = source.targets;
                        this._replaceTargets(source.id, [node.id]);

                        this._approvalProcess.nodes = this._approvalProcess.nodes.filter(
                            (_node) => _node.id !== source.id
                        );
                    } else {
                        this._graph.columns[this._graph.columns.length - 1].nodes.forEach((_node) =>
                            _node.targets.push(node.id)
                        );
                    }

                    break;
                }
                case 'parallel':
                    this._processAddingParallelNode(node, source, toNextSerial);
                    break;
            }

            this._showMessage(node.approvalTeamId ? 'teamAddSuccess' : 'approverAddSuccess');
            this._approvalProcess.nodes.push(node);

            this._buildView(this._approvalProcess);
            this._onNodeAdd(node);
        });
    }

    /** @hidden Open edit node dialog */
    _editNode(node: ApprovalNode): void {
        const dialog = this._dialogService.open<AddNodeDialogRefData>(
            ApprovalFlowAddNodeComponent,
            {
                data: {
                    isEdit: true,
                    node: Object.assign({}, node),
                    checkDueDate: this.checkDueDate,
                    ...this._defaultDialogOptions
                }
            },
            this._injector
        );

        dialog.afterClosed.subscribe((data: { node: ApprovalNode }) => {
            const updatedNode = data?.node;

            if (!updatedNode) {
                return;
            }

            this._cacheCurrentApprovalProcess();
            this._updateNode(updatedNode);
            this._showMessage('nodeEdit');
            this._buildView(this._approvalProcess);
            this._onNodeEdit(node);
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
            .filter((nodeComponent) => nodeComponent._isSelected)
            .map((nodeComponent) => nodeComponent.node);

        nodesToDelete.forEach((node) => {
            this._deleteNode(node);
            this._buildView(this._approvalProcess);
        });

        this._showMessage('nodesRemove');
    }

    /** @hidden Node drag move handler, used to check if need to highlight a drop zone rectangle */
    _onNodeDragMoved(node: ApprovalGraphNode): void {
        const draggedNodeDimensions = this._nodeComponents
            .find((comp) => comp.node === node)
            ?._nativeElement.getBoundingClientRect();

        if (!draggedNodeDimensions) {
            return;
        }

        this._nodeComponents.forEach((component) => {
            if (component.node !== node && Boolean(component._dropZones.length)) {
                component._checkIfNodeDraggedInDropZone(draggedNodeDimensions);
            }
        });
    }

    /** @hidden Node drop handler */
    _onNodeDrop(nodeToDrop: ApprovalGraphNode, drag: CdkDrag): void {
        drag.reset();

        setTimeout(() => (this._dragDropInProgress = false));

        const dropTarget = this._nodeComponents.find((n) => n._isAnyDropZoneActive);

        if (!dropTarget) {
            return;
        }

        this._cacheCurrentApprovalProcess();

        const placement = dropTarget._activeDropZones[0].placement;

        this._nodeComponents.forEach((n) => n._deactivateDropZones());

        if (placement === 'after') {
            this._deleteNode(nodeToDrop);
            this._buildView(this._approvalProcess);

            const nextNode = getGraphNodes(this._graph).find((node) => node.id === dropTarget.node.targets[0]);

            if (nextNode?.blank) {
                this._deleteNode(nextNode);
                this._buildView(this._approvalProcess);
            }

            nodeToDrop.targets =
                this._approvalProcess.nodes.find((node) => node.id === dropTarget.node.id)?.targets ?? [];
            dropTarget.node.targets = [nodeToDrop.id];

            this._finishDragDropProcess(nodeToDrop);
        } else if (placement === 'before') {
            const dialog = this._dialogService.open(ApprovalFlowSelectTypeComponent, undefined, this._injector);

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
        } else if (placement === 'before-all') {
            this._deleteNode(nodeToDrop);

            const firstColumnNodes = this._graph.columns[0].nodes;
            nodeToDrop.targets = firstColumnNodes.map((node) => node.id);

            this._finishDragDropProcess(nodeToDrop);
        } else if (placement === 'after-all') {
            this._deleteNode(nodeToDrop);
            this._buildView(this._approvalProcess);

            nodeToDrop.targets = [...dropTarget.node.targets];

            if (dropTarget.node.targets.length === 0) {
                const lastColumnNodes = this._graph.columns[this._graph.columns.length - 1].nodes;
                lastColumnNodes.forEach((node) => node.targets.push(nodeToDrop.id));
            } else {
                this._approvalProcess.nodes = this._approvalProcess.nodes.filter(
                    (node) => node.id !== dropTarget.node.id
                );
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
        this._messages = [{ type }];
    }

    /** @hidden Build Approval Flow graph and render it */
    private _buildView(approvalProcess: ApprovalProcess): void {
        if (!approvalProcess.nodes) {
            approvalProcess.nodes = [];
        }
        if (!approvalProcess.watchers) {
            approvalProcess.watchers = [];
        }
        this._approvalProcess = approvalProcess;
        this._graph = generateApprovalFlowGraph(this._approvalProcess.nodes);

        if (this._graph.errors) {
            this._showMessage('error');
            return;
        }

        this._graphMetadata = generateApprovalFlowGraphMetadata(this._graph);

        const nodes = getGraphNodes(this._graph);
        this._approvalProcess.nodes = nodes.filter((node) => !node.space);
        this._multipleRootNodes = nodes.filter((node) => this._graphMetadata[node.id].isRoot).length > 1;
        this._multipleFinalNodes = nodes.filter((node) => this._graphMetadata[node.id].isFinal).length > 1;

        this._cdr.detectChanges();
        this._gridList?.clearSelection();

        if (!this._isEditMode) {
            this._setScrollPosition(0);
        }
    }

    /** @hidden Listen window resize and distribute cards on column change */
    private _listenOnResize(): void {
        this._subscriptions.add(
            merge(fromEvent(window, 'resize'), fromEvent(this._graphContainerEl.nativeElement, 'scroll'))
                .pipe(throttleTime(50, undefined, { leading: true, trailing: true }))
                .subscribe(() => {
                    this._cdr.detectChanges();
                })
        );
    }

    /** @hidden */
    _focusNode(node: ApprovalGraphNode): void {
        const nodeToFocus = this._nodeComponents.find((comp) => comp.node === node);

        if (!nodeToFocus) {
            return;
        }
        this._moveColInView(node.colIndex ?? 0);
        nodeToFocus._focus({ preventScroll: true });
    }

    /** @hidden Update node object in local approval process data structure */
    private _updateNode(node: ApprovalNode): void {
        const nodeIndex = this._approvalProcess.nodes.findIndex((n) => n.id === node.id);

        if (nodeIndex > -1) {
            this._approvalProcess.nodes[nodeIndex] = node;
        }
    }

    /** @hidden Delete node object in local approval process data structure */
    private _deleteNode(nodeToDelete: ApprovalNode): void {
        const nodesToDelete = [nodeToDelete];
        const graphNodes = getGraphNodes(this._graph);
        let currNode = graphNodes.find((node) => node.id === nodeToDelete.id);
        let nextNode: ApprovalGraphNode | undefined;

        do {
            if (currNode?.targets.length === 1) {
                nextNode = graphNodes.find((node) => node.id === currNode?.targets[0]);

                if (nextNode?.blank && this._graphMetadata[nextNode.id].parents.length === 1) {
                    nodesToDelete.push(nextNode);

                    currNode = nextNode;
                    nextNode = graphNodes.find((node) => node.id === currNode?.targets[0]);
                }
            }
        } while (nextNode?.blank && this._graphMetadata[nextNode.id].parents.length === 1);

        const parent = this._graphMetadata[nodeToDelete.id].parents[0];
        const target = nodeToDelete.targets[0];
        const isParentParallelStart = this._graphMetadata[parent?.id]?.parallelStart;
        const isTargetParallelEnd = this._graphMetadata[target]?.parallelEnd;
        const targets =
            (isParentParallelStart && isTargetParallelEnd) || nodesToDelete.length > 1 ? [] : currNode?.targets ?? [];

        this._replaceTargets(nodeToDelete.id, targets);

        this._approvalProcess.nodes = this._approvalProcess.nodes.filter((node) => !nodesToDelete.includes(node));
    }

    /** @hidden */
    private _addParallelTargets(targetNodeId: string, nodeIdToAdd: string): void {
        this._approvalProcess.nodes.forEach((node) => {
            if (isNodeTargetsIncludeId(node, targetNodeId)) {
                node.targets.push(nodeIdToAdd);
            }
        });
    }

    /** @hidden Replace all occurrences of "idToReplace" in all nodes' "targets" with ones in "replaceWith" array */
    private _replaceTargets(IdToReplace: string, replaceWithId: string[]): void {
        this._approvalProcess.nodes.forEach((n) => {
            if (isNodeTargetsIncludeId(n, IdToReplace)) {
                n.targets = n.targets.filter((_id) => _id !== IdToReplace);
                n.targets.push(...replaceWithId);
            }
        });
    }

    /** @hidden Save current state of approval process data to be able to undo an action made in edit mode */
    private _cacheCurrentApprovalProcess(): void {
        this._previousApprovalProcess = cloneDeep(this._approvalProcess);
    }

    /** @hidden */
    private _getNextHorizontalNode = (
        nodeIndex: number,
        columnIndex: number,
        direction: 'left' | 'right'
    ): ApprovalGraphNode | undefined => {
        const indexDiff = direction === 'right' ? 1 : -1;
        const nextColumn = this._graph.columns[columnIndex + indexDiff];
        const nextNode = nextColumn?.nodes[nodeIndex];

        if (!nextNode) {
            return undefined;
        }

        if (nextNode.blank || nextNode.space) {
            return this._getNextHorizontalNode(nodeIndex, columnIndex + indexDiff, direction);
        }

        return nextNode;
    };

    /** @hidden */
    private _getNextVerticalNode = (
        nodeIndex: number,
        columnIndex: number,
        direction: 'up' | 'down'
    ): ApprovalGraphNode | undefined => {
        const indexDiff = direction === 'down' ? 1 : -1;
        const currColumn = this._graph.columns[columnIndex];
        const nextNode = currColumn.nodes[nodeIndex + indexDiff];

        if (!nextNode) {
            return undefined;
        }

        if (nextNode.blank || nextNode.space) {
            return this._getNextVerticalNode(nodeIndex + indexDiff, columnIndex, direction);
        }

        return nextNode;
    };

    /** @hidden */
    private get _carouselStepSize(): number {
        return this._graphEl.nativeElement.scrollWidth / this._carouselStepsCount;
    }

    /** @hidden */
    get _scrollDiff(): number {
        if (!this._graphEl) {
            return 0;
        }
        return this._graphEl.nativeElement.scrollWidth - this._graphEl.nativeElement.clientWidth;
    }

    /** @hidden */
    get _carouselStepsCount(): number {
        return this._graphEl.nativeElement.children.length;
    }

    /** @hidden */
    get _carouselStepsLeft(): number {
        return Math.ceil(this._graphContainerEl.nativeElement.scrollLeft / this._carouselStepSize);
    }

    /** @hidden */
    get _carouselStepsRight(): number {
        return Math.ceil(
            (this._scrollDiff - Math.round(this._graphContainerEl.nativeElement.scrollLeft)) / this._carouselStepSize
        );
    }

    /** @hidden */
    private get _defaultDialogOptions(): DefaultDialogOptions {
        return {
            teamDataSource: this.teamDataSource,
            userDataSource: this.userDataSource,
            userDetailsTemplate: this.userDetailsTemplate,
            rtl: this._rtl
        };
    }

    /** @hidden */
    private _findSerialNode(yIndex?: number, targets?: string[]): string[] {
        const targetIsParent =
            Number.isInteger(yIndex) &&
            targets?.some((targetId) => {
                const nodeIndex = this._graphMetadata[targetId]?.nodeIndex;
                return Number.isInteger(nodeIndex) && nodeIndex! <= yIndex! - 1;
            });

        if (targetIsParent) {
            return targets ?? [];
        }

        const targetNode = this._approvalProcess.nodes.find((node) => node.id === targets?.[0]);
        return this._findSerialNode(yIndex, targetNode?.targets);
    }

    /** @hidden */
    private _processAddingParallelNode(
        addedNode: ApprovalGraphNode,
        sourceNode: ApprovalGraphNode,
        toNextSerial = false
    ): void {
        addedNode.targets = sourceNode.targets;

        this._addParallelTargets(sourceNode.id, addedNode.id);

        if (toNextSerial) {
            let yIndex = this._graphMetadata[sourceNode.id].nodeIndex;
            let targets = sourceNode.targets;

            if (yIndex === 0) {
                const sourceNodeMetadata = this._graphMetadata[sourceNode.id];
                const columnNodes = this._graph.columns?.[sourceNodeMetadata.columnIndex!]?.nodes;
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

    /** @hidden */
    private _setupDataSourceSubscription(): void {
        const sub = this._dataSourceChanged$
            .pipe(
                startWith(null),
                switchMap(() => {
                    const loadingStates = [this.teamDataSource, this.userDataSource, this.watcherDataSource]
                        .filter(Boolean)
                        .map((ds) =>
                            merge(ds.onDataRequested().pipe(mapTo(true)), ds.onDataReceived().pipe(mapTo(false))).pipe(
                                startWith(ds.isDataLoading)
                            )
                        );
                    return combineLatest(loadingStates);
                }),
                map((loadingStates) => loadingStates.some(Boolean)),
                distinctUntilChanged()
            )
            .subscribe((someLoading) => {
                if (someLoading) {
                    this.onDataRequested.emit();
                } else {
                    this.onDataReceived.emit();
                }
            });
        this._subscriptions.add(sub);
    }
}

interface DefaultDialogOptions {
    teamDataSource: ApprovalFlowTeamDataSource<ApprovalTeam>;
    userDataSource: ApprovalFlowUserDataSource<ApprovalUser>;
    userDetailsTemplate: TemplateRef<any>;
    rtl: boolean;
}
