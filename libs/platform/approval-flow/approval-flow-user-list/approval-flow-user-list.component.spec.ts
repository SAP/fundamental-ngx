import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SimpleChanges } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ListComponent, SelectionChangeEvent, StandardListItemComponent } from '@fundamental-ngx/platform/list';
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
            index: 0
        };

        const userSelectionSpy = jest.spyOn(component.onSelectionChange, 'emit');

        component._onSelect(selectionEvent);

        expect(userSelectionSpy).toHaveBeenCalled();
        expect(component._selectedItems).toEqual(selectionEvent.selectedItems);
    });

    it('should render fdp-list with items when _displayUsers is not empty', fakeAsync(() => {
        component.users = [{ id: 'u1', name: 'Alice', teamId: 't1' }];
        component.ngOnChanges({ users: {} as any } as SimpleChanges);
        tick(100);
        fixture.detectChanges();
        const list = fixture.debugElement.query(By.directive(ListComponent));
        const items = fixture.debugElement.queryAll(By.directive(StandardListItemComponent));
        expect(list).toBeTruthy();
        expect(items.length).toBe(1);
    }));
    it('should render no-data list item when _displayUsers is empty', fakeAsync(() => {
        component.users = [];
        component.ngOnChanges({ users: {} as any } as SimpleChanges);
        tick(100);
        fixture.detectChanges();
        const items = fixture.debugElement.queryAll(By.directive(StandardListItemComponent));
        expect(items.length).toBe(1);
        expect(items[0].componentInstance.noDataText).toBe('No Data Found');
    }));

});
