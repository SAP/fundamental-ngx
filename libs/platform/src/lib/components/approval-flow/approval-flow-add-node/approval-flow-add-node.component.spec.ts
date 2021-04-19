import { ChangeDetectorRef } from '@angular/core';
import { DialogConfig, DialogRef, FdDatetimeModule } from '@fundamental-ngx/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlatformApprovalFlowModule } from '@fundamental-ngx/platform';

import { ApprovalFlowAddNodeComponent, AddNodeDialogRefData, APPROVAL_FLOW_APPROVER_TYPES } from './approval-flow-add-node.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestApprovalFlowDataSource } from '../approval-flow.component.spec';
import { ApprovalNode, ApprovalTeam } from '../interfaces';

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
    let changeDetectorRef: ChangeDetectorRef;
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
        changeDetectorRef = fixture.componentRef.injector.get(ChangeDetectorRef);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
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
});
