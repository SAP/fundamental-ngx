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
}
