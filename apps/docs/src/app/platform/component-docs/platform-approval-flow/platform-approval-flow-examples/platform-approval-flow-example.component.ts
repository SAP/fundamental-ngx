import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

import {
    ApprovalDataSource,
    ApprovalFlowComponent,
    ApprovalNode,
    ApprovalNodeActionsConfig,
    ApprovalProcess,
    ApprovalStatus,
    ApprovalTeam,
    ApprovalUser
} from '@fundamental-ngx/platform/approval-flow';

@Component({
    selector: 'fdp-platform-approval-flow-example',
    templateUrl: './platform-approval-flow-example.component.html'
})
export class PlatformApprovalFlowExampleComponent implements OnDestroy {
    /** @hidden */
    @ViewChild(ApprovalFlowComponent)
    _approvalFlow: ApprovalFlowComponent;

    dataSource = new ApprovalFlowExampleDataSource('complex');
    examples = ['empty', 'simple', 'medium', 'complex'];
    selectedExample = 'complex';
    checkDueDate = false;
    setNotStartedStatuses = false;
    editModeEnabled = true;
    nodeActionsDisabled = false;
    nodeActionsConfig: ApprovalNodeActionsConfig = {
        disableAddBefore: false,
        disableAddAfter: false,
        disableAddParallel: false,
        disableEdit: false,
        disableRemove: false
    };
    nodeActionsConfigForNewNodes: ApprovalNodeActionsConfig = {
        disableAddBefore: false,
        disableAddAfter: false,
        disableAddParallel: false
    };
    allStatuses = ['in progress', 'not started', 'approved', 'rejected'];
    sendReminderStatuses: ApprovalStatus[] = ['in progress', 'not started'];

    /** @hidden */
    disableSaveButton = false;

    /** @hidden */
    disableExitButton = false;

    private _subscriptions = new Subscription();

    /** @hidden */
    private newNodes: ApprovalNode[] = [];

    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    toggleNodeActions(state: boolean): void {
        this._subscriptions.add(undefined);

        this._subscriptions.add(
            this.dataSource
                .fetch()
                .pipe(take(1))
                .subscribe((approvalGraph) => {
                    approvalGraph.nodes.forEach((node) => {
                        node.disableActions = state;
                    });

                    this.dataSource.updateApprovals(approvalGraph.nodes);
                })
        );
    }

    toggleSpecificNodeAction(field: keyof ApprovalNodeActionsConfig, state: boolean): void {
        this._subscriptions.add(
            this.fetchOneFromDatasource().subscribe((approvalGraph) => {
                approvalGraph.nodes.forEach((node) => {
                    node.actionsConfig = {
                        ...node.actionsConfig,
                        [field]: state
                    };
                });

                this.dataSource.updateApprovals(approvalGraph.nodes);
            })
        );
    }

    newNodeSettingsChange(): void {
        this._subscriptions.add(
            this.fetchOneFromDatasource().subscribe((approvalGraph) => {
                approvalGraph.nodes.forEach((node) => {
                    if (this.newNodes.find((newNode) => newNode.id === node.id)) {
                        const meta = this._approvalFlow.getNodeMetadataByNodeId(node.id);

                        meta.canAddNodeAfter = !this.nodeActionsConfigForNewNodes.disableAddAfter;
                        meta.canAddNodeBefore = !this.nodeActionsConfigForNewNodes.disableAddBefore;
                        meta.canAddParallel = !this.nodeActionsConfigForNewNodes.disableAddParallel;
                    }
                });
            })
        );
    }

    nodeClick(node: ApprovalNode): void {
        console.log('Node click handler', node);
    }

    /** Event listener for afterNodeAdd event */
    afterNodeAdd(node: ApprovalNode): void {
        this.newNodes.push(node);

        this.newNodeSettingsChange();
    }

    /** Event listener for afterNodeEdit event */
    afterNodeEdit(): void {
        this.newNodeSettingsChange();
    }

    setNotStarted(): void {
        this.dataSource.setDefaultStatus(this.setNotStartedStatuses ? 'not started' : null);
    }

    private fetchOneFromDatasource(): Observable<ApprovalProcess> {
        return this.dataSource.fetch().pipe(take(1));
    }
}

