import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnInit, Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewChildren,
    EventEmitter
} from '@angular/core';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';

import { DialogService, KeyUtil, MessageToastService } from '@fundamental-ngx/core';

import { ApprovalDataSource, ApprovalNode, ApprovalProcess, User } from './interfaces';
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
export class ApprovalFlowComponent implements OnInit {
    /** Title which is displayed in the header of the Approval Flow component. */
    @Input() title = 'Approval  process';

    /** Data source for the Approval Flow component. */
    @Input() dataSource: ApprovalDataSource;

    /** A reference to the user details template */
    @Input() userDetailsTemplate: TemplateRef<any>;

    /** Event emitted on approval flow node click. */
    @Output() nodeClick = new EventEmitter<ApprovalNode>();

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
    _nodesMap: { [key: string]: ApprovalGraphNode } = {};

    /** @hidden */
    _nodeParentsMap: { [key: string]: ApprovalGraphNode } = {};

    /** @hidden */
    @ViewChild('graphEl') graphEl: ElementRef;

    /** @hidden */
    @ViewChildren(ApprovalFlowNodeComponent) nodeComponents: QueryList<ApprovalFlowNodeComponent>;

    /** @hidden */
    constructor(
        private _dialogService: DialogService,
        private _messageToastService: MessageToastService,
        private _cdr: ChangeDetectorRef
    ) {
    }

    /** @hidden */
    ngOnInit(): void {
        this.dataSource.fetch().subscribe(approvalProcess => {
            this._approvalProcess = approvalProcess;
            approvalProcess.nodes.forEach(node => this._nodesMap[node.id] = node);
            this._graph = this.buildNodeTree(approvalProcess.nodes);
            this._cdr.detectChanges();
            this.checkCarouselStatus();
        });
    }

    onNodeClick(node: ApprovalNode): void {
        const dialogRef = this._dialogService.open(ApprovalFlowUserDetailsComponent, {
            data: {
                node: node,
                approvalFlowDataSource: this.dataSource,
                userDetailsTemplate: this.userDetailsTemplate
            }
        });
        const sub = dialogRef.afterClosed.subscribe((reminderTargets) => {
            sub.unsubscribe();
            if (Array.isArray(reminderTargets)) {
                this.sendReminders(reminderTargets, node);
            }
        });
        this.nodeClick.emit(node);
    }

    onWatcherClick(watcher: User): void {
        this._dialogService.open(ApprovalFlowUserDetailsComponent, {
            data: {
                watcher: watcher,
                approvalFlowDataSource: this.dataSource,
                userDetailsTemplate: this.userDetailsTemplate
            }
        });


    }

    sendReminders(targets: User[], node: ApprovalNode): void {
        this.dataSource.sendReminders(targets, node);
        const reminderMessage = `Reminder has been sent to ${targets.length === 1 ? targets[0].name : (targets.length + ' members of ' + node.description)}`;
        this._messageToastService.open(reminderMessage, {
            duration: 5000
        });
    }

    nextSlide(stepSize = 1): void {
        this.checkCarouselStatus();
        if (Math.abs(this._carouselScrollX) === this.scrollDiff) {
            return;
        }

        const newOffset = this._carouselScrollX - this.carouselStepSize * stepSize;
        const newCarouselStep = this._carouselStep + stepSize;
        this._carouselScrollX = (Math.abs(newOffset) > this.scrollDiff) ? -this.scrollDiff : newOffset;
        this._carouselStep = newCarouselStep <= this._maxCarouselStep ? newCarouselStep : this._maxCarouselStep;
        this._cdr.detectChanges();
    }

    previousSlide(stepSize = 1): void {
        this.checkCarouselStatus();
        if (this._carouselStep === 0) {
            return;
        }
        if (this._carouselStep === 1) {
            this._carouselScrollX = 0;
        } else {
            this._carouselScrollX += this.carouselStepSize * stepSize;
            this._carouselScrollX = this._carouselScrollX <= 0 ? this._carouselScrollX : 0;
        }
        const newCarouselStep = this._carouselStep - stepSize;
        this._carouselStep = newCarouselStep > 0 ? newCarouselStep : 0;
        this._cdr.detectChanges();
    }

