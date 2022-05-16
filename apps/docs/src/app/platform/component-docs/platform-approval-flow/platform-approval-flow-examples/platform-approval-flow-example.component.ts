import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { Subscription, of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import {
    ApprovalFlowComponent,
    ApprovalNode,
    ApprovalNodeActionsConfig,
    ApprovalProcess,
    ApprovalStatus,
    ApprovalTeam,
    ApprovalUser,
    SendRemindersData
} from '@fundamental-ngx/platform/approval-flow';
import {
    DataProvider,
    ProviderParams,
    ApprovalFlowUserDataSource,
    ApprovalFlowTeamDataSource
} from '@fundamental-ngx/platform/shared';
import { cloneDeep } from 'lodash-es';
import { MessageToastService } from '@fundamental-ngx/core/message-toast';

@Component({
    selector: 'fdp-platform-approval-flow-example',
    templateUrl: './platform-approval-flow-example.component.html'
})
export class PlatformApprovalFlowExampleComponent implements OnDestroy {
    /** @hidden */
    @ViewChild(ApprovalFlowComponent)
    _approvalFlow: ApprovalFlowComponent;

    @ViewChild('reminderTemplate') _reminderTemplate: TemplateRef<any>;

    examples: GraphTypes[] = ['empty', 'simple', 'medium', 'complex'];
    selectedExample: GraphTypes = 'complex';
    approvalProcess: ApprovalProcess = graphs[this.selectedExample];

    userDataSource = new ApprovalFlowUserDataSource(new UserDataProvider());
    watcherDataSource = new ApprovalFlowUserDataSource(new UserDataProvider());
    teamDataSource = new ApprovalFlowTeamDataSource(new TeamDataProvider());

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
    private newNodes = new Map<ApprovalNode['id'], ApprovalNode>();

    constructor(private readonly _messageToastService: MessageToastService) {}

    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    valueChanged(updatedApprovalProcess: ApprovalProcess): void {
        console.log('valueChanged', updatedApprovalProcess);
    }

    sendReminders(data: SendRemindersData): void {
        this._messageToastService.open(this._reminderTemplate, {
            data: {
                targets: data.users,
                node: data.node
            },
            duration: 5000
        });
    }

    changeExampleData(): void {
        this.approvalProcess = cloneDeep(graphs[this.selectedExample]);
    }

    toggleNodeActions(state: boolean): void {
        const approvalProcess = this._approvalFlow.approvalProcess;
        const updatedState = cloneDeep(approvalProcess);
        updatedState.nodes.forEach((node) => {
            node.disableActions = state;
        });
        this.approvalProcess = updatedState;
    }

    toggleSpecificNodeAction(field: keyof ApprovalNodeActionsConfig, state: boolean): void {
        const approvalProcess = this._approvalFlow.approvalProcess;
        const updatedState = cloneDeep(approvalProcess);
        updatedState.nodes.forEach((node) => {
            node.actionsConfig = {
                ...node.actionsConfig,
                [field]: state
            };
        });
        this.approvalProcess = updatedState;
    }

    newNodeSettingsChange(): void {
        const approvalProcess = this._approvalFlow.approvalProcess;

        approvalProcess.nodes.forEach((node) => {
            if (this.newNodes.has(node.id)) {
                const meta = this._approvalFlow.getNodeMetadataByNodeId(node.id);

                meta.canAddNodeAfter = !this.nodeActionsConfigForNewNodes.disableAddAfter;
                meta.canAddNodeBefore = !this.nodeActionsConfigForNewNodes.disableAddBefore;
                meta.canAddParallel = !this.nodeActionsConfigForNewNodes.disableAddParallel;
            }
        });
    }

    nodeClick(node: ApprovalNode): void {
        console.log('Node click handler', node);
    }

    /** Event listener for afterNodeAdd event */
    afterNodeAdd(node: ApprovalNode): void {
        console.log('After node add handler', node);
        this.newNodes.set(node.id, node);

        this.newNodeSettingsChange();
    }

    /** Event listener for afterNodeEdit event */
    afterNodeEdit(node: ApprovalNode): void {
        console.log('After node edit handler', node);
        this.newNodeSettingsChange();
    }

    setNotStarted(): void {
        const approvalProcess = this._approvalFlow.approvalProcess;
        const initialNodeMap = new Map((graphs[this.selectedExample] as ApprovalProcess).nodes.map((n) => [n.id, n]));
        const updatedState = cloneDeep(approvalProcess);
        updatedState.nodes = updatedState.nodes.map((n) => {
            const status =
                this.setNotStartedStatuses || !initialNodeMap.has(n.id)
                    ? 'not started'
                    : (initialNodeMap.get(n.id) as ApprovalNode).status;
            return {
                ...n,
                status
            };
        });

        this.approvalProcess = updatedState;
    }
}

/** For all code below
 * TODO #5351: Split into separate file after "pure" files will be allowed by the StackBlitz service
 */

const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

const users: ApprovalUser[] = [
    {
        id: 'uid28141',
        teamId: 'teamId3',
        name: 'Luis Franklin',
        description: 'Legal team',
        imgUrl: 'https://randomuser.me/api/portraits/men/91.jpg'
    },
    {
        id: 'uid08141',
        teamId: 'teamId3',
        name: 'Renee Miles',
        description: 'Legal team',
        imgUrl: 'https://randomuser.me/api/portraits/women/11.jpg'
    },
    {
        id: 'uid99641',
        teamId: 'teamId3',
        name: 'Elaine Myers',
        description: 'Legal team',
        imgUrl: 'https://randomuser.me/api/portraits/women/75.jpg'
    },
    {
        id: 'uid38141',
        teamId: 'teamId4',
        name: 'Emma Cole',
        description: 'Marketing team',
        imgUrl: 'https://randomuser.me/api/portraits/women/91.jpg'
    },
    {
        id: 'uid37866',
        teamId: 'teamId4',
        name: 'Daniel Sullivan',
        description: 'Marketing team',
        imgUrl: 'https://randomuser.me/api/portraits/men/9.jpg'
    },
    {
        id: 'uid09141',
        teamId: 'teamId4',
        name: 'Salvador Duncan',
        description: 'Marketing team',
        imgUrl: 'https://randomuser.me/api/portraits/men/14.jpg'
    },
    {
        id: 'uid09641',
        teamId: 'teamId4',
        name: 'Caleb Taylor',
        description: 'Marketing team',
        imgUrl: 'https://randomuser.me/api/portraits/men/17.jpg'
    },
    {
        id: 'uid99651',
        teamId: 'teamId4',
        name: 'Julie Peters',
        description: 'Marketing team',
        imgUrl: 'https://randomuser.me/api/portraits/women/77.jpg'
    },
    {
        id: 'uid99655',
        teamId: 'teamId4',
        name: 'Fred Gibson',
        description: 'Marketing team',
        imgUrl: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    {
        id: 'uid81355',
        teamId: 'teamId4',
        name: 'George Carter',
        description: 'Marketing team',
        imgUrl: 'https://randomuser.me/api/portraits/men/85.jpg'
    },
    {
        id: 'uid81353',
        teamId: 'teamId4',
        name: 'Lillian Walker',
        description: 'Marketing team',
        imgUrl: 'https://randomuser.me/api/portraits/women/25.jpg'
    },
    {
        id: 'uid81955',
        teamId: 'teamId2',
        name: 'Josephine Carlson',
        description: 'Sales team',
        imgUrl: 'https://randomuser.me/api/portraits/women/88.jpg'
    },
    {
        id: 'uid77135',
        teamId: 'teamId2',
        name: 'Tristan Sutton',
        description: 'Sales team',
        imgUrl: 'https://randomuser.me/api/portraits/men/5.jpg'
    },
    {
        id: 'uid77115',
        teamId: 'teamId2',
        name: 'Alvin Stephens',
        description: 'Sales team',
        imgUrl: 'https://randomuser.me/api/portraits/men/78.jpg'
    },
    {
        id: 'uid77111',
        teamId: 'teamId2',
        name: 'Logan Herrera',
        description: 'Sales team',
        imgUrl: 'https://randomuser.me/api/portraits/men/53.jpg'
    },
    {
        id: 'uid66141',
        teamId: 'teamId1',
        name: 'Melissa Martin',
        description: 'Accounting team',
        imgUrl: 'https://randomuser.me/api/portraits/women/87.jpg'
    },
    {
        id: 'uid66151',
        teamId: 'teamId1',
        name: 'Sofia Hanson',
        description: 'Accounting team',
        imgUrl: 'https://randomuser.me/api/portraits/women/24.jpg'
    },
    {
        id: 'uid66161',
        teamId: 'teamId1',
        name: 'Jill Fuller',
        description: 'Accounting team',
        imgUrl: 'https://randomuser.me/api/portraits/women/64.jpg'
    },
    {
        id: 'uid66171',
        teamId: 'teamId1',
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
        members: ['uid66171', 'uid66161', 'uid66151', 'uid66141'].map((id) => getUser(id))
    },
    {
        id: 'teamId2',
        name: 'Sales team',
        description: '',
        members: ['uid77111', 'uid77115', 'uid77135', 'uid81955'].map((id) => getUser(id))
    },
    {
        id: 'teamId3',
        name: 'Legal team',
        description: '',
        members: ['uid28141', 'uid08141', 'uid99641'].map((id) => getUser(id))
    },
    {
        id: 'teamId4',
        name: 'Marketing team',
        description: '',
        members: ['uid38141', 'uid37866', 'uid09141', 'uid81353', 'uid81355', 'uid99655', 'uid09641', 'uid99651'].map(
            (id) => getUser(id)
        )
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

const graphs: Record<GraphTypes, ApprovalProcess> = {
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

class UserDataProvider extends DataProvider<ApprovalUser> {
    fetch(params: ProviderParams): Observable<ApprovalUser[]> {
        let result = users;
        const query = params.get('query')?.toLowerCase();
        if (query) {
            result = result.filter((u) => u.name?.toLowerCase().startsWith(query));
        }
        return of(cloneDeep(result)).pipe(delay(500));
    }

    getOne(params: ProviderParams): Observable<ApprovalUser & { phone: string; email: string }> {
        const id = params.get('id');
        const found = users.find((user) => user.id === id) as ApprovalUser;
        return of({
            ...found,
            phone: Math.random().toFixed(13).toString().replace('0.', ''),
            email: `${found.name.toLowerCase().split(' ').join('.')}@company.com`
        });
    }
}

class TeamDataProvider extends DataProvider<ApprovalTeam> {
    fetch(params: ProviderParams): Observable<ApprovalTeam[]> {
        let result = teams;
        const query = params.get('query')?.toLowerCase();
        if (query) {
            result = result.filter((u) => u.name?.toLowerCase().startsWith(query));
        }
        return of(cloneDeep(result)).pipe(delay(500));
    }
}
