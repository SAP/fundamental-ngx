import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformApprovalFlowModule } from '../approval-flow.module';
import { ApprovalTeam } from '../interfaces';
import { ApprovalFlowTeamListComponent } from './approval-flow-team-list.component';

describe('ApprovalFlowTeamListComponent', () => {
    let component: ApprovalFlowTeamListComponent;
    let fixture: ComponentFixture<ApprovalFlowTeamListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PlatformApprovalFlowModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ApprovalFlowTeamListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show team details', () => {
        const approvalTeam: ApprovalTeam = {
            id: 'id1',
            name: 'name1',
            description: '',
            members: []
        };

        const teamSpy = jest.spyOn(component.onTeamClick, 'emit');

        component._showTeamDetails(approvalTeam);

        expect(teamSpy).toHaveBeenCalled();
    });
});
