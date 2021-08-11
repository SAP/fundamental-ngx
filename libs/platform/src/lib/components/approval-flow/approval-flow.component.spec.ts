import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RIGHT_ARROW } from '@angular/cdk/keycodes';
import { Observable, of } from 'rxjs';

import { RtlService } from '@fundamental-ngx/core/utils';
import { DialogService } from '@fundamental-ngx/core/dialog';
import {
    ApprovalDataSource,
    ApprovalFlowComponent,
    ApprovalNode,
    ApprovalProcess,
    ApprovalTeam,
    ApprovalUser,
    PlatformApprovalFlowModule
} from '@fundamental-ngx/platform';

import { createKeyboardEvent } from '../../testing/event-objects';
import { AddNodeDialogRefData, APPROVAL_FLOW_NODE_TYPES } from './approval-flow-add-node/approval-flow-add-node.component';

const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
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

const usersMap = {};
users.forEach(u => usersMap[u.id] = u);

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

function getUser(id: string): ApprovalUser {
    return usersMap[id];
}

function daysFromNow(days: number): Date {
    return new Date(Date.now() + DAY_IN_MILLISECONDS * days);
}

export class TestApprovalFlowDataSource implements ApprovalDataSource {
    fetch(): Observable<ApprovalProcess> {
        return of(simpleGraph);
    }
    fetchUser(id: string): Observable<any> {
        const user = users.find(u => u.id === id);

        return of({
            phone: Math.random().toFixed(13).toString().replace('0.', ''),
            email: `${user.name.toLowerCase().split(' ').join('.')}@company.com`
        });
    }
    updateWatchers(watchers: ApprovalUser[]): void {}
    updateApproval(approval: ApprovalNode): void {}
    updateApprovals(approvals: ApprovalNode[]): void {}
    sendReminders(members: ApprovalUser[], approval: ApprovalNode): Observable<any> {
        return of(null)
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
}

const TEST_APPROVAL_FLOW_TITLE = 'Test title';

@Component({
    selector: 'fdp-test-approval-flow',
    template: `
        <fdp-approval-flow [title]="title" [dataSource]="dataSource"></fdp-approval-flow>`
})
class TestPlatformApprovalFlowComponent {
    @ViewChild(ApprovalFlowComponent, { static: true }) component: ApprovalFlowComponent;
    title = TEST_APPROVAL_FLOW_TITLE;
    dataSource = new TestApprovalFlowDataSource();
}

describe('ApprovalFlowComponent', () => {
    let fixture: ComponentFixture<TestPlatformApprovalFlowComponent>;
    let component: ApprovalFlowComponent;
    let host: TestPlatformApprovalFlowComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PlatformApprovalFlowModule, NoopAnimationsModule],
            declarations: [ApprovalFlowComponent, TestPlatformApprovalFlowComponent],
            providers: [RtlService]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestPlatformApprovalFlowComponent);
        host = fixture.componentInstance;
        component = host.component;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should properly set node flags (nodes metadata)', () => {
        const simpleGraphRootNode = component._graph.columns[0].nodes[0];
        const graphLastColumnIndex = component._graph.columns.length - 1;
        const simpleGraphFinalNode = component._graph.columns[graphLastColumnIndex].nodes[0];

        expect(component._graphMetadata[simpleGraphRootNode.id].isRoot).toBeTruthy();
        expect(component._graphMetadata[simpleGraphFinalNode.id].isFinal).toBeTruthy();

        expect(component._graphMetadata[simpleGraphRootNode.id].canAddNodeBefore).toBeFalsy();
        expect(component._graphMetadata[simpleGraphRootNode.id].canAddNodeAfter).toBeFalsy();
        expect(component._graphMetadata[simpleGraphRootNode.id].canAddParallel).toBeFalsy();

