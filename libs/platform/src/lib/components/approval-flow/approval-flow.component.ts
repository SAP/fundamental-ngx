import { Component, Input, OnInit } from '@angular/core';

import { ApprovalDataSource, ApprovalNode, ApprovalProcess, User, UserDataSource } from './interfaces';
import { DialogService, MessageToastService } from '@fundamental-ngx/core';
import { ApprovalFlowUserDetailsComponent } from './approval-flow-user-details/approval-flow-user-details.component';

type ApprovalGraphNode = ApprovalNode & { parent?: ApprovalNode, blank?: true };
type ApprovalFlowGraph = { nodes: ApprovalGraphNode[], index?: number, isPartial?: boolean }[];

@Component({
    selector: 'fdp-approval-flow',
    templateUrl: './approval-flow.component.html',
    styleUrls: ['./approval-flow.component.scss']
})
export class ApprovalFlowComponent implements OnInit {
    /** Title which is displayed in the header of the Approval Flow component. */
    @Input() title = 'Approval  process';

    /** Data source for the Approval Flow component. */
    @Input() dataSource: ApprovalDataSource;

    /** Data source used for selecting approvers, and getting user details. */
    @Input() approverDataSource: UserDataSource;

    /** Data source used for selecting watchers and getting user details. */
    @Input() watcherDataSource: UserDataSource;

    _approvalProcess: ApprovalProcess;
    _approvalFlowGraph: ApprovalFlowGraph;

    constructor(private _dialogService: DialogService, private _messageToastService: MessageToastService) {
    }

    ngOnInit(): void {
        this.dataSource.fetch().subscribe(approvalProcess => {
            const nodesMap: any = {};
            this._approvalProcess = approvalProcess;
            console.log('approvalProcess', approvalProcess);
            const { nodes } = approvalProcess;
            nodes.forEach(node => nodesMap[node.id] = node);
            console.log('nodesMap', nodesMap);
            this._approvalFlowGraph = buildNodeTree(nodes);
            console.log('tree', this._approvalFlowGraph);
        });
    }

    onNodeClick(node: ApprovalNode): void {
        console.log('open dialog', node);
        const dialogRef = this._dialogService.open(ApprovalFlowUserDetailsComponent, {
            data: {
                node: node
            },
            responsivePadding: true
        });
        dialogRef.afterClosed.subscribe((result) => {
            console.log(result);
            if (Array.isArray(result)) {
                this.sendReminders(result, node);
            }
        });
    }

    onWatcherClick(watcher: User): void {
        console.log('open dialog', watcher);
        this._dialogService.open(ApprovalFlowUserDetailsComponent, {
            data: {
                watcher: watcher
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
            console.log('found mixed column', dependentNodes);
            const nodesWithBlankSpaces: ApprovalGraphNode[] = [...dependentNodes];
            nodesWithBlankSpaces.forEach((node, i) => {
                if (nodesWithTarget.includes(node as ApprovalNode)) {
                    nodesWithBlankSpaces[i] = { id: '', name: '', targets: [], approvers: [], status: 'not started',  blank: true };
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
