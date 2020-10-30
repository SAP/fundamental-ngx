import { User } from './user';
import { ApprovalNode } from './approval-node';

export interface ApprovalProcess {
    watchers: User[];
    nodes: ApprovalNode[];
}
