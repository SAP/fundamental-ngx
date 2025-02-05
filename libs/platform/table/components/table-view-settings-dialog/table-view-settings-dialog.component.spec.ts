import { EventEmitter, QueryList } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';

import { SortDirection, Table, TableColumn, TableState } from '@fundamental-ngx/platform/table-helpers';
import { TableViewSettingsDialogComponent } from './table-view-settings-dialog.component';
import { TableViewSettingsFilterComponent } from './table-view-settings-filter.component';
import { DialogRef, DialogService } from '@fundamental-ngx/core/dialog';
import { FiltersDialogData, SettingsGroupDialogData, SettingsSortDialogResultData } from './table-view-settings.model';

class TableComponentMock
    implements
        Pick<
            Table,
            | 'search'
            | 'openTableSortSettings'
            | 'openTableFilterSettings'
            | 'openTableGroupSettings'
            | 'openTableColumnSettings'
            | 'tableColumnsStream'
            | 'showFilterSettingsInToolbar'
            | 'showSortSettingsInToolbar'
            | 'showGroupSettingsInToolbar'
            | 'getTableState'
            | 'getTableColumns'
            | 'sort'
            | 'group'
            | 'filter'
        >
{
    _tableColumnsSubject = new BehaviorSubject<TableColumn[]>([]);
    tableColumnsStream = this._tableColumnsSubject.asObservable();

    openTableSortSettings = new EventEmitter();
    openTableFilterSettings = new EventEmitter();
    openTableGroupSettings = new EventEmitter();
    openTableColumnSettings = new EventEmitter();

    showFilterSettingsInToolbar(): void {}
    showSortSettingsInToolbar(): void {}
    showGroupSettingsInToolbar(): void {}
    showSettingsInToolbar(): void {}
    group(): void {}
    search(): void {}
    sort(): void {}
    filter(): void {}
    getTableState(): TableState {
        return {} as TableState;
    }
    getTableColumns(): TableColumn[] {
        return [];
    }
}