    onNodeKeyDown(
        event: KeyboardEvent,
        node: ApprovalGraphNode,
        column: ApprovalGraphColumn,
        nodeIndex: number,
        columnIndex: number
    ): void {
        if (!KeyUtil.isKeyCode(event, [UP_ARROW, DOWN_ARROW, RIGHT_ARROW, LEFT_ARROW])) {
            return;
        }

        event.preventDefault();
        let nextFocusTarget;

        if (KeyUtil.isKeyCode(event, UP_ARROW) && nodeIndex > 0) {
            nextFocusTarget = this.getNextVerticalNode(nodeIndex, columnIndex, 'up');
        }

        if (KeyUtil.isKeyCode(event, DOWN_ARROW)) {
            nextFocusTarget = this.getNextVerticalNode(nodeIndex, columnIndex, 'down');
        }

        if (KeyUtil.isKeyCode(event, LEFT_ARROW)) {
            nextFocusTarget = this.getNextHorizontalNode(nodeIndex, columnIndex, 'left');
        }

        if (KeyUtil.isKeyCode(event, RIGHT_ARROW)) {
            nextFocusTarget = this.getNextHorizontalNode(nodeIndex, columnIndex, 'right');
        }

        if (nextFocusTarget?.nextNode) {
            this.focusNode(
                nextFocusTarget.nextNode,
                {
                    skipSlideChange: KeyUtil.isKeyCode(event, [UP_ARROW, DOWN_ARROW]),
                    step: nextFocusTarget.stepSize
                }
            );
        }
    }

    /** @hidden */
    private buildNodeTree(nodes: ApprovalGraphNode[]): ApprovalFlowGraph {
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
    private focusNode(node: ApprovalGraphNode, options: { skipSlideChange: boolean; step: number }): void {
        const nodeToFocus = this.nodeComponents.find(comp => comp.node === node);
        if (!nodeToFocus) {
            return;
        }

        const nodeRect = nodeToFocus.nativeElement.getBoundingClientRect();
        const graphRect = this.graphEl.nativeElement.getBoundingClientRect();
        const totalOffset = nodeRect.left + nodeRect.width;
        const diff = Math.abs(totalOffset - graphRect.right);

        nodeToFocus.focus();
        if (options.skipSlideChange) {
            return;
        }

        if (((nodeRect.left - graphRect.left) + nodeRect.width) > (graphRect.width + Math.abs(this._carouselScrollX))) {
            this.nextSlide(options.step);
            return;
        }

        if (totalOffset < graphRect.right) {
            this.previousSlide((diff < nodeRect.width) ? 1 : 2);
        }
    }

    /** @hidden */
    private checkCarouselStatus(): void {
        this._isCarousel = this.graphEl.nativeElement.scrollWidth > this.graphEl.nativeElement.clientWidth;
        this._maxCarouselStep = Math.ceil(this.scrollDiff / this.carouselStepSize);
        this._cdr.detectChanges();
    }

    /** @hidden */
    private getNextHorizontalNode = (_ni, _ci, direction: 'left' | 'right', stepSize = 1) => {
        const indexDiff = (direction === 'right' ? 1 : -1);
        const _column = this._graph[_ci + indexDiff];
        if (!_column) {
            return { nextNode: undefined, stepSize: stepSize };
        }

        const _nextNode = _column.nodes[_ni] || _column.nodes[0];
        if (_nextNode.blank) {
            return this.getNextHorizontalNode(_ni, _ci + indexDiff, direction, stepSize + 1);
        }

        return { nextNode: _nextNode, stepSize: stepSize };
    };

    /** @hidden */
    private getNextVerticalNode = (_ni, _ci, direction: 'up' | 'down', stepSize = 1) => {
        const indexDiff = (direction === 'down' ? 1 : -1);
        const _column = this._graph[_ci];
        const _nextColumn = this._graph[_ci + 1];
        const _nextNode = _column.nodes[_ni + indexDiff] || _nextColumn?.nodes[_ni + 1];
        if (_nextNode && _nextNode.blank) {
            return this.getNextVerticalNode(_ni, _ci + indexDiff, direction, stepSize + 1);
        }

        return { nextNode: _nextNode, stepSize: stepSize };
    };

    /** @hidden */
    private get carouselStepSize(): number {
        return this.graphEl.nativeElement.scrollWidth / this.graphEl.nativeElement.children.length;
    }

    /** @hidden */
    private get scrollDiff(): number {
        return this.graphEl.nativeElement.scrollWidth - this.graphEl.nativeElement.clientWidth;
    }
}

function findRootNode(nodes: ApprovalNode[]): ApprovalNode {
    return nodes.find(node => nodes.every(n => !n.targets.includes(node.id)));
}

function findDependentNodes(rootNodes: ApprovalGraphNode[], nodes: ApprovalNode[]): ApprovalNode[] {
    const rootNodeTargetIds: string[] = [];
    rootNodes.forEach(node => rootNodeTargetIds.push(...node.targets));
    return nodes.filter(node => rootNodeTargetIds.includes(node.id));
}
