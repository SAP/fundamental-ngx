import { ApprovalProcess, ApprovalTeam, ApprovalUser } from './../interfaces';

const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
export const users: ApprovalUser[] = [
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

export const teams: ApprovalTeam[] = [
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

export const simpleGraph: ApprovalProcess = {
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

function getUser(id: string): ApprovalUser {
    return usersMap[id];
}

function daysFromNow(days: number): Date {
    return new Date(Date.now() + DAY_IN_MILLISECONDS * days);
}