describe('TableViewSettingsDialogComponent', () => {
    let component: TableViewSettingsDialogComponent;
    let fixture: ComponentFixture<TableViewSettingsDialogComponent>;
    let dialogServiceStub: Partial<DialogService>;
    const dialogRef = new DialogRef();

    beforeEach(waitForAsync(() => {
        dialogServiceStub = {
            open: jest.fn(),
            dismissAll: jest.fn()
        };

        TestBed.configureTestingModule({
            imports: [TableViewSettingsDialogComponent],
            providers: [
                { provide: DialogService, useValue: dialogServiceStub },
                { provide: DialogRef, useValue: dialogRef }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TableViewSettingsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should listen to table "open sort settings" event and call showViewSettingsDialog', () => {
        const mockTable: Table = new TableComponentMock() as any;
        const mockSortDialogResultData: SettingsSortDialogResultData = { direction: SortDirection.ASC,
            field: 'name',
        };

        jest.spyOn(dialogServiceStub, 'open').mockReturnValue({ afterClosed: of({ ...mockSortDialogResultData }), dismiss: jest.fn() } as any);
        jest.spyOn(component, 'showViewSettingsDialog');
        jest.spyOn(dialogRef, 'dismiss');

        component.table = mockTable as Table;
        mockTable.openTableSortSettings.emit();

        expect(dialogRef.dismiss).not.toHaveBeenCalled();
        expect(dialogServiceStub.open).toHaveBeenCalled();

        dialogRef.afterClosed.subscribe((result: SettingsSortDialogResultData) => {
            expect(result).toEqual(mockSortDialogResultData);
        });
    });

    it('should listen to table "open sort settings" event and call showViewSettingsDialog(dismiss any already opened dialog)', () => {
        const mockTable: Table = new TableComponentMock() as any;
        const mockSortDialogResultData: SettingsSortDialogResultData = { direction: SortDirection.ASC,
            field: 'name',
        };

        jest.spyOn(dialogServiceStub, 'open').mockReturnValue({ afterClosed: of({ ...mockSortDialogResultData }), dismiss: jest.fn() } as any);
        jest.spyOn(component, 'showViewSettingsDialog');
        jest.spyOn(dialogRef, 'dismiss');

        component.table = mockTable as Table;
        component._dialogRef = { dismiss: jest.fn() } as any;
        mockTable.openTableSortSettings.emit();

        expect(dialogServiceStub.open).toHaveBeenCalled();

        dialogRef.afterClosed.subscribe((result: SettingsSortDialogResultData) => {
            expect(result).toEqual(mockSortDialogResultData);
        });
    });

    it('should listen to table "open group settings" event and call showViewSettingsDialog', () => {
        const mockTable: Table = new TableComponentMock() as any;
        const mockGroupDialogResultData: SettingsGroupDialogData = {
            direction: SortDirection.ASC,
            field: 'name',
            columns: [{ label: 'Name', key: 'name' }]
        };

        jest.spyOn(dialogServiceStub, 'open').mockReturnValue({ afterClosed: of({ ...mockGroupDialogResultData }), dismiss: jest.fn() } as any);
        jest.spyOn(component, 'showViewSettingsDialog');
        jest.spyOn(dialogRef, 'dismiss');

        component.table = mockTable as Table;
        mockTable.openTableGroupSettings.emit();

        expect(dialogRef.dismiss).not.toHaveBeenCalled();
        expect(dialogServiceStub.open).toHaveBeenCalled();

        dialogRef.afterClosed.subscribe((result: SettingsGroupDialogData) => {
            expect(result).toEqual(mockGroupDialogResultData);
        });
    });

    it('should listen to table "open group settings" event and call showViewSettingsDialog (dismiss any already opened dialog)', () => {
        const mockTable: Table = new TableComponentMock() as any;
        const mockGroupDialogResultData: SettingsGroupDialogData = {
            direction: SortDirection.ASC,
            field: 'name',
            columns: [{ label: 'Name', key: 'name' }]
        };

        jest.spyOn(dialogServiceStub, 'open').mockReturnValue({ afterClosed: of({ ...mockGroupDialogResultData }), dismiss: jest.fn() } as any);
        jest.spyOn(component, 'showViewSettingsDialog');
        jest.spyOn(dialogRef, 'dismiss');

        component.table = mockTable as Table;
        component._dialogRef = { dismiss: jest.fn() } as any;
        mockTable.openTableGroupSettings.emit();

        expect(dialogServiceStub.open).toHaveBeenCalled();

        dialogRef.afterClosed.subscribe((result: SettingsGroupDialogData) => {
            expect(result).toEqual(mockGroupDialogResultData);
        });
    });

    it('should listen to table "open filter settings" event and call showViewSettingsDialog', () => {
        const mockTable: Table = new TableComponentMock() as any;

        class MockTableColumn implements Partial<TableColumn> {
            sortable = true;
            key = 'key';
            groupable = true;
            freezable = true;
            endFreezable = false;
            name = 'name';
            filterable = true;
        }
        const mockFilterDialogResultData: FiltersDialogData = {
            filterBy: [
                { field: 'status', value: 'valid', strategy: 'equalTo', exclude: false }
            ],
            columns: [
                new MockTableColumn() as TableColumn
            ],
            viewSettingsFilters: [] };

        jest.spyOn(dialogServiceStub, 'open').mockReturnValue({ afterClosed: of({ ...mockFilterDialogResultData }), dismiss: jest.fn() } as any);
        jest.spyOn(component, 'showViewSettingsDialog');
        jest.spyOn(dialogRef, 'dismiss');

        component.table = mockTable as Table;
        mockTable.openTableFilterSettings.emit();

        expect(dialogRef.dismiss).not.toHaveBeenCalled();
        expect(dialogServiceStub.open).toHaveBeenCalled();

        dialogRef.afterClosed.subscribe((result: FiltersDialogData) => {
            expect(result).toEqual(mockFilterDialogResultData);
        });
    });

    it('should listen to table "open filter settings" event and call showViewSettingsDialog (dismiss any already opened dialog)', () => {
        const mockTable: Table = new TableComponentMock() as any;

        class MockTableColumn implements Partial<TableColumn> {
            sortable = true;
            key = 'key';
            groupable = true;
            freezable = true;
            endFreezable = false;
            name = 'name';
            filterable = true;
        }
        const mockFilterDialogResultData: FiltersDialogData = {
            filterBy: [
                { field: 'status', value: 'valid', strategy: 'equalTo', exclude: false }
            ],
            columns: [
                new MockTableColumn() as TableColumn
            ],
            viewSettingsFilters: [] };

        jest.spyOn(dialogServiceStub, 'open').mockReturnValue({ afterClosed: of({ ...mockFilterDialogResultData }), dismiss: jest.fn() } as any);
        jest.spyOn(component, 'showViewSettingsDialog');
        jest.spyOn(dialogRef, 'dismiss');

        component.table = mockTable as Table;
        component._dialogRef = { dismiss: jest.fn() } as any;
        mockTable.openTableFilterSettings.emit();

        expect(dialogServiceStub.open).toHaveBeenCalled();

        dialogRef.afterClosed.subscribe((result: FiltersDialogData) => {
            expect(result).toEqual(mockFilterDialogResultData);
        });
    });

    it('should listen to filters options and notify table if "filter settings" is available', () => {
        const mockFilterComponent = {} as TableViewSettingsFilterComponent;
        const queryList = new QueryList<TableViewSettingsFilterComponent>();
        const mockTable = new TableComponentMock();
        const setViewSettingsFiltersSpy = jest
            .spyOn(mockTable, 'showFilterSettingsInToolbar')
            .mockImplementation(() => {});

        queryList.reset([mockFilterComponent]);

        component.table = mockTable as any;
        component.filters = queryList;

        fixture.detectChanges();

        component.ngAfterViewInit();

        expect(setViewSettingsFiltersSpy).toHaveBeenCalledTimes(1);
        expect(setViewSettingsFiltersSpy).toHaveBeenCalledWith(true);

        queryList.reset([]);
        component.filters.notifyOnChanges();

        expect(setViewSettingsFiltersSpy).toHaveBeenCalledTimes(2);
        expect(setViewSettingsFiltersSpy).toHaveBeenCalledWith(false);
    });

    it('should listen to table columns stream and notify table if "sort settings" is available', () => {
        const mockTable = new TableComponentMock();
        const showSortSettingsInToolbarSpy = jest
            .spyOn(mockTable, 'showSortSettingsInToolbar')
            .mockImplementation(() => {});

        component.table = mockTable as any;

        fixture.detectChanges();

        expect(showSortSettingsInToolbarSpy).toHaveBeenCalledTimes(1);
        expect(showSortSettingsInToolbarSpy).toHaveBeenCalledWith(false);

        mockTable._tableColumnsSubject.next([{ sortable: true } as TableColumn]);

        expect(showSortSettingsInToolbarSpy).toHaveBeenCalledTimes(2);
        expect(showSortSettingsInToolbarSpy).toHaveBeenCalledWith(true);
    });

    it('should listen to table columns stream and notify table if "group settings" is available', () => {
        const mockTable = new TableComponentMock();
        const showGroupSettingsInToolbarSpy = jest
            .spyOn(mockTable, 'showGroupSettingsInToolbar')
            .mockImplementation(() => {});

        component.table = mockTable as any;

        fixture.detectChanges();

        expect(showGroupSettingsInToolbarSpy).toHaveBeenCalledTimes(1);
        expect(showGroupSettingsInToolbarSpy).toHaveBeenCalledWith(false);

        mockTable._tableColumnsSubject.next([{ groupable: true } as TableColumn]);

        expect(showGroupSettingsInToolbarSpy).toHaveBeenCalledTimes(2);
        expect(showGroupSettingsInToolbarSpy).toHaveBeenCalledWith(true);
    });

    it('should open combined settings dialog with sorting, filtering, and grouping data', () => {
        const mockTable: Table = new TableComponentMock() as any;

        // Mock data for sorting, filtering, and grouping
        const mockSortDialogResultData: SettingsSortDialogResultData = { direction: SortDirection.ASC, field: 'name' };
        const mockGroupDialogResultData: SettingsGroupDialogData = {
            direction: SortDirection.ASC,
            field: 'name',
            columns: [{ label: 'Name', key: 'name' }]
        };
        const mockFilterDialogResultData: FiltersDialogData = {
            filterBy: [{ field: 'status', value: 'valid', strategy: 'equalTo', exclude: false }],
            columns: [{
                sortable: true,
                key: 'status',
                groupable: true,
                filterable: true,
                name: 'status'
            }] as TableColumn[],
            viewSettingsFilters: []
        };

        // Mock dialog service open to return combined result data
        jest.spyOn(dialogServiceStub, 'open').mockReturnValue({
            afterClosed: of({
                sortingData: mockSortDialogResultData,
                filteringData: mockFilterDialogResultData,
                groupingData: mockGroupDialogResultData
            }),
            dismiss: jest.fn()
        } as any);
        jest.spyOn(component, 'showViewSettingsDialog');
        jest.spyOn(dialogRef, 'dismiss');

        // Set the table and trigger the dialog opening
        component.table = mockTable as Table;
        mockTable.openTableFilterSettings.emit();
        mockTable.openTableSortSettings.emit();
        mockTable.openTableGroupSettings.emit();

        expect(dialogRef.dismiss).not.toHaveBeenCalled();
        expect(dialogServiceStub.open).toHaveBeenCalled();

        expect(dialogRef.dismiss).not.toHaveBeenCalled();

        // Verify that the dialog result is applied correctly
        dialogRef.afterClosed.subscribe((result) => {
            expect(result.sortingData).toEqual(mockSortDialogResultData);
            expect(result.filteringData).toEqual(mockFilterDialogResultData);
            expect(result.groupingData).toEqual(mockGroupDialogResultData);
        });
    });
});
