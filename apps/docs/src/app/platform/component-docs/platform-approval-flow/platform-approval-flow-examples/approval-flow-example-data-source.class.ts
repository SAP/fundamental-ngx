import { ApprovalDataSource, ApprovalNode, ApprovalProcess, ApprovalUser } from '@fundamental-ngx/platform';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

const users: ApprovalUser[] = [
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
        id: 'uid99641',
        name: 'Elaine Myers',
        description: 'Legal team',
        imgUrl: 'https://randomuser.me/api/portraits/women/75.jpg'
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

const simpleGraph: ApprovalProcess = {
    watchers: [getRandomUser(), getRandomUser(), getRandomUser()],
    nodes: [
        {
            id: 'ID1',
            name: 'node name',
            description: 'node description',
            approvers: [getRandomUser()],
            status: 'approved',
            targets: ['ID2'],
            dueDate: new Date(),
            createDate: new Date()
        },
        {
            id: 'ID2',
            name: 'node name',
            description: 'node description',
            approvers: [getRandomUser()],
            status: 'in progress',
            targets: ['ID3'],
            dueDate: new Date(),
            createDate: new Date()
        },
        {
            id: 'ID3',
            name: 'node name',
            description: 'node description',
            approvers: [getRandomUser()],
            status: 'in progress',
            targets: [],
            dueDate: new Date(),
            createDate: new Date()
        }
    ]
};

const mediumGraph: ApprovalProcess = {
    watchers: [getRandomUser(), getRandomUser(), getRandomUser()],
    nodes: [
        {
            id: 'ID1',
            name: 'node name',
            description: 'node description',
            approvers: [getRandomUser()],
            status: 'approved',
            targets: ['ID2', 'ID22', 'ID222'],
            dueDate: new Date(),
            createDate: new Date()
        },
        {
            id: 'ID2',
            name: 'node name',
            description: 'node description',
            approvers: [getRandomUser()],
            status: 'in progress',
            targets: ['ID3'],
            dueDate: new Date(),
            createDate: new Date()
        },
        {
            id: 'ID22',
            name: 'node name',
            description: 'node description',
            approvers: [getRandomUser()],
            status: 'approved',
            targets: [],
            dueDate: new Date(),
            createDate: new Date()
        },
        {
            id: 'ID222',
            name: 'node name',
            description: 'Marketing team',
            approvers: [getRandomUser(), getRandomUser(), getRandomUser(), getRandomUser(), getRandomUser(), getRandomUser()],
            status: 'in progress',
            targets: [],
            dueDate: new Date(),
            createDate: new Date()
        },
        {
            id: 'ID3',
            name: 'node name',
            description: 'node description',
            approvers: [getRandomUser()],
            status: 'in progress',
            targets: ['ID4'],
            dueDate: new Date(),
            createDate: new Date()
        },
        {
            id: 'ID4',
            name: 'node name',
            description: 'node description',
            approvers: [getRandomUser()],
            status: 'not started',
            targets: [],
            dueDate: new Date(),
            createDate: new Date()
        }
    ]
};

const complexGraph: ApprovalProcess = {
    watchers: [getRandomUser(), getRandomUser(), getRandomUser()],
    nodes: [
        {
            id: 'ID1',
            name: 'node name',
            description: 'node description',
            approvers: [getRandomUser()],
            status: 'approved',
            targets: ['ID2', 'ID22', 'ID222'],
            dueDate: new Date(),
            createDate: new Date()
        },
        {
            id: 'ID2',
            name: 'node name',
            description: 'node description',
            approvers: [getRandomUser()],
            status: 'in progress',
            targets: ['ID3'],
            dueDate: new Date(),
            createDate: new Date()
        },
        {
            id: 'ID22',
            name: 'node name',
            description: 'node description',
            approvers: [getRandomUser()],
            status: 'approved',
            targets: ['ID220'],
            dueDate: new Date(),
            createDate: new Date()
        },
        {
            id: 'ID222',
            name: 'node name',
            description: 'Marketing team',
            approvers: [getRandomUser(), getRandomUser()],
            status: 'in progress',
            targets: ['ID2220'],
            dueDate: new Date(),
            createDate: new Date()
        },
        {
            id: 'ID220',
            name: 'node name',
            description: 'node description',
            approvers: [getRandomUser()],
            status: 'in progress',
            targets: [],
            dueDate: new Date(),
            createDate: new Date()
        },
        {
            id: 'ID2220',
            name: 'node name',
            description: 'Marketing',
            approvers: [getRandomUser()],
            status: 'not started',
            targets: [],
            dueDate: new Date(),
            createDate: new Date()
        },
        {
            id: 'ID3',
            name: 'node name',
            description: 'node description',
            approvers: [getRandomUser()],
            status: 'not started',
            targets: ['ID4'],
            dueDate: new Date(),
            createDate: new Date()
        },
        {
            id: 'ID4',
            name: 'node name',
            description: 'node description',
            approvers: [getRandomUser()],
            status: 'not started',
            targets: [],
            dueDate: new Date(),
            createDate: new Date()
        }
    ]
};

const graphs = {
    simple: simpleGraph,
    medium: mediumGraph,
    complex: complexGraph
};

function getRandomUser(): ApprovalUser {
    return users[Math.floor(Math.random() * users.length)];
}

type GraphTypes = 'simple' | 'medium' | 'complex';

export class ApprovalFlowExampleDataSource implements ApprovalDataSource {
    selectedGraph: GraphTypes;

    readonly state: BehaviorSubject<ApprovalProcess>;

    constructor(selectedGraph: string = 'complex') {
        this.selectedGraph = selectedGraph as GraphTypes;
        this.state = new BehaviorSubject<ApprovalProcess>(graphs[this.selectedGraph]);
    }

    selectGraph(selectedGraph: string = 'complex'): void {
        this.selectedGraph = selectedGraph as GraphTypes;
        this.state.next(graphs[this.selectedGraph]);
    }

    fetch(): Observable<ApprovalProcess> {
        return this.state;
    }

    fetchUser(id: string): Observable<any> {
        const user = users.find(u => u.id === id);

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

    updateWatchers(watchers: ApprovalUser[]): void {
        console.log('call "updateWatchers" method from ApprovalDataSource implementation class');
        const currentGraph = graphs[this.selectedGraph];
        currentGraph.watchers = watchers;
        this.selectGraph(this.selectedGraph);
    }

    updateApproval(approval: ApprovalNode): void {
        console.log('call "updateApproval" method from ApprovalDataSource implementation class');
    }

    updateApprovals(approvals: ApprovalNode[]): void {
        console.log('call "updateApprovals" method from ApprovalDataSource implementation class');
    }

    sendReminders(members: ApprovalUser[], approval: ApprovalNode): Observable<any> {
        console.log('call "sendReminders" method from ApprovalDataSource implementation class');
        return of(null);
    }
}
