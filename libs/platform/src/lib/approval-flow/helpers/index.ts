import { ApprovalGraphNode, ApprovalNode, ApprovalTeam, ApprovalUser } from '../interfaces';
import { ApprovalFlowGraph } from '../approval-flow-graph';

export function isNodeApproved(node: ApprovalNode): boolean {
    return node.status === 'approved';
}

export function isNodeStarted(node: ApprovalNode): boolean {
    return node.status !== 'not started';
}

export function displayTeamFn(team: ApprovalTeam): string {
    return team?.name;
}

export function displayUserFn(user: ApprovalUser): string {
    return user?.name;
}

export function userValueFn(user: ApprovalUser): string {
    return user?.id;
}

export function filterByName(obj: { name: string }, searchString: string): boolean {
    return obj.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1;
}

export function trackByFn(index: number, item: { id: string }): number | string {
    return item?.id ?? index;
}

export function getGraphNodes(graph: ApprovalFlowGraph): ApprovalGraphNode[] {
    return graph.columns.reduce((acc, column) => acc.concat(column.nodes), <ApprovalGraphNode[]>[]);
}

export function getParentNodes(node: ApprovalNode, nodes: ApprovalNode[]): ApprovalNode[] {
    return nodes.filter((_node) => isNodeTargetsIncludeId(_node, node.id));
}

export function getBlankApprovalGraphNode(): ApprovalGraphNode {
    return {
        id: `blankId${(Math.random() * 1000).toFixed()}`,
        name: '',
        targets: [],
        approvers: [],
        status: 'not started',
        blank: true
    };
}

export function getSpaceApprovalGraphNode(): ApprovalGraphNode {
    return {
        id: `spaceId${(Math.random() * 1000).toFixed()}`,
        name: '',
        targets: [],
        approvers: [],
        status: 'not started',
        space: true
    };
}

export function isNodeTargetsIncludeId(node: ApprovalNode, id: string): boolean {
    return node.targets.includes(id);
}
