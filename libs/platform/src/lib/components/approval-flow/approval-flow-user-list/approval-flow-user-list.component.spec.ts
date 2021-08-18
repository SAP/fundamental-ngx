import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformApprovalFlowModule } from '@fundamental-ngx/platform';

import { SelectionChangeEvent } from '../../list/list.component';
import { ApprovalUser } from '../interfaces';
import { ApprovalFlowUserListComponent } from './approval-flow-user-list.component';


describe('ApprovalFlowUserListComponent', () => {
    let component: ApprovalFlowUserListComponent;
    let fixture: ComponentFixture<ApprovalFlowUserListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PlatformApprovalFlowModule]
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

    it('should preselect users', async () => {
        const approvalUsers: ApprovalUser[] = [{
            id: 'id1',
            name: 'name1'
        }];

        component.users = approvalUsers;
        await fixture.whenStable();

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
