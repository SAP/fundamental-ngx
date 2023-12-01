import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalProcess, ApprovalUser } from '../interfaces';

import { generateApprovalFlowGraph, generateApprovalFlowGraphMetadata } from '../approval-flow-graph';
import { ApprovalFlowToolbarActionsComponent } from './approval-flow-toolbar-actions.component';
import { PlatformApprovalFlowModule } from '../approval-flow.module';

const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
const users: ApprovalUser[] = [
    {
        id: 'uid81955',
        name: 'Josephine Carlson',
        teamId: 'teamId2',
        description: 'Sales team',
        imgUrl: 'https://randomuser.me/api/portraits/women/88.jpg'
    }
];

const usersMap = {};
users.forEach((u) => (usersMap[u.id] = u));

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
            approvers: [getUser('uid81955')],
            status: 'in progress',
            targets: ['ID3'],
            dueDate: daysFromNow(10),
            createDate: daysFromNow(-30)
        },
        {
            id: 'ID3',
            name: 'node name',
            description: 'node description',
            approvers: [getUser('uid81955')],
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

describe('ApprovalFlowToolbarActionsComponent', () => {
    let component: ApprovalFlowToolbarActionsComponent;
    let fixture: ComponentFixture<ApprovalFlowToolbarActionsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PlatformApprovalFlowModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ApprovalFlowToolbarActionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should calculate toolbar buttons state', () => {
        component.graph = generateApprovalFlowGraph(simpleGraph.nodes);
        component.graphMetadata = generateApprovalFlowGraphMetadata(component.graph);
        fixture.detectChanges();

        const rootNode = simpleGraph.nodes[0];
        const finalNode = simpleGraph.nodes[2];

        component.selectedNodes = [rootNode];
        fixture.detectChanges();

        expect(component._canAddBefore).toBeFalsy();
        expect(component._canAddAfter).toBeFalsy();
        expect(component._canAddParallel).toBeFalsy();

        component.selectedNodes = [finalNode];
        fixture.detectChanges();

        expect(component._canAddBefore).toBeTruthy();
        expect(component._canAddAfter).toBeTruthy();
        expect(component._canAddParallel).toBeTruthy();
    });
});
