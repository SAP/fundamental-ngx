import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TableP13DialogComponent } from './table-p13-dialog.component';
import { DialogRef, DialogService } from '@fundamental-ngx/core/dialog';
import { CollectionFilter, CollectionGroup, CollectionSort, SortDirection, Table, TableColumn, TableState } from '@fundamental-ngx/platform/table-helpers';
import { EventEmitter } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { SortDialogResultData } from './sorting/sorting.component';
import { FilterDialogResultData } from './filtering/filtering.model';
import { GroupDialogResultData } from './grouping/grouping.component';

describe('TableP13DialogComponent', () => {
    let component: TableP13DialogComponent;
    let fixture: ComponentFixture<TableP13DialogComponent>;
    let dialogServiceStub: Partial<DialogService>;
    const dialogRef = new DialogRef();

    beforeEach(waitForAsync(() => {
        dialogServiceStub = {
            open: jest.fn(),
            dismissAll: jest.fn()
          };
        TestBed.configureTestingModule({
            imports: [TableP13DialogComponent],
            providers: [ { provide: DialogService, useValue: dialogServiceStub }, { provide: DialogRef, useValue: dialogRef },]
        }).compileComponents();
    }));

    beforeEach(() => {
        class TableComponentMock
            implements
                Pick<
                    Table,
                    | 'search'
                    | 'openTableSortSettings'
                    | 'openTableFilterSettings'
                    | 'openTableGroupSettings'
                    | 'openTableColumnSettings'
                    | 'emptyRowAdded'
                    | 'save'
                    | 'cancel'
                    | 'presetChanged'
                    | 'expandAll'
                    | 'collapseAll'
                    | 'getTableState'
                    | 'getTableColumns'
                    | 'showSortSettingsInToolbar'
                    | 'showGroupSettingsInToolbar'
                    | 'showColumnSettingsInToolbar'
                    | 'showFilterSettingsInToolbar'
                    | 'setHeaderColumnFilteringDisabled'
                    | 'sort'
                    | 'filter'
                >
        {
            openTableSortSettings = new EventEmitter();
            openTableFilterSettings = new EventEmitter();
            openTableGroupSettings = new EventEmitter();
            openTableColumnSettings = new EventEmitter();
            _tableColumnsSubject = new BehaviorSubject<TableColumn[]>([]);
            tableColumnsStream = this._tableColumnsSubject.asObservable();
            emptyRowAdded = new EventEmitter();
            save = new EventEmitter();
            cancel = new EventEmitter();
            presetChanged = new EventEmitter();

            search(): void {}
            expandAll(): void {}
            collapseAll(): void {}
            showSortSettingsInToolbar(): void {}
            showGroupSettingsInToolbar(): void {}
            showColumnSettingsInToolbar(): void {}
            showFilterSettingsInToolbar(): void {}
            setHeaderColumnFilteringDisabled(): void {}
            sort(): void {}
            filter(): void {}
            getTableState(): TableState {
                return {} as TableState;
            }
            getTableColumns(): TableColumn[] {
                return [];
            } 
            
        }

        fixture = TestBed.createComponent(TableP13DialogComponent);
        component = fixture.componentInstance;
        component.table = new TableComponentMock() as any;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('showSortingSettings', () => {
        it('should show sorting settings dialog', () => {
            const mockCollectionSort: CollectionSort[] = [
                { field: 'status', direction: SortDirection.ASC },
             { field: 'name', direction: SortDirection.DESC },
             { field: 'grp', direction: SortDirection.ASC },];
            const mockSortDialogResultData: SortDialogResultData = { collectionSort: mockCollectionSort };
            
            jest.spyOn(dialogServiceStub, 'open').mockReturnValue({ afterClosed: of({ mockSortDialogResultData }) } as any);

            component.showSortingSettings();

            expect(dialogServiceStub.dismissAll).toHaveBeenCalled();
            expect(dialogServiceStub.open).toHaveBeenCalled();

            dialogRef.afterClosed.subscribe((result: SortDialogResultData) => {
                expect(result).toEqual(mockSortDialogResultData);
              });
        });
    });

    describe('showFilteringSettings', () => {
        it('should show filter settings dialog', () => {
            const mockCollectionFilter: CollectionFilter[] = [
                { field: 'status', value: 'valid', strategy: 'equalTo', exclude: false } ,
              { field: 'name', value: 'valid', strategy: 'equalTo', exclude: false }];
            const mockFilterDialogResultData: FilterDialogResultData = { collectionFilter: mockCollectionFilter };
            
            jest.spyOn(dialogServiceStub, 'open').mockReturnValue({ afterClosed: of({ mockFilterDialogResultData }) } as any);
            jest.spyOn(dialogServiceStub, 'open');

            component.showFilteringSettings();

            expect(dialogServiceStub.dismissAll).toHaveBeenCalled();
            expect(dialogServiceStub.open).toHaveBeenCalled();
        });
    });

    describe('showGroupingSettings', () => {
        it('should show group settings dialog', () => {
            const mockCollectionGroup: CollectionGroup[] = [
                 { field: 'status', direction: SortDirection.ASC, showAsColumn: true },
                   { field: 'name', direction: SortDirection.DESC, showAsColumn: true }];
            const mockGroupDialogResultData: GroupDialogResultData = { collectionGroup: mockCollectionGroup };
            
            jest.spyOn(dialogServiceStub, 'open').mockReturnValue({ afterClosed: of({ mockGroupDialogResultData }) } as any);
            jest.spyOn(dialogServiceStub, 'open');

            component.showGroupingSettings();

            expect(dialogServiceStub.dismissAll).toHaveBeenCalled();
            expect(dialogServiceStub.open).toHaveBeenCalled();
        });
    });
});
