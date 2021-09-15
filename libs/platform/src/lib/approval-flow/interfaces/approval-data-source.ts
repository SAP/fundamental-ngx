import { Observable } from 'rxjs';
import { ApprovalProcess } from './approval-process';
import { ApprovalNode } from './approval-node';
import { ApprovalUser } from './approval-user';
import { ApprovalTeam } from './approval-team';

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
     * Fetch users list to be used in "edit approvers" flow.
     */
    fetchApprovers(): Observable<ApprovalUser[]>;

    /**
     * Fetch users list to be used in "edit watchers" flow.
     */
    fetchWatchers(): Observable<ApprovalUser[]>;

    /**
     * Fetch teams list to be used in "add node" flow.
     */
    fetchTeams(): Observable<ApprovalTeam[]>;

    /**
     * Update watcher list. Called whenever there is a change
     * to the watcher list.
     */
    updateWatchers(watchers: ApprovalUser[]): void;

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
    sendReminders(members: ApprovalUser[], approval: ApprovalNode): Observable<any>;
}
