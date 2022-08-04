import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DialogConfig, DialogRef } from '@fundamental-ngx/core/dialog';
import { PlatformApprovalFlowModule } from '../approval-flow.module';
import {
    APPROVAL_FLOW_APPROVER_TYPES,
    ApprovalFlowAddNodeComponent,
    AddNodeDialogRefData
} from './approval-flow-add-node.component';
import { ApprovalNode, ApprovalTeam } from '../interfaces';
import { ApprovalFlowAddNodeViewService } from '../services/approval-flow-add-node-view.service';
import { ApprovalFlowTeamDataSource, ApprovalFlowUserDataSource } from '@fundamental-ngx/platform/shared';
import { TeamDataProvider, UserDataProvider } from '../tests/providers';
import { teams } from '../tests/data';

const node: ApprovalNode = {
    id: 'id1',
    name: 'name',
    approvers: [],
    status: 'not started',
    targets: []
};

describe('ApprovalFlowAddNodeComponent', () => {
    let component: ApprovalFlowAddNodeComponent;
    let fixture: ComponentFixture<ApprovalFlowAddNodeComponent>;

    const dialogRef = new DialogRef<AddNodeDialogRefData>();
    const dialogConfig = new DialogConfig();

    dialogRef.data = {
        userDetailsTemplate: null as any,
        rtl: false,
        node,
        teamDataSource: new ApprovalFlowTeamDataSource(new TeamDataProvider()),
        userDataSource: new ApprovalFlowUserDataSource(new UserDataProvider())
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PlatformApprovalFlowModule, BrowserAnimationsModule],
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
        const approversSpy = spyOn(component._data.userDataSource, 'match').and.callThrough();
        const teamsSpy = spyOn(component._data.teamDataSource, 'match').and.callThrough();

        component._data.isEdit = true;
        component._data.nodeTarget = 'before';

        component.ngOnInit();

        expect(approversSpy).toHaveBeenCalled();
        expect(teamsSpy).toHaveBeenCalled();
        expect(component._nodeType).toEqual('SERIAL');
    });

    it('should map users of the selected team to the node approvers', async () => {
        const team = teams[0];
        const teamMemberIds = team.members.map((member) => member.id).join(',');

        component._approverType = APPROVAL_FLOW_APPROVER_TYPES.EVERYONE;
        component._setSelectedTeam(team);
        component._confirmSelectedTeam();
        component._submit();

        const nodeApprovers = component._data.node?.approvers.map((approver) => approver.id).join(',');
        expect(nodeApprovers).toEqual(teamMemberIds);
    });

    it('should set selected approvers', () => {
        const approvers = [];

        const viewServiceSpy = spyOn(TestBed.inject(ApprovalFlowAddNodeViewService), 'resetView').and.callThrough();

        component._setSelectedApprovers(approvers);

        expect(component._data.node?.approvers).toEqual(approvers);
        expect(component._data.node?.variousTeams).toEqual(false);
        expect(viewServiceSpy).toHaveBeenCalled();
    });

    it('should confirm selected team', async () => {
        const viewServiceSpy = spyOn(TestBed.inject(ApprovalFlowAddNodeViewService), 'resetView').and.callThrough();

        const approvalTeam: ApprovalTeam = teams[0];
        component._data.isEdit = true;

        component._setSelectedTeam(approvalTeam);
        component._confirmSelectedTeam();

        expect(component._data.node?.approvalTeamId).toEqual(approvalTeam.id);
        expect(component._data.node?.description).toEqual(approvalTeam.name);
        expect(viewServiceSpy).toHaveBeenCalled();
    });
});
