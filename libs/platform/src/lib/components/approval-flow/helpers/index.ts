import { ApprovalNode, ApprovalUser } from '../interfaces';

export function isNodeApproved(node: ApprovalNode): boolean {
    return node.status === 'approved';
}

export function displayUserFn(user: ApprovalUser): string {
    return user.name;
}

export function filterByName(obj: { name: string }, searchString: string): boolean {
    return obj.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1;
}

export function trackByFn(index: number, item: { id: string }): number | string {
    if (item.id) {
        return item.id;
    }

    return index;
}
