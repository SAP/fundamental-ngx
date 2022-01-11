import { ApprovalUser } from './approval-user';
import { ApprovalNode } from './approval-node';

export interface SendRemindersData {
    users: ApprovalUser[];
    node: ApprovalNode;
}