        expect(component._graphMetadata[simpleGraphFinalNode.id].canAddNodeBefore).toBeTruthy();
        expect(component._graphMetadata[simpleGraphFinalNode.id].canAddNodeAfter).toBeTruthy();
        expect(component._graphMetadata[simpleGraphFinalNode.id].canAddParallel).toBeTruthy();
    });

    it('should render approval flow title', () => {
        const titleEl = fixture.nativeElement.querySelector('.fdp-approval-flow__toolbar .fd-toolbar .fd-label');

        expect(titleEl).toBeTruthy();
        expect(titleEl.textContent.trim()).toEqual(TEST_APPROVAL_FLOW_TITLE);

        const newTitle = `${TEST_APPROVAL_FLOW_TITLE}-changed`;

        host.title = newTitle;
        fixture.detectChanges();

        expect(titleEl.textContent.trim()).toEqual(newTitle);
    });

    it('should render watchers list', () => {
        const watchersContainer = fixture.nativeElement.querySelector('.fdp-approval-flow__watchers');

        expect(watchersContainer).toBeTruthy();
        expect(watchersContainer.querySelectorAll('fd-avatar').length).toEqual(simpleGraph.watchers.length);
    });

    it('should call watcher click handler on watcher click', () => {
        spyOn(component, '_onWatcherClick').and.callThrough();

        const watchersContainer = fixture.nativeElement.querySelector('.fdp-approval-flow__watchers');
        const watcher = watchersContainer.querySelector('fd-avatar');

        expect(watcher).toBeTruthy();

        watcher.click();

        expect(component._onWatcherClick).toHaveBeenCalled();
    });

    it('should render graph', () => {
        const nodesContainer = fixture.nativeElement.querySelector('.fdp-approval-flow__graph');

        expect(nodesContainer).toBeTruthy();
        expect(nodesContainer.querySelectorAll('.fdp-approval-flow__graph-column').length).toEqual(simpleGraph.nodes.length);
        expect(nodesContainer.querySelectorAll('fdp-approval-flow-node').length).toEqual(simpleGraph.nodes.length);
    });

    it('should send reminders', () => {
        spyOn(component.dataSource, 'sendReminders').and.callThrough();

        component._sendReminders(simpleGraph.nodes[0].approvers, simpleGraph.nodes[0]);

        expect(component.dataSource.sendReminders).toHaveBeenCalled();
    });

    it('should call keydown handler if arrow key was pressed', () => {
        spyOn(component, '_onNodeKeyDown').and.callThrough();

        const nodesContainer = fixture.nativeElement.querySelector('.fdp-approval-flow__graph');

        expect(nodesContainer).toBeTruthy();

        const nodes = nodesContainer.querySelectorAll('fdp-approval-flow-node');
        const firstNode = nodes[0];

        firstNode.focus();

        const keyboardEvent = createKeyboardEvent('keydown', RIGHT_ARROW, 'ArrowRight');

        firstNode.dispatchEvent(keyboardEvent);

        expect(component._onNodeKeyDown).toHaveBeenCalled();
    });

    it('should increment step count after nextSlide call', () => {
        spyOn(component, 'nextSlide').and.callThrough();

        const prevCount = component._carouselStep;

        component.nextSlide();

        expect(prevCount < component._carouselStep).toBeTruthy();
    });

    it('should decrement step count after previousSlide call', () => {
        spyOn(component, 'previousSlide').and.callThrough();

        component._carouselStep = 1;

        const prevCount = component._carouselStep;

        component.previousSlide();

        expect(prevCount > component._carouselStep).toBeTruthy();
    });

    it('should open adding node dialog for the empty graph', () => {
        const dialogSpy = spyOn(fixture.componentRef.injector.get(DialogService), 'open')
            .and.returnValue({ afterClosed: of(null) } as any);

        component._addNode(null, 'empty');

        expect(dialogSpy).toHaveBeenCalled();

        const diagogSpyArgs = dialogSpy.calls.mostRecent().args[1].data as AddNodeDialogRefData;

        expect(diagogSpyArgs.nodeTarget).toEqual('empty');
        expect(diagogSpyArgs.showNodeTypeSelect).toEqual(false);
    });

    it('should enter edit mode', () => {
        const watchers = [];
        const watchersSpy = spyOn(component.dataSource, 'fetchWatchers')
            .and.returnValue(of(watchers));

        component._enterEditMode();

        expect(watchersSpy).toHaveBeenCalled();
        expect(component._usersForWatchersList).toEqual(watchers);
        expect(component._isEditMode).toBeTruthy();
    });

    it('should save edit mode changes', () => {
        const approvalSpy = spyOn(component.dataSource, 'updateApprovals')
            .and.callThrough();

        component._saveEditModeChanges();

        expect(approvalSpy).toHaveBeenCalled();
        expect(component._isEditMode).toBeFalsy();
    });

    it('should exit edit mode', () => {
        component._exitEditMode();

        expect(component._isEditMode).toBeFalsy();
    });

    it('should add node to the graph', () => {
        const dialogSpy = spyOn(TestBed.inject(DialogService), 'open')
            .and.returnValue({
                afterClosed: of({
                    node: Object.assign({}, simpleGraph.nodes[0], { status: 'not started' }),
                    nodeType: APPROVAL_FLOW_NODE_TYPES.SERIAL
                })
            } as any);

        const lastNodeComponent = component._nodeComponents.last
        const sourceNode = lastNodeComponent.node;

        component._addNode(sourceNode, 'after');

        expect(dialogSpy).toHaveBeenCalled();

        const addedNodeIndex = component._approvalProcess.nodes.length - 1;
        const addedNodeId = component._approvalProcess.nodes[addedNodeIndex].id;

        expect(addedNodeId.startsWith('tempId')).toBeTruthy();
        expect(sourceNode.targets[0]).toEqual(addedNodeId);
    });
});
