import { ApprovalGraphNode, ApprovalNode, ApprovalTeam, ApprovalUser } from '../interfaces';
import { ApprovalFlowGraph } from '../approval-flow-graph';

/** @hidden */
export function isNodeApproved(node: ApprovalNode): boolean {
    return node.status === 'approved';
}

/** @hidden */
export function isNodeStarted(node: ApprovalNode): boolean {
    return node.status !== 'not started';
}

/** @hidden */
export function displayTeamFn(team: ApprovalTeam): string {
    return team?.name;
}

/** @hidden */
export function displayUserFn(user: ApprovalUser): string {
    return user?.name;
}

/** @hidden */
export function userValueFn(user: ApprovalUser): string {
    return user?.id;
}

/** @hidden */
export function filterByName(obj: { name: string }, searchString: string): boolean {
    return obj.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1;
}

/** @hidden */
export function trackByFn(index: number, item: { id: string }): number | string {
    return item?.id ?? index;
}

/** @hidden */
export function getGraphNodes(graph: ApprovalFlowGraph): ApprovalGraphNode[] {
    return graph.columns.reduce((acc, column) => acc.concat(column.nodes), <ApprovalGraphNode[]>[]);
}

/** @hidden */
export function getParentNodes(node: ApprovalNode, nodes: ApprovalNode[]): ApprovalNode[] {
    return nodes.filter((_node) => isNodeTargetsIncludeId(_node, node.id));
}

/** @hidden */
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

/** @hidden */
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

/** @hidden */
export function isNodeTargetsIncludeId(node: ApprovalNode, id: string): boolean {
    return node.targets.includes(id);
}
