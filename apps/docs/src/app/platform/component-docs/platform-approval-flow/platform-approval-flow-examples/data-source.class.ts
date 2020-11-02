import { ApprovalDataSource, ApprovalNode, ApprovalPerson, ApprovalProcess } from '@fundamental-ngx/platform';
import { Observable, of } from 'rxjs';
import { ApprovalStatus } from '../../../../../../../../libs/platform/src/lib/components/approval-flow/interfaces/approval-status';
import { User } from '../../../../../../../../libs/platform/src/lib/components/approval-flow/interfaces/user';

// export type ApprovalStatus = 'approved' | 'rejected' | 'in progress' | 'not started';

export class ApprovalFlowExampleDataSource implements ApprovalDataSource {
    /**
     * Fetch of approval process data.
     */
    fetch(): Observable<ApprovalProcess> {
        return of({
            watchers: [
                {
                    id: 'string',
                    name: 'Luis Franklin',
                    description: 'Legal team',
                    imgUrl: 'https://randomuser.me/api/portraits/men/91.jpg'
                },
                {
                    id: 'string',
                    name: 'Renee Miles',
                    description: 'Legal team',
                    imgUrl: 'https://randomuser.me/api/portraits/women/11.jpg'
                }
            ],
            nodes: [
                {
                    id: 'ID1',
                    name: 'node name',
                    description: 'node description',
                    approvers: [{
                        id: 'string',
                        name: 'Emma Cole',
                        description: 'Marketing team',
                        imgUrl: 'https://randomuser.me/api/portraits/women/91.jpg'
                    }],
                    status: 'approved',
                    targets: [''],
                    dueDate: new Date(),
                    createDate: new Date()
                },
                {
                    id: 'ID2',
                    name: 'node name',
                    description: 'node description',
                    approvers: [{
                        id: 'string',
                        name: 'Daniel Sullivan',
                        description: 'Marketing team',
                        imgUrl: 'https://randomuser.me/api/portraits/men/9.jpg'
                    }],
                    status: 'in progress',
                    targets: [''],
                    dueDate: new Date(),
                    createDate: new Date()
                }
            ]
        });
    }

    /**
     * Update watcher list. Called whenever there is a change
     * to the watcher list.
     */
    updateWatchers(watchers: ApprovalPerson[]): void {

    }

    /**
     * Update approval details. Called whenever there is a
     * change to the approval detail: change name, change
     * description,, change approvers.
     */
    updateApproval(approval: ApprovalNode): void {

    }

    /**
     * Update approvals. Called whenever there is a change to
     * the approval node graph structure: add node, delete node
     * move node.
     */
    updateApprovals(approvals: ApprovalNode[]): void {

    }

    /**
     * Send reminders for an approval.
     */
    sendReminders(members: ApprovalPerson[], approval: ApprovalNode): void {

    }
}
