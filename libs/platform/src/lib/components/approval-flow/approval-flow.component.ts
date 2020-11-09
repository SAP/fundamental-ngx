import { Component, Input, OnInit } from '@angular/core';

import { ApprovalDataSource, ApprovalNode, ApprovalProcess, UserDataSource } from './interfaces';

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
    _nodeTree: ApprovalNode[][];

    constructor() {
    }

    ngOnInit(): void {
        this.dataSource.fetch().subscribe(approvalProcess => {
            // const tree: ApprovalNode[][] = [];
            const nodesMap: any = {};
            this._approvalProcess = approvalProcess;
            console.log('approvalProcess', approvalProcess);
            const { nodes } = approvalProcess;
            nodes.forEach(node => nodesMap[node.id] = node);
            console.log('nodesMap', nodesMap);
            this._nodeTree = buildNodeTree(nodes);
            console.log('tree', this._nodeTree);
            // nodes.forEach(node => {
            //
            // });
        });
    }

}

function findRootNode(nodes: ApprovalNode[]): ApprovalNode {
    return nodes.find(node => nodes.every(n => !n.targets.includes(node.id)));
}

function findDependentNodes(rootNodes: ApprovalNode[], nodes: ApprovalNode[]): ApprovalNode[] {
    const rootNodeTargetIds: string[] = [];
    rootNodes.forEach(node => rootNodeTargetIds.push(...node.targets));

    return nodes.filter(node => rootNodeTargetIds.includes(node.id));
}

function buildNodeTree(nodes: ApprovalNode[]): ApprovalNode[][] {
    const tree: ApprovalNode[][] = [];
    const rootNode = findRootNode(nodes);
    if (!rootNode) {
        return tree;
    }
    
    tree[0] = [rootNode];
    let index = 1;
    let foundLastStep = false;
    do {
        const dependentNodes = findDependentNodes(tree[index - 1], nodes);
        foundLastStep = dependentNodes.length === 0;
        if (foundLastStep) {
            break;
        }

        tree[index] = dependentNodes;
        index++;
    } while (!foundLastStep);

    // tree[1] = findDependentNodes([rootNode], nodes);
    // tree[2] = findDependentNodes(tree[1], nodes);
    // tree[3] = findDependentNodes(tree[2], nodes);
    // tree[4] = findDependentNodes(tree[3], nodes);

    return tree;
}
