import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnInit,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewChildren,
    EventEmitter,
    OnDestroy, Optional
} from '@angular/core';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, TAB, UP_ARROW } from '@angular/cdk/keycodes';

import { DialogService, KeyUtil, MessageToastService, RtlService } from '@fundamental-ngx/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { ApprovalDataSource, ApprovalNode, ApprovalProcess, ApprovalUser } from './interfaces';
import { ApprovalFlowUserDetailsComponent } from './approval-flow-user-details/approval-flow-user-details.component';
import { ApprovalFlowNodeComponent } from './approval-flow-node/approval-flow-node.component';

export type ApprovalGraphNode = ApprovalNode & { blank?: true };

interface ApprovalGraphColumn {
    nodes: ApprovalGraphNode[];
    index?: number;
    isPartial?: boolean;
    allNodesApproved?: boolean
}

type ApprovalFlowGraph = ApprovalGraphColumn[];

@Component({
    selector: 'fdp-approval-flow',
    templateUrl: './approval-flow.component.html',
    styleUrls: ['./approval-flow.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApprovalFlowComponent implements OnInit, OnDestroy {
    /** Title which is displayed in the header of the Approval Flow component. */
    @Input() title = 'Approval  process';

    /** Data source for the Approval Flow component. */
    @Input() dataSource: ApprovalDataSource;

    /** A reference to the user details template */
    @Input() userDetailsTemplate: TemplateRef<any>;

    /** Event emitted on approval flow node click. */
    @Output() nodeClick = new EventEmitter<ApprovalNode>();

    /** @hidden */
    @ViewChild('graphContainerEl') graphContainerEl: ElementRef;

    /** @hidden */
    @ViewChild('graphEl') graphEl: ElementRef;

    /** @hidden */
    @ViewChild('reminderTemplate') reminderTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChildren(ApprovalFlowNodeComponent) nodeComponents: QueryList<ApprovalFlowNodeComponent>;

    /** @hidden */
    _approvalProcess: ApprovalProcess;

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
    _nodeParentsMap: { [key: string]: ApprovalGraphNode } = {};

    /**  @hidden */
    _dir: string;

    private subscriptions = new Subscription();

    /** @hidden */
    constructor(
        private _dialogService: DialogService,
        private _messageToastService: MessageToastService,
        private _cdr: ChangeDetectorRef,
        @Optional() private _rtlService: RtlService
    ) {
    }

    /** @hidden */
    get _isRTL(): boolean {
        return this._dir === 'rtl';
    }

    /** @hidden */
    ngOnInit(): void {
        if (!this.dataSource) {
            return;
        }

        this.subscriptions.add(this.dataSource.fetch().subscribe(approvalProcess => {
            this._approvalProcess = approvalProcess;
            this._graph = this._buildNodeTree(approvalProcess.nodes);
            this._cdr.detectChanges();
            this._resetCarousel();
            this._checkCarouselStatus();
        }));
        this.subscriptions.add(this._rtlService.rtl.subscribe(isRtl => {
            this._dir = isRtl ? 'rtl' : 'ltr';
            this._cdr.detectChanges();
        }));
    }

    onNodeClick(node: ApprovalNode): void {
        const dialogRef = this._dialogService.open(ApprovalFlowUserDetailsComponent, {
            data: {
                node: node,
                approvalFlowDataSource: this.dataSource,
                userDetailsTemplate: this.userDetailsTemplate,
                rtl: this._isRTL
            }
        });
        dialogRef.afterClosed.subscribe((reminderTargets) => {
            if (Array.isArray(reminderTargets)) {
                this.sendReminders(reminderTargets, node);
            }
        });
        this.nodeClick.emit(node);
    }

    onWatcherClick(watcher: ApprovalUser): void {
        this._dialogService.open(ApprovalFlowUserDetailsComponent, {
            data: {
                watcher: watcher,
                approvalFlowDataSource: this.dataSource,
                userDetailsTemplate: this.userDetailsTemplate,
                rtl: this._isRTL
            }
        });


    }

    sendReminders(targets: ApprovalUser[], node: ApprovalNode): void {
        this.dataSource.sendReminders(targets, node).pipe(take(1)).subscribe(() => {
            this._messageToastService.open(this.reminderTemplate, {
                data: {
                    targets: targets,
                    node: node
                },
                duration: 5000
            });
        });
    }

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

    onNodeKeyDown(
        event: KeyboardEvent,
        node: ApprovalGraphNode,
        nodeIndex: number,
        columnIndex: number,
        firstColumn: boolean,
        firstNode: boolean,
        lastColumn: boolean,
        lastNode: boolean
    ): void {
        if (!KeyUtil.isKeyCode(event, [TAB, UP_ARROW, DOWN_ARROW, RIGHT_ARROW, LEFT_ARROW])) {
            return;
        }

        const isTab = KeyUtil.isKeyCode(event, TAB);
        const isShift = event.shiftKey;

        if (
            isTab &&
            ((isShift && firstNode && firstColumn) ||
                (!isShift && lastColumn && lastNode))
        ) {
            return;
        }

        if (isTab) {
            const nodesSequence = this._graph.reduce((result: ApprovalGraphNode[], col: ApprovalGraphColumn) => {
                return result.concat(col.nodes);
            }, []).filter(n => !n.blank);
            const currentNodeIndex = nodesSequence.findIndex(n => n === node);
            const diff = isShift ? -1 : 1;
            const nextNode = nodesSequence[currentNodeIndex + diff];
            if (currentNodeIndex > -1 && nextNode) {
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
            nextFocusTarget = this._getNextHorizontalNode(nodeIndex, columnIndex, this._isRTL ? 'right' : 'left');
        }

        if (KeyUtil.isKeyCode(event, RIGHT_ARROW)) {
            nextFocusTarget = this._getNextHorizontalNode(nodeIndex, columnIndex, this._isRTL ? 'left' : 'right');
        }

        if (nextFocusTarget?.nextNode) {
            this._focusNode(nextFocusTarget.nextNode, nextFocusTarget.stepSize);
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    /** @hidden */
    private _buildNodeTree(nodes: ApprovalGraphNode[]): ApprovalFlowGraph {
        const graph: ApprovalFlowGraph = [];
        const rootNode = findRootNode(nodes);
        if (!rootNode) {
            return graph;
        }

        graph[0] = { nodes: [rootNode] };
        let index = 1;
        let foundLastStep = false;
        do {
            const dependentNodes: ApprovalNode[] = [];
            graph[index - 1].nodes.forEach(node => {
                const _dependentNodes = findDependentNodes([node], nodes);
                _dependentNodes.forEach(dependentNode => this._nodeParentsMap[dependentNode.id] = node);
                dependentNodes.push(..._dependentNodes);
            });
            foundLastStep = dependentNodes.length === 0;
            if (foundLastStep) {
                break;
            }

            const nodesWithoutTarget = dependentNodes.filter(node => !node.targets.length);
            const nodesWithTarget = dependentNodes.filter(node => node.targets.length);

            const isMixed = dependentNodes.length > 1 && nodesWithoutTarget.length && nodesWithoutTarget.length !== dependentNodes.length;
            if (isMixed && graph[index - 1].nodes.length > 1) {
                const nodesWithBlankSpaces: ApprovalGraphNode[] = [...dependentNodes];
                nodesWithBlankSpaces.forEach((node, i) => {
                    if (nodesWithTarget.includes(node)) {
                        nodesWithBlankSpaces[i] = {
                            id: '',
                            name: '',
                            targets: [],
                            approvers: [],
                            status: 'not started',
                            blank: true
                        };
                    }
                });
                graph[index] = { nodes: nodesWithBlankSpaces, isPartial: true };
                graph[index + 1] = { nodes: nodesWithTarget };
                index += 2;
            } else {
                graph[index] = { nodes: dependentNodes };
                index++;
            }
        } while (!foundLastStep);

        graph.forEach(column => {
            column.allNodesApproved = column.nodes.every(node => node.status === 'approved');
        });

        return graph;
    }

    /** @hidden */
    private _focusNode(node: ApprovalGraphNode, step: number): void {
        const nodeToFocus = this.nodeComponents.find(comp => comp.node === node);
        if (!nodeToFocus) {
            return;
        }

        const nodeRect = nodeToFocus._nativeElement.getBoundingClientRect();
        const graphContainerRect = this.graphContainerEl.nativeElement.getBoundingClientRect();
        const graphVisibilityThreshold = graphContainerRect.width;
        const nodeOffsetFromContainerEdge = this._isRTL ?
            (graphContainerRect.right - nodeRect.right) :
            (nodeRect.left - graphContainerRect.left);

        nodeToFocus._focus();

        if ((nodeOffsetFromContainerEdge + nodeRect.width) > graphVisibilityThreshold) {
            this.nextSlide(step);
            return;
        }

        if (nodeOffsetFromContainerEdge < 0) {
            this.previousSlide(step);
        }
    }

    /** @hidden */
    private _checkCarouselStatus(): void {
        this._isCarousel = this.graphEl.nativeElement.scrollWidth > this.graphEl.nativeElement.clientWidth;
        this._maxCarouselStep = Math.ceil(this._scrollDiff / this._carouselStepSize);
        this._cdr.detectChanges();
    }

    /** @hidden */
    private _resetCarousel(): void {
        this._carouselStep = 0;
        this._carouselScrollX = 0;
    }

    /** @hidden */
    private _getNextHorizontalNode = (_ni: number, _ci: number, direction: 'left' | 'right', stepSize: number = 1) => {
        const indexDiff = (direction === 'right' ? 1 : -1);
        const _column = this._graph[_ci + indexDiff];
        if (!_column) {
            return { nextNode: undefined, stepSize: stepSize };
        }

        const _nextNode = _column.nodes[_ni] || _column.nodes[0];
        if (_nextNode.blank) {
            return this._getNextHorizontalNode(_ni, _ci + indexDiff, direction, stepSize + 1);
        }

        return { nextNode: _nextNode, stepSize: stepSize };
    };

    /** @hidden */
    private _getNextVerticalNode = (_ni: number, _ci: number, direction: 'up' | 'down', stepSize: number = 1) => {
        const indexDiff = (direction === 'down' ? 1 : -1);
        const _column = this._graph[_ci];
        const _nextColumn = this._graph[_ci + 1];
        const _nextNode = _column.nodes[_ni + indexDiff] || _nextColumn?.nodes[_ni + 1];
        if (_nextNode && _nextNode.blank) {
            return this._getNextVerticalNode(_ni, _ci + indexDiff, direction, stepSize + 1);
        }

        return { nextNode: _nextNode, stepSize: stepSize };
    };

    /** @hidden */
    private get _carouselStepSize(): number {
        return this.graphEl.nativeElement.scrollWidth / this.graphEl.nativeElement.children.length;
    }

    /** @hidden */
    private get _scrollDiff(): number {
        return this.graphEl.nativeElement.scrollWidth - this.graphEl.nativeElement.clientWidth;
    }
}

function findRootNode(nodes: ApprovalNode[]): ApprovalNode {
    return nodes.find(node => nodes.every(n => !n.targets.includes(node.id)));
}

function findDependentNodes(rootNodes: ApprovalGraphNode[], nodes: ApprovalNode[]): ApprovalNode[] {
    const rootNodeTargetIds = rootNodes.reduce((acc: string[], node: ApprovalGraphNode) => acc.concat(node.targets), []);
    return nodes.filter(node => rootNodeTargetIds.includes(node.id));
}
