import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { DialogConfig, DialogRef } from '@fundamental-ngx/core/dialog';
import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { PlatformApprovalFlowModule } from '../approval-flow.module';

import { AddNodeDialogRefData, APPROVAL_FLOW_APPROVER_TYPES, ApprovalFlowAddNodeComponent } from './approval-flow-add-node.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestApprovalFlowDataSource } from '../approval-flow.component.spec';
import { ApprovalNode, ApprovalTeam } from '../interfaces';
import { ApprovalFlowAddNodeViewService } from '../services/approval-flow-add-node-view.service';

const node: ApprovalNode = {
    id: 'id1',
    name: 'name',
    approvers: [],
    status: 'not started',
    targets: [],
}

describe('ApprovalFlowAddNodeComponent', () => {
    let component: ApprovalFlowAddNodeComponent;
    let fixture: ComponentFixture<ApprovalFlowAddNodeComponent>;

    const dialogRef = new DialogRef();
    const dialogConfig = new DialogConfig();
    const approvalFlowDataSource = new TestApprovalFlowDataSource();
    const dialogData: AddNodeDialogRefData = {
        approvalFlowDataSource: approvalFlowDataSource,
        userDetailsTemplate: null,
        rtl: false,
        node: node
    };

    dialogRef.data = dialogData;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ApprovalFlowAddNodeComponent],
            imports: [
                FdDatetimeModule,
                PlatformApprovalFlowModule,
                BrowserAnimationsModule
            ],
            providers: [
                { provide: DialogRef, useValue: dialogRef },
                { provide: DialogConfig, useValue: dialogConfig }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ApprovalFlowAddNodeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should init dialog with passed data', () => {
        const teams = [];
        const approvers = [];

        const approversSpy = spyOn(component._data.approvalFlowDataSource, 'fetchApprovers')
            .and.returnValue(of(approvers));
        const teamsSpy = spyOn(component._data.approvalFlowDataSource, 'fetchTeams')
            .and.returnValue(of(teams));

        component._data.isEdit = true;
        component._data.nodeTarget = 'before';

        component.ngOnInit();

        expect(approversSpy).toHaveBeenCalled();
        expect(teamsSpy).toHaveBeenCalled();
        expect(component._nodeType).toEqual('SERIAL');
    });

    it('should map users of the selected team to the node approvers', () => {
        let team: ApprovalTeam;
        let teamMemberIds: string;

        approvalFlowDataSource.fetchTeams().subscribe(teams => {
            team = teams[0];
            teamMemberIds = team.members.map(memberId => memberId).join(',');
        });

        component._approverType = APPROVAL_FLOW_APPROVER_TYPES.EVERYONE;
        component._setSelectedTeam(team);
        component._confirmSelectedTeam();
        component._submit();

        const nodeApprovers = component._data.node.approvers.map(approver => approver.id).join(',');
        expect(nodeApprovers).toEqual(teamMemberIds);
    });

    it('should set selected approvers', () => {
        const approvers = [];

        const viewServiceSpy = spyOn(TestBed.inject(ApprovalFlowAddNodeViewService), 'resetView').and.callThrough();

        component._setSelectedApprovers(approvers);

        expect(component._data.node.approvers).toEqual(approvers);
        expect(component._data.node.variousTeams).toEqual(false);
        expect(viewServiceSpy).toHaveBeenCalled();
    });

    it('should confirm selected team', () => {
        let approvalTeam: ApprovalTeam;
        const viewServiceSpy = spyOn(TestBed.inject(ApprovalFlowAddNodeViewService), 'resetView').and.callThrough();

        approvalFlowDataSource.fetchTeams().subscribe(teams => approvalTeam = teams[0]);

        component._data.isEdit = true;

        component._setSelectedTeam(approvalTeam);
        component._confirmSelectedTeam();

        expect(component._data.node.approvalTeamId).toEqual(approvalTeam.id);
        expect(component._data.node.description).toEqual(approvalTeam.name);
        expect(viewServiceSpy).toHaveBeenCalled();
    });
});
