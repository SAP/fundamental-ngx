import { ApprovalFlowGraph } from '../approval-flow-graph';
import { ApprovalGraphNode, ApprovalNode, ApprovalTeam, ApprovalUser } from '../interfaces';

/** @ignore */
export function isNodeApproved(node: ApprovalNode): boolean {
    return node.status === 'approved';
}

/** @ignore */
export function isNodeStarted(node: ApprovalNode): boolean {
    return node.status !== 'not started';
}

/** @ignore */
export function displayTeamFn(team: ApprovalTeam): string {
    return team?.name;
}

/** @ignore */
export function displayUserFn(user: ApprovalUser): string {
    return user?.name;
}

/** @ignore */
export function userValueFn(user: ApprovalUser): string {
    return user?.id;
}

/** @ignore */
export function filterByName(obj: { name: string }, searchString: string): boolean {
    return obj.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1;
}

/** @ignore */
export function trackByFn(index: number, item: { id: string }): number | string {
    return item?.id ?? index;
}

/** @ignore */
export function getGraphNodes(graph: ApprovalFlowGraph): ApprovalGraphNode[] {
    return graph.columns.reduce((acc, column) => acc.concat(column.nodes), <ApprovalGraphNode[]>[]);
}

/** @ignore */
export function getParentNodes(node: ApprovalNode, nodes: ApprovalNode[]): ApprovalNode[] {
    return nodes.filter((_node) => isNodeTargetsIncludeId(_node, node.id));
}

/** @ignore */
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

/** @ignore */
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

/** @ignore */
export function isNodeTargetsIncludeId(node: ApprovalNode, id: string): boolean {
    return node.targets.includes(id);
}