/** For all code below
 * TODO #5351: Split into separate file after "pure" files will be allowed by the StackBlitz service
 */

const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

const users: ApprovalUser[] = [
    {
        id: 'uid28141',
        name: 'Luis Franklin',
        description: 'Legal team',
        imgUrl: 'https://randomuser.me/api/portraits/men/91.jpg'
    },
    {
        id: 'uid08141',
        name: 'Renee Miles',
        description: 'Legal team',
        imgUrl: 'https://randomuser.me/api/portraits/women/11.jpg'
    },
    {
        id: 'uid99641',
        name: 'Elaine Myers',
        description: 'Legal team',
        imgUrl: 'https://randomuser.me/api/portraits/women/75.jpg'
    },
    {
        id: 'uid38141',
        name: 'Emma Cole',
        description: 'Marketing team',
        imgUrl: 'https://randomuser.me/api/portraits/women/91.jpg'
    },
    {
        id: 'uid37866',
        name: 'Daniel Sullivan',
        description: 'Marketing team',
        imgUrl: 'https://randomuser.me/api/portraits/men/9.jpg'
    },
    {
        id: 'uid09141',
        name: 'Salvador Duncan',
        description: 'Marketing team',
        imgUrl: 'https://randomuser.me/api/portraits/men/14.jpg'
    },
    {
        id: 'uid09641',
        name: 'Caleb Taylor',
        description: 'Marketing team',
        imgUrl: 'https://randomuser.me/api/portraits/men/17.jpg'
    },
    {
        id: 'uid99651',
        name: 'Julie Peters',
        description: 'Marketing team',
        imgUrl: 'https://randomuser.me/api/portraits/women/77.jpg'
    },
    {
        id: 'uid99655',
        name: 'Fred Gibson',
        description: 'Marketing team',
        imgUrl: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    {
        id: 'uid81355',
        name: 'George Carter',
        description: 'Marketing team',
        imgUrl: 'https://randomuser.me/api/portraits/men/85.jpg'
    },
    {
        id: 'uid81353',
        name: 'Lillian Walker',
        description: 'Marketing team',
        imgUrl: 'https://randomuser.me/api/portraits/women/25.jpg'
    },
    {
        id: 'uid81955',
        name: 'Josephine Carlson',
        description: 'Sales team',
        imgUrl: 'https://randomuser.me/api/portraits/women/88.jpg'
    },
    {
        id: 'uid77135',
        name: 'Tristan Sutton',
        description: 'Sales team',
        imgUrl: 'https://randomuser.me/api/portraits/men/5.jpg'
    },
    {
        id: 'uid77115',
        name: 'Alvin Stephens',
        description: 'Sales team',
        imgUrl: 'https://randomuser.me/api/portraits/men/78.jpg'
    },
    {
        id: 'uid77111',
        name: 'Logan Herrera',
        description: 'Sales team',
        imgUrl: 'https://randomuser.me/api/portraits/men/53.jpg'
    },
    {
        id: 'uid66141',
        name: 'Melissa Martin',
        description: 'Accounting team',
        imgUrl: 'https://randomuser.me/api/portraits/women/87.jpg'
    },
    {
        id: 'uid66151',
        name: 'Sofia Hanson',
        description: 'Accounting team',
        imgUrl: 'https://randomuser.me/api/portraits/women/24.jpg'
    },
    {
        id: 'uid66161',
        name: 'Jill Fuller',
        description: 'Accounting team',
        imgUrl: 'https://randomuser.me/api/portraits/women/64.jpg'
    },
    {
        id: 'uid66171',
        name: 'Ella Franklin',
        description: 'Accounting team',
        imgUrl: 'https://randomuser.me/api/portraits/women/55.jpg'
    }
];

const usersMap = {};
users.forEach((u) => (usersMap[u.id] = u));

const teams: ApprovalTeam[] = [
    {
        id: 'teamId1',
        name: 'Accounting team',
        description: '',
        members: ['uid66171', 'uid66161', 'uid66151', 'uid66141']
    },
    {
        id: 'teamId2',
        name: 'Sales team',
        description: '',
        members: ['uid77111', 'uid77115', 'uid77135', 'uid81955']
    },
    {
        id: 'teamId3',
        name: 'Legal team',
        description: '',
        members: ['uid28141', 'uid08141', 'uid99641']
    },
    {
        id: 'teamId4',
        name: 'Marketing team',
        description: '',
        members: ['uid38141', 'uid37866', 'uid09141', 'uid81353', 'uid81355', 'uid99655', 'uid09641', 'uid99651']
    }
];

const emptyGraph: ApprovalProcess = {
    watchers: [getUser('uid66161')],
    nodes: []
};

const simpleGraph: ApprovalProcess = {
    watchers: [getUser('uid66161')],
    nodes: [
        {
            id: 'ID1',
            name: 'node name',
            description: 'node description',
            approvers: [getUser('uid81955')],
            status: 'approved',
            targets: ['ID2'],
            dueDate: daysFromNow(30),
            createDate: daysFromNow(-30)
        },
        {
            id: 'ID2',
            name: 'node name',
            description: 'node description',
            approvers: [getUser('uid66171')],
            status: 'in progress',
            targets: ['ID3'],
            dueDate: daysFromNow(10),
            createDate: daysFromNow(-30)
        },
        {
            id: 'ID3',
            name: 'node name',
            description: 'node description',
            approvers: [getUser('uid81355')],
            status: 'not started',
            targets: [],
            dueDate: daysFromNow(10),
            createDate: daysFromNow(-30)
        }
    ]
};

const mediumGraph: ApprovalProcess = {
    watchers: [getUser('uid66151'), getUser('uid77115')],
    nodes: [
        {
            id: 'ID1',
            name: 'node name',
            description: 'node description',
            approvers: [getUser('uid81955')],
            status: 'approved',
            targets: ['ID2', 'ID22', 'ID222'],
            dueDate: daysFromNow(30),
            createDate: daysFromNow(-30)
        },
        {
            id: 'ID2',
            name: 'node name',
            description: 'node description',
            approvers: [getUser('uid66171')],
            status: 'in progress',
            targets: ['ID3'],
            dueDate: daysFromNow(30),
            createDate: daysFromNow(-30)
        },
        {
            id: 'ID22',
            name: 'node name',
            description: 'node description',
            approvers: [getUser('uid77135')],
            status: 'approved',
            targets: ['ID3'],
            dueDate: daysFromNow(30),
            createDate: daysFromNow(-30)
        },
        {
            id: 'ID222',
            name: 'node name',
            description: 'Marketing team',
            approvers: [
                getUser('uid77111'),
                getUser('uid09641'),
                getUser('uid09141'),
                getUser('uid37866'),
                getUser('uid99641'),
                getUser('uid38141')
            ],
            status: 'not started',
            targets: ['ID3'],
            dueDate: daysFromNow(5),
            createDate: daysFromNow(-30)
        },
        {
            id: 'ID3',
            name: 'node name',
            description: 'node description',
            approvers: [getUser('uid81355')],
            status: 'not started',
            targets: ['ID4'],
            dueDate: daysFromNow(30),
            createDate: daysFromNow(-30)
        },
        {
            id: 'ID4',
            name: 'node name',
            description: 'node description',
            approvers: [getUser('uid99651')],
            status: 'not started',
            targets: [],
            dueDate: daysFromNow(30),
            createDate: daysFromNow(-30)
        }
    ]
};

const complexGraph: ApprovalProcess = {
    watchers: [getUser('uid66151'), getUser('uid66141'), getUser('uid99651'), getUser('uid99655')],
    nodes: [
        {
            id: 'ID1',
            name: 'node name',
            description: 'node description',
            approvers: [getUser('uid81955')],
            status: 'approved',
            targets: ['ID2', 'ID22', 'ID222'],
            dueDate: daysFromNow(30),
            createDate: daysFromNow(-30)
        },
        {
            id: 'ID2',
            name: 'node name',
            description: 'node description',
            approvers: [getUser('uid66171')],
            status: 'in progress',
            targets: ['ID3'],
            dueDate: daysFromNow(30),
            createDate: daysFromNow(-30)
        },
        {
            id: 'ID22',
            name: 'node name',
            description: 'node description',
            approvers: [getUser('uid28141')],
            status: 'approved',
            targets: ['ID220'],
            dueDate: daysFromNow(30),
            createDate: daysFromNow(-30)
        },
        {
            id: 'ID222',
            name: 'node name',
            description: 'Marketing team',
            approvers: [getUser('uid77111'), getUser('uid09641')],
            status: 'in progress',
            targets: ['ID2220'],
            dueDate: daysFromNow(3),
            createDate: daysFromNow(-30)
        },
        {
            id: 'ID220',
            name: 'node name',
            description: 'node description',
            approvers: [getUser('uid08141')],
            status: 'rejected',
            targets: ['ID3'],
            dueDate: daysFromNow(30),
            createDate: daysFromNow(-30)
        },
        {
            id: 'ID2220',
            name: 'node name',
            description: 'Marketing',
            approvers: [getUser('uid81353')],
            status: 'not started',
            targets: ['ID3'],
            dueDate: daysFromNow(30),
            createDate: daysFromNow(-30)
        },
        {
            id: 'ID3',
            name: 'node name',
            description: 'node description',
            approvers: [getUser('uid81355')],
            status: 'not started',
            targets: ['ID4'],
            dueDate: daysFromNow(30),
            createDate: daysFromNow(-30)
        },
        {
            id: 'ID4',
            name: 'node name',
            description: 'node description',
            approvers: [getUser('uid99651')],
            status: 'not started',
            targets: [],
            dueDate: daysFromNow(30),
            createDate: daysFromNow(-30)
        }
    ]
};

const graphs = {
    empty: emptyGraph,
    simple: simpleGraph,
    medium: mediumGraph,
    complex: complexGraph
};

function getUser(id: string): ApprovalUser {
    return usersMap[id];
}

function daysFromNow(days: number): Date {
    return new Date(Date.now() + DAY_IN_MILLISECONDS * days);
}

type GraphTypes = 'empty' | 'simple' | 'medium' | 'complex';

export class ApprovalFlowExampleDataSource implements ApprovalDataSource {
    selectedGraph: GraphTypes;
    defaultStatus: ApprovalStatus | null = null;

    readonly state: BehaviorSubject<ApprovalProcess>;

    constructor(selectedGraph: string = 'complex') {
        this.selectedGraph = selectedGraph as GraphTypes;
        this.state = new BehaviorSubject<ApprovalProcess>(graphs[this.selectedGraph]);
    }

    setDefaultStatus(status: ApprovalStatus | null): void {
        this.defaultStatus = status;
        this.selectGraph(this.selectedGraph);
    }

    selectGraph(selectedGraph: string = 'complex'): void {
        this.selectedGraph = selectedGraph as GraphTypes;
        const graph = { ...graphs[this.selectedGraph] };

        graph.nodes = graph.nodes.map((n) => {
            const nodeCopy = { ...n };

            if (this.defaultStatus) {
                nodeCopy.status = this.defaultStatus;
            }

            return nodeCopy;
        });

        this.state.next(graph);
    }

    fetch(): Observable<ApprovalProcess> {
        return this.state;
    }

    fetchUser(id: string): Observable<any> {
        const user = users.find((u) => u.id === id);

        return of({
            phone: Math.random().toFixed(13).toString().replace('0.', ''),
            email: `${user.name.toLowerCase().split(' ').join('.')}@company.com`
        });
    }

    fetchApprovers(): Observable<ApprovalUser[]> {
        return of(users);
    }

    fetchWatchers(): Observable<ApprovalUser[]> {
        return of(users);
    }

    fetchTeams(): Observable<ApprovalTeam[]> {
        return of(teams);
    }

    updateWatchers(watchers: ApprovalUser[]): void {
        console.log('call "updateWatchers" method from ApprovalDataSource implementation class');
        const currentGraph = graphs[this.selectedGraph];
        currentGraph.watchers = watchers;
        this.selectGraph(this.selectedGraph);
    }

    updateApproval(): void {
        console.log('call "updateApproval" method from ApprovalDataSource implementation class');
    }

    updateApprovals(approvals: ApprovalNode[]): void {
        console.log('call "updateApprovals" method from ApprovalDataSource implementation class');
        const currentGraph = graphs[this.selectedGraph];
        currentGraph.nodes = approvals;
        this.selectGraph(this.selectedGraph);
    }

    sendReminders(): Observable<any> {
        console.log('call "sendReminders" method from ApprovalDataSource implementation class');
        return of(null);
    }
}
