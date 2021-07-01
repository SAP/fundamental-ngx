import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PlatformApprovalFlowModule } from '@fundamental-ngx/platform';

import { SelectionChangeEvent } from '../../list/list.component';
import { PlatformListModule } from '../../list/list.module';
import { StandardListItemModule } from '../../list/public_api';
import { ApprovalUser } from '../interfaces';
import { ApprovalFlowUserListComponent } from './approval-flow-user-list.component';


describe('ApprovalFlowTeamListComponent', () => {
    let component: ApprovalFlowUserListComponent;
    let fixture: ComponentFixture<ApprovalFlowUserListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ApprovalFlowUserListComponent],
            imports: [
                RouterModule,
                RouterTestingModule,
                PlatformApprovalFlowModule,
                PlatformListModule,
                StandardListItemModule
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ApprovalFlowUserListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should preselect users', () => {
        const approvalUsers: ApprovalUser[] = [{
            id: 'id1',
            name: 'name1'
        }];

        component.users = approvalUsers;
        component.selectedUsers = approvalUsers;

        fixture.detectChanges();
        
        component.ngAfterViewInit();

        expect(component._selectedItems.length).toEqual(approvalUsers.length);
    });

    it('should show team details', () => {
        const selectionEvent: SelectionChangeEvent = {
            selectedItems: [],
            index: 0
        };

        const userSelectionSpy = spyOn(component.onSelectionChange, 'emit').and.callThrough();

        component._onSelect(selectionEvent);

        expect(userSelectionSpy).toHaveBeenCalled();
        expect(component._selectedItems).toEqual(selectionEvent.selectedItems);
    });
});
