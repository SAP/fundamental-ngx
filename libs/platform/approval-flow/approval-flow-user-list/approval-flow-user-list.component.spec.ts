import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleChanges } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BaseListItem, SelectionChangeEvent } from '@fundamental-ngx/platform/list';
import { PlatformApprovalFlowModule } from '../approval-flow.module';
import { ApprovalUser } from '../interfaces';
import { ApprovalFlowUserListComponent } from './approval-flow-user-list.component';

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
            added: {} as BaseListItem,
            removed: {} as BaseListItem,
            index: 0
        };

        const userSelectionSpy = jest.spyOn(component.onSelectionChange, 'emit');

        component._onSelect(selectionEvent);

        expect(userSelectionSpy).toHaveBeenCalled();
        expect(component._selectedItems).toEqual(selectionEvent.selectedItems);
    });
});
