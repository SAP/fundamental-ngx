import { ApprovalNode } from './approval-node';
import { ApprovalUser } from './approval-user';

export interface SendRemindersData {
    users: ApprovalUser[];
    node: ApprovalNode;
}
