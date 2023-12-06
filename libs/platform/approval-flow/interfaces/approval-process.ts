import { ApprovalNode } from './approval-node';
import { ApprovalUser } from './approval-user';

export interface ApprovalProcess {
    watchers: ApprovalUser[];
    nodes: ApprovalNode[];
}
