import { ApprovalDataSource, ApprovalNode, ApprovalProcess, User } from '@fundamental-ngx/platform';
import { Observable, of } from 'rxjs';

const simplestGraph: ApprovalProcess = {
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
        },
        {
            id: 'string',
            name: 'Renee Miles',
            description: 'Legal team',
            imgUrl: ''
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
            targets: ['ID2'],
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
            targets: ['ID3'],
            dueDate: new Date(),
            createDate: new Date()
        },
        {
            id: 'ID3',
            name: 'node name',
            description: 'node description',
            approvers: [{
                id: 'string',
                name: 'Julie Peters',
                description: 'Marketing team',
                imgUrl: 'https://randomuser.me/api/portraits/women/77.jpg'
            }],
            status: 'in progress',
            targets: ['ID4'],
            dueDate: new Date(),
            createDate: new Date()
        },
        {
            id: 'ID4',
            name: 'node name',
            description: 'node description',
            approvers: [{
                id: 'string',
                name: 'Fred Gibson',
                description: 'Marketing team',
                imgUrl: 'https://randomuser.me/api/portraits/men/45.jpg'
            }],
            status: 'not started',
            targets: [],
            dueDate: new Date(),
            createDate: new Date()
        }
    ]
};

const twoNodesGraph: ApprovalProcess = {
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
        },
        {
            id: 'string',
            name: 'Renee Miles',
            description: 'Legal team',
            imgUrl: ''
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
            targets: ['ID2'],
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
            targets: [],
            dueDate: new Date(),
            createDate: new Date()
        }
    ]
};

const mediumComplexityGraph: ApprovalProcess = {
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
        },
        {
            id: 'string',
            name: 'Renee Miles',
            description: 'Legal team',
            imgUrl: ''
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
            targets: ['ID2', 'ID22', 'ID222'],
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
            targets: ['ID3'],
            dueDate: new Date(),
            createDate: new Date()
        },
        {
            id: 'ID22',
            name: 'node name',
            description: 'node description',
            approvers: [{
                id: 'string',
                name: 'Salvador Duncan',
                description: 'Marketing team',
                imgUrl: 'https://randomuser.me/api/portraits/men/14.jpg'
            }],
            status: 'approved',
            targets: [],
            dueDate: new Date(),
            createDate: new Date()
        },
        {
            id: 'ID222',
            name: 'node name',
            description: 'Marketing',
            approvers: [
                {
                    id: 'string',
                    name: 'Caleb Taylor',
                    description: 'Marketing team',
                    imgUrl: 'https://randomuser.me/api/portraits/men/17.jpg'
                },
                {
                    id: 'string',
                    name: 'Elaine Myers',
                    description: 'Legal team',
                    imgUrl: 'https://randomuser.me/api/portraits/women/75.jpg'
                }
            ],
            status: 'in progress',
            targets: [],
            dueDate: new Date(),
            createDate: new Date()
        },
        {
            id: 'ID3',
            name: 'node name',
            description: 'node description',
            approvers: [{
                id: 'string',
                name: 'Julie Peters',
                description: 'Marketing team',
                imgUrl: 'https://randomuser.me/api/portraits/women/77.jpg'
            }],
            status: 'in progress',
            targets: ['ID4'],
            dueDate: new Date(),
            createDate: new Date()
        },
        {
            id: 'ID4',
            name: 'node name',
            description: 'node description',
            approvers: [{
                id: 'string',
                name: 'Fred Gibson',
                description: 'Marketing team',
                imgUrl: 'https://randomuser.me/api/portraits/men/45.jpg'
            }],
            status: 'not started',
            targets: [],
            dueDate: new Date(),
            createDate: new Date()
        }
    ]
};

const complexGraph: ApprovalProcess = {
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
        },
        {
            id: 'string',
            name: 'Renee Miles',
            description: 'Legal team',
            imgUrl: ''
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
            targets: ['ID2', 'ID22', 'ID222'],
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
            targets: ['ID3'],
            dueDate: new Date(),
            createDate: new Date()
        },
        {
            id: 'ID22',
            name: 'node name',
            description: 'node description',
            approvers: [{
                id: 'string',
                name: 'Salvador Duncan',
                description: 'Marketing team',
                imgUrl: 'https://randomuser.me/api/portraits/men/14.jpg'
            }],
            status: 'approved',
            targets: ['ID22-dep'],
            dueDate: new Date(),
            createDate: new Date()
        },
        {
            id: 'ID222',
            name: 'node name',
            description: 'Marketing',
            approvers: [
                {
                    id: 'string',
                    name: 'Caleb Taylor',
                    description: 'Marketing team',
                    imgUrl: 'https://randomuser.me/api/portraits/men/17.jpg'
                },
                {
                    id: 'string',
                    name: 'Elaine Myers',
                    description: 'Legal team',
                    imgUrl: 'https://randomuser.me/api/portraits/women/75.jpg'
                }
            ],
            status: 'in progress',
            targets: ['ID222-dep'],
            dueDate: new Date(),
            createDate: new Date()
        },
        {
            id: 'ID22-dep',
            name: 'node name',
            description: 'node description',
            approvers: [{
                id: 'string',
                name: 'George Carter',
                description: 'Marketing team',
                imgUrl: 'https://randomuser.me/api/portraits/men/85.jpg'
            }],
            status: 'approved',
            targets: [],
            dueDate: new Date(),
            createDate: new Date()
        },
        {
            id: 'ID222-dep',
            name: 'node name',
            description: 'Marketing',
            approvers: [
                {
                    id: 'string',
                    name: 'Lillian Walker',
                    description: 'Marketing team',
                    imgUrl: 'https://randomuser.me/api/portraits/women/25.jpg'
                }
            ],
            status: 'not started',
            targets: [],
            dueDate: new Date(),
            createDate: new Date()
        },
        {
            id: 'ID3',
            name: 'node name',
            description: 'node description',
            approvers: [{
                id: 'string',
                name: 'Julie Peters',
                description: 'Marketing team',
                imgUrl: 'https://randomuser.me/api/portraits/women/77.jpg'
            }],
            status: 'not started',
            targets: ['ID4'],
            dueDate: new Date(),
            createDate: new Date()
        },
        {
            id: 'ID4',
            name: 'node name',
            description: 'node description',
            approvers: [{
                id: 'string',
                name: 'Fred Gibson',
                description: 'Marketing team',
                imgUrl: 'https://randomuser.me/api/portraits/men/45.jpg'
            }],
            status: 'not started',
            targets: [],
            dueDate: new Date(),
            createDate: new Date()
        }
    ]
};

export class ApprovalFlowExampleDataSource implements ApprovalDataSource {
    /**
     * Fetch of approval process data.
     */
    fetch(): Observable<ApprovalProcess> {
        // return of(twoNodesGraph);
        // return of(simplestGraph);
        return of(mediumComplexityGraph);
        // return of(complexGraph);
    }

    /**
     * Update watcher list. Called whenever there is a change
     * to the watcher list.
     */
    updateWatchers(watchers: User[]): void {

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
    sendReminders(members: User[], approval: ApprovalNode): void {

    }
}
