import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionChangeEvent } from '@fundamental-ngx/platform/list';
import { ApprovalUser } from '../interfaces';
import { PlatformApprovalFlowModule } from '../approval-flow.module';
import { ApprovalFlowUserListComponent } from './approval-flow-user-list.component';
import { SimpleChanges } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('ApprovalFlowUserListComponent', () => {
    let component: ApprovalFlowUserListComponent;
    let fixture: ComponentFixture<ApprovalFlowUserListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PlatformApprovalFlowModule, RouterTestingModule]
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
        const approvalUsers: ApprovalUser[] = [
            {
                id: 'id1',
                teamId: 'teamId1',
                name: 'name1'
            }
        ];

        component.users = approvalUsers;
        await fixture.whenStable();

        component.selectedUsers = approvalUsers;

        component.ngOnChanges({ users: {} as any } as SimpleChanges);
        fixture.detectChanges();
        await fixture.whenRenderingDone();
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
