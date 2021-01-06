import { ApprovalNode } from '../interfaces';

export function isNodeApproved(node: ApprovalNode): boolean {
    return node.status === 'approved';
}
