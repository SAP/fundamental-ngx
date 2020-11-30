import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnInit,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewChildren
} from '@angular/core';

import { DialogService, KeyUtil, MessageToastService } from '@fundamental-ngx/core';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';

import { ApprovalDataSource, ApprovalNode, ApprovalProcess, User } from './interfaces';
import { ApprovalFlowUserDetailsComponent } from './approval-flow-user-details/approval-flow-user-details.component';
import { ApprovalFlowNodeComponent } from './approval-flow-node/approval-flow-node.component';

type ApprovalGraphNode = ApprovalNode & { parent?: ApprovalNode, blank?: true };

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

    _approvalProcess: ApprovalProcess;
    _graph: ApprovalFlowGraph;
    _isCarousel = false;
    _carouselScrollX = 0;
    _carouselStep = 0;
    _maxCarouselStep = 0;
    _nodesMap: { [key: string]: ApprovalGraphNode } = {};

    @ViewChild('graphEl') graphEl: ElementRef;
    @ViewChildren(ApprovalFlowNodeComponent) nodeComponents: QueryList<ApprovalFlowNodeComponent>;

    constructor(
        private _dialogService: DialogService,
        private _messageToastService: MessageToastService,
        private _cdr: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        this.dataSource.fetch().subscribe(approvalProcess => {
            this._approvalProcess = approvalProcess;
            const { nodes } = approvalProcess;
            nodes.forEach(node => this._nodesMap[node.id] = node);
            console.log('nodesMap', this._nodesMap);
            this._graph = buildNodeTree(nodes);
            console.log('tree', this._graph);
            this._cdr.detectChanges();
            this.checkCarouselStatus();
        });
    }

    checkCarouselStatus(): void {
        this._isCarousel = this.graphEl.nativeElement.scrollWidth > this.graphEl.nativeElement.clientWidth;
        this._maxCarouselStep = Math.ceil(this.scrollDiff / this.carouselStepSize);
        this._cdr.detectChanges();
    }

    onNodeClick(node: ApprovalNode): void {
        console.log('open dialog', node);
        const dialogRef = this._dialogService.open(ApprovalFlowUserDetailsComponent, {
            data: {
                node: node,
                approvalFlowDataSource: this.dataSource,
                userDetailsTemplate: this.userDetailsTemplate
            },
            responsivePadding: true
        });
        dialogRef.afterClosed.subscribe((reminderTargets) => {
            console.log('send reminder to', reminderTargets);
            if (Array.isArray(reminderTargets)) {
                this.sendReminders(reminderTargets, node);
            }
        });
    }

    onWatcherClick(watcher: User): void {
        console.log('open dialog', watcher);
        this._dialogService.open(ApprovalFlowUserDetailsComponent, {
            data: {
                watcher: watcher,
                approvalFlowDataSource: this.dataSource,
                userDetailsTemplate: this.userDetailsTemplate
            },
            responsivePadding: true
        });


    }

    sendReminders(targets: User[], node: ApprovalNode): void {
        this.dataSource.sendReminders(targets, node);
        const content = `Reminder has been sent to ${targets.length === 1 ? targets[0].name : targets.length + ' users'}`;
        this._messageToastService.open(content, {
            duration: 5000
        });
    }

    nextSlide(stepSize = 1): void {
        console.log(`nextSlide(), step size = ${stepSize}`);
        this.checkCarouselStatus();
        if (Math.abs(this._carouselScrollX) === this.scrollDiff) {
            console.log('current scroll > scrollDiff(scrollW - clientW), abort going to next slide');
            return;
        }

        const newOffset = this._carouselScrollX - this.carouselStepSize * stepSize;
        this._carouselScrollX = (Math.abs(newOffset) > this.scrollDiff) ? -this.scrollDiff : newOffset;
        const newCarouselStep = this._carouselStep + stepSize;
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

        const getNextHorizontalNode = (_ni, _ci, direction: 'left' | 'right', count = 1) => {
            const indexDiff = (direction === 'right' ? 1 : -1);
            const _column = this._graph[_ci + indexDiff];
            if (!_column) {
                return { nextNode: undefined, count: count };
            }

            const _nextNode = _column.nodes[_ni] || _column.nodes[0];
            if (_nextNode.blank) {
                return getNextHorizontalNode(_ni, _ci + indexDiff, direction, count + 1);
            }

            return { nextNode: _nextNode, count: count };
        };

        const getNextVerticalNode = (_ni, _ci, direction: 'up' | 'down', count = 1) => {
            const indexDiff = (direction === 'down' ? 1 : -1);
            const _column = this._graph[_ci];
            if (!_column) {
                return { nextNode: undefined, count: count };
            }

            const _nextNode = _column.nodes[_ni + indexDiff];
            if (_nextNode && _nextNode.blank) {
                console.log('next node is blank');
                return getNextVerticalNode(_ni, _ci + indexDiff, direction, count + 1);
            }

            return { nextNode: _nextNode, count: count };
        };

        event.preventDefault();
        let nextNode: ApprovalGraphNode;
        // let step = 1;
        let res;

        if (KeyUtil.isKeyCode(event, UP_ARROW)) {
            res = getNextVerticalNode(nodeIndex, columnIndex, 'up');
        }

        if (KeyUtil.isKeyCode(event, DOWN_ARROW)) {
            res = getNextVerticalNode(nodeIndex, columnIndex, 'down');
        }

        if (KeyUtil.isKeyCode(event, LEFT_ARROW)) {
            res = getNextHorizontalNode(nodeIndex, columnIndex, 'left');
        }

        if (KeyUtil.isKeyCode(event, RIGHT_ARROW)) {
            res = getNextHorizontalNode(nodeIndex, columnIndex, 'right');
        }

        nextNode = res.nextNode;
        // step = res.count;
        if (nextNode) {
            this.focusNode(nextNode, { skipSlideChange: KeyUtil.isKeyCode(event, [UP_ARROW, DOWN_ARROW]), step: res.count });
        }
    }

    focusNode(node: ApprovalGraphNode, options: { skipSlideChange: boolean; step: number }): void {
        const nodeToFocus = this.nodeComponents.find(component => component.node === node);
        if (!nodeToFocus) {
            return;
        }

        const nodeRect = nodeToFocus.nativeElement.getBoundingClientRect();
        const graphRect = this.graphEl.nativeElement.getBoundingClientRect();
        console.log('rect', nodeRect, 'container rect', graphRect);
        const totalOffset = nodeRect.left + nodeRect.width;
        const diff = Math.abs(totalOffset - graphRect.right);

        nodeToFocus.focus();
        if (options.skipSlideChange) {
            console.log('skipping slide change');
            return;
        }

        if (((nodeRect.left - graphRect.left) + nodeRect.width) > (graphRect.width + Math.abs(this._carouselScrollX))) {
            console.log(`calling nextSlide, totalOffset = ${totalOffset}, diff = ${diff}, step = ${options.step}`);
            this.nextSlide(options.step);
            return;
        }

        if (totalOffset < graphRect.right) {
            console.log(`calling prevSlide, totalOffset = ${totalOffset}, diff = ${diff}`);
            this.previousSlide((diff < nodeRect.width) ? 1 : 2);
        }
    }

    get carouselStepSize(): number {
        return this.graphEl.nativeElement.scrollWidth / this.graphEl.nativeElement.children.length;
    }

    get scrollDiff(): number {
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

function buildNodeTree(nodes: ApprovalGraphNode[]): ApprovalFlowGraph {
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
            _dependentNodes.forEach(dependentNode => (dependentNode as ApprovalGraphNode).parent = node);
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
            // console.log('found mixed column', dependentNodes);
            const nodesWithBlankSpaces: ApprovalGraphNode[] = [...dependentNodes];
            nodesWithBlankSpaces.forEach((node, i) => {
                if (nodesWithTarget.includes(node as ApprovalNode)) {
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
            graph[index] = { nodes: nodesWithBlankSpaces as ApprovalNode[], isPartial: true };
            graph[index + 1] = { nodes: nodesWithTarget as ApprovalNode[] };
            index += 2;
        } else {
            graph[index] = { nodes: dependentNodes as ApprovalNode[] };
            index++;
        }
    } while (!foundLastStep);

    graph.forEach(column => {
        column.allNodesApproved = column.nodes.every(node => node.status === 'approved');
    });

    return graph;
}
