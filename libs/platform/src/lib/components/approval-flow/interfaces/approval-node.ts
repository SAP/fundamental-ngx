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
}

export type ApprovalGraphNode = ApprovalNode & { blank?: boolean; meta?: any };

export interface ApprovalGraphNodeMetadata {
    parent: ApprovalGraphNode;
    isRoot: boolean;
    isLast: boolean;
    parallelStart: boolean;
    parallelEnd: boolean;
    isParallel: boolean;
    isLastInParallel?: boolean;
    columnIndex?: number;
    nodeIndex?: number;
    prevVNode?: ApprovalGraphNode;
    nextVNode?: ApprovalGraphNode;
    prevHNode?: ApprovalGraphNode;
    nextHNode?: ApprovalGraphNode;
    canAddNodeBefore?: boolean;
    canAddNodeAfter?: boolean;
    canAddParallel?: boolean;
    canDelete?: boolean;
}
