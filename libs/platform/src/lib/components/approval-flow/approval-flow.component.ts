import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnInit, TemplateRef,
    ViewChild
} from '@angular/core';

import { ApprovalDataSource, ApprovalNode, ApprovalProcess, User, UserDataSource } from './interfaces';
import { DialogService, MessageToastService } from '@fundamental-ngx/core';
import { ApprovalFlowUserDetailsComponent } from './approval-flow-user-details/approval-flow-user-details.component';

type ApprovalGraphNode = ApprovalNode & { parent?: ApprovalNode, blank?: true };
type ApprovalFlowGraph = { nodes: ApprovalGraphNode[], index?: number, isPartial?: boolean }[];

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
    // /** Data source used for selecting approvers, and getting user details. */
    // @Input() approverDataSource: UserDataSource;
    //
    // /** Data source used for selecting watchers and getting user details. */
    // @Input() watcherDataSource: UserDataSource;

    _approvalProcess: ApprovalProcess;
    _graph: ApprovalFlowGraph;
    _isCarousel = false;
    _carouselScrollX = 0;
    _carouselStep = 0;
    _maxCarouselStep = 0;

    @ViewChild('graphEl') graphEl: ElementRef;

    constructor(
        private _dialogService: DialogService,
        private _messageToastService: MessageToastService,
        private _cdr: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        this.dataSource.fetch().subscribe(approvalProcess => {
            const nodesMap: any = {};
            this._approvalProcess = approvalProcess;
            const { nodes } = approvalProcess;
            nodes.forEach(node => nodesMap[node.id] = node);
            console.log('nodesMap', nodesMap);
            this._graph = buildNodeTree(nodes);
            console.log('tree', this._graph);
            this._cdr.detectChanges();
            this.checkCarouselStatus();
        });
    }

    checkCarouselStatus(): void {
        this._isCarousel = this.graphEl.nativeElement.scrollWidth > this.graphEl.nativeElement.clientWidth;
        this._maxCarouselStep = Math.ceil(this.scrollDiff / this.carouselStepOffset);
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
            console.log(reminderTargets);
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

    nextSlide(): void {
        this.checkCarouselStatus();
        if (Math.abs(this._carouselScrollX) === this.scrollDiff) {
            return;
        }

        const newOffset = this._carouselScrollX - this.carouselStepOffset;

        if (Math.abs(newOffset) > this.scrollDiff) {
            this._carouselScrollX = -this.scrollDiff;
        } else {
            this._carouselScrollX = newOffset;
        }

        this._carouselStep++;
        this._cdr.detectChanges();
    }

    previousSlide(): void {
        this.checkCarouselStatus();
        if (this._carouselStep === 0) {
            return;
        }
        if (this._carouselStep === 1) {
            this._carouselScrollX = 0;
        } else {
            this._carouselScrollX += this.carouselStepOffset;
        }
        this._carouselStep--;
        this._cdr.detectChanges();
    }

    get carouselStepOffset(): number {
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

    return graph;
}
