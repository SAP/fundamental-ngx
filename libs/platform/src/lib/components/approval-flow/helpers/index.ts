import { ApprovalNode, ApprovalUser } from '../interfaces';

export function isNodeApproved(node: ApprovalNode): boolean {
    return node.status === 'approved';
}

export function displayUserFn(user: ApprovalUser): string {
    return user.name;
}
