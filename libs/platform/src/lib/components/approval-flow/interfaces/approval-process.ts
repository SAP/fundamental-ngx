import { ApprovalUser } from './approval-user';
import { ApprovalNode } from './approval-node';

export interface ApprovalProcess {
    watchers: ApprovalUser[];
    nodes: ApprovalNode[];
}
