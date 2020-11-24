import { Observable } from 'rxjs';
import { ApprovalProcess } from './approval-process';
import { ApprovalNode } from './approval-node';
import { User } from './user';

export interface ApprovalDataSource {

    /**
     * Fetch of approval process data.
     */
    fetch(): Observable<ApprovalProcess>;

    /**
     * Fetch of user data.
     */
    fetchUser(id: string): Observable<any>;

    /**
     * Update watcher list. Called whenever there is a change
     * to the watcher list.
     */
    updateWatchers(watchers: User[]): void;

    /**
     * Update approval details. Called whenever there is a
     * change to the approval detail: change name, change
     * description,, change approvers.
     */
    updateApproval(approval: ApprovalNode): void;

    /**
     * Update approvals. Called whenever there is a change to
     * the approval node graph structure: add node, delete node
     * move node.
     */
    updateApprovals(approvals: ApprovalNode[]): void;

    /**
     * Send reminders for an approval.
     */
    sendReminders(members: User[], approval: ApprovalNode): void;

}
