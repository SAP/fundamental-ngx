import { ApprovalStatus } from './approval-status';
import { User } from './user';

export interface ApprovalNode {
    id: string;
    name: string;
    description?: string;
    approvers: User[];
    status: ApprovalStatus;
    targets: string[];     // IDs of dependent ApprovalNodes
    dueDate?: Date;
    createDate?: Date;
}
