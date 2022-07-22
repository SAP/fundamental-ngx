import { ApprovalStatus } from './approval-status';
import { ApprovalUser } from './approval-user';

export interface ApprovalNode {
    id: string;
    name: string;
    description?: string;
    approvers: ApprovalUser[];
    status: ApprovalStatus;
    targets: string[];
    dueDate?: Date;
    createDate?: Date;
    approvalTeamId?: string;
    variousTeams?: boolean;
    isEveryoneApprovalNeeded?: boolean;
    disableActions?: boolean;
    actionsConfig?: ApprovalNodeActionsConfig;
}

/** Blank - node used as connection between common nodes
 * Space - node used to visually represent space in the graph
 */
export type ApprovalGraphNode = ApprovalNode & {
    blank?: boolean;
    space?: boolean;
    selected?: boolean;
    colIndex?: number;
};

export interface ApprovalGraphNodeMetadata {
    parents: ApprovalGraphNode[];
    isRoot: boolean;
    isFinal: boolean;
    parallelStart: boolean;
    parallelEnd: boolean;
    isLastInParallel?: boolean;
    isFirstInParallel?: boolean;
    columnIndex?: number;
    nodeIndex?: number;
    canAddNodeBefore?: boolean;
    canAddNodeBeforeAll?: boolean;
    canAddNodeAfter?: boolean;
    canAddNodeAfterAll?: boolean;
    canAddParallel?: boolean;
    renderAddNodeAfterButton?: boolean;
    renderVerticalLineBefore?: boolean;
    renderVerticalLineAfter?: boolean;
    isVerticalLineBeforeSolid?: boolean;
    isVerticalLineAfterSolid?: boolean;
    firstOfMultipleRootNodes?: boolean;
    firstOfMultipleFinalNodes?: boolean;
    rootNodesApproved?: boolean;
}

export interface ApprovalNodeActionsConfig {
    disableAddBefore?: boolean;
    disableAddAfter?: boolean;
    disableAddParallel?: boolean;
    disableEdit?: boolean;
    disableRemove?: boolean;
}
