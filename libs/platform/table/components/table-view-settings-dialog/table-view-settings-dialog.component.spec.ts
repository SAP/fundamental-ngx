import { EventEmitter, QueryList, Signal, signal } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { DialogCloseResult, DialogRef, DialogService, FD_DIALOG_DISMISS_REASON } from '@fundamental-ngx/core/dialog';
import { SortDirection, Table, TableColumn, TableState } from '@fundamental-ngx/platform/table-helpers';
import { CombinedTableDialogData, TableViewSettingsDialogComponent } from './table-view-settings-dialog.component';
import { TableViewSettingsFilterComponent } from './table-view-settings-filter.component';

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
            | 'setColumns'
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
    setColumns(): void {}
    getTableState(): TableState {
        return {} as TableState;
    }
    getTableColumns(): TableColumn[] {
        return [];
    }
}

interface DialogRefMock<T> {
    closeResult: Signal<DialogCloseResult<T> | null>;
    dismiss: jest.Mock;
    closeWithValue: (value: T) => void;
    dismissWithReason: (reason: FD_DIALOG_DISMISS_REASON | string) => void;
}

function createDialogRefMock<T = Partial<CombinedTableDialogData>>(): DialogRefMock<T> {
    const closeResult = signal<DialogCloseResult<T> | null>(null);

    return {
        closeResult: closeResult.asReadonly(),
        dismiss: jest.fn(),
        closeWithValue: (value: T) => closeResult.set({ status: 'closed', value }),
        dismissWithReason: (reason: FD_DIALOG_DISMISS_REASON | string) =>
            closeResult.set({ status: 'dismissed', reason })
    };
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

        jest.spyOn(dialogServiceStub, 'open').mockReturnValue(createDialogRefMock() as any);
        jest.spyOn(component, 'showViewSettingsDialog');
        jest.spyOn(dialogRef, 'dismiss');

        component.table = mockTable as Table;
        mockTable.openTableSortSettings.emit();

        expect(dialogRef.dismiss).not.toHaveBeenCalled();
        expect(dialogServiceStub.open).toHaveBeenCalled();
    });

    it('should listen to table "open sort settings" event and call showViewSettingsDialog(dismiss any already opened dialog)', () => {
        const mockTable: Table = new TableComponentMock() as any;

        jest.spyOn(dialogServiceStub, 'open').mockReturnValue(createDialogRefMock() as any);
        jest.spyOn(component, 'showViewSettingsDialog');
        jest.spyOn(dialogRef, 'dismiss');

        component.table = mockTable as Table;
        component._dialogRef = { dismiss: jest.fn() } as any;
        mockTable.openTableSortSettings.emit();

        expect(dialogServiceStub.open).toHaveBeenCalled();
    });

    it('should listen to table "open group settings" event and call showViewSettingsDialog', () => {
        const mockTable: Table = new TableComponentMock() as any;

        jest.spyOn(dialogServiceStub, 'open').mockReturnValue(createDialogRefMock() as any);
        jest.spyOn(component, 'showViewSettingsDialog');
        jest.spyOn(dialogRef, 'dismiss');

        component.table = mockTable as Table;
        mockTable.openTableGroupSettings.emit();

        expect(dialogRef.dismiss).not.toHaveBeenCalled();
        expect(dialogServiceStub.open).toHaveBeenCalled();
    });

    it('should listen to table "open group settings" event and call showViewSettingsDialog (dismiss any already opened dialog)', () => {
        const mockTable: Table = new TableComponentMock() as any;

        jest.spyOn(dialogServiceStub, 'open').mockReturnValue(createDialogRefMock() as any);
        jest.spyOn(component, 'showViewSettingsDialog');
        jest.spyOn(dialogRef, 'dismiss');

        component.table = mockTable as Table;
        component._dialogRef = { dismiss: jest.fn() } as any;
        mockTable.openTableGroupSettings.emit();

        expect(dialogServiceStub.open).toHaveBeenCalled();
    });

    it('should listen to table "open filter settings" event and call showViewSettingsDialog', () => {
        const mockTable: Table = new TableComponentMock() as any;

        jest.spyOn(dialogServiceStub, 'open').mockReturnValue(createDialogRefMock() as any);
        jest.spyOn(component, 'showViewSettingsDialog');
        jest.spyOn(dialogRef, 'dismiss');

        component.table = mockTable as Table;
        mockTable.openTableFilterSettings.emit();

        expect(dialogRef.dismiss).not.toHaveBeenCalled();
        expect(dialogServiceStub.open).toHaveBeenCalled();
    });

    it('should listen to table "open filter settings" event and call showViewSettingsDialog (dismiss any already opened dialog)', () => {
        const mockTable: Table = new TableComponentMock() as any;

        jest.spyOn(dialogServiceStub, 'open').mockReturnValue(createDialogRefMock() as any);
        jest.spyOn(component, 'showViewSettingsDialog');
        jest.spyOn(dialogRef, 'dismiss');

        component.table = mockTable as Table;
        component._dialogRef = { dismiss: jest.fn() } as any;
        mockTable.openTableFilterSettings.emit();

        expect(dialogServiceStub.open).toHaveBeenCalled();
    });

    it('should listen to filters options and notify table if "filter settings" is available', () => {
        const mockFilterComponent = {} as TableViewSettingsFilterComponent;
        const queryList = new QueryList<TableViewSettingsFilterComponent>();
        const mockTable = new TableComponentMock();
        const setViewSettingsFiltersSpy = jest.spyOn(mockTable, 'showSettingsInToolbar').mockImplementation(() => {});

        queryList.reset([mockFilterComponent]);

        component.table = mockTable as any;
        component.filters = queryList;

        fixture.detectChanges();

        component.ngAfterViewInit();

        expect(setViewSettingsFiltersSpy).toHaveBeenCalledTimes(2);
        expect(setViewSettingsFiltersSpy).toHaveBeenCalledWith(true);

        queryList.reset([]);
        component.filters.notifyOnChanges();

        expect(setViewSettingsFiltersSpy).toHaveBeenCalledTimes(2); // not called again because the filters array length must be > 0
    });

    it('should listen to table columns stream and notify table if "sort settings" is available', () => {
        const mockTable = new TableComponentMock();
        const showSortSettingsInToolbarSpy = jest
            .spyOn(mockTable, 'showSettingsInToolbar')
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
            .spyOn(mockTable, 'showSettingsInToolbar')
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

        jest.spyOn(dialogServiceStub, 'open').mockReturnValue(createDialogRefMock() as any);
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
    });

    describe('closeResult handling', () => {
        let mockTable: TableComponentMock;

        beforeEach(() => {
            mockTable = new TableComponentMock();
            jest.spyOn(mockTable, 'getTableColumns').mockReturnValue([
                {
                    label: 'Name',
                    key: 'name',
                    name: 'name',
                    sortable: true,
                    filterable: true,
                    groupable: true
                } as TableColumn,
                {
                    label: 'Price',
                    key: 'price',
                    name: 'price',
                    sortable: false,
                    filterable: false,
                    groupable: false
                } as TableColumn
            ]);
            jest.spyOn(mockTable, 'getTableState').mockReturnValue({
                columns: ['name'],
                sortBy: [],
                filterBy: [],
                groupBy: []
            } as TableState);
            jest.spyOn(mockTable, 'sort');
            jest.spyOn(mockTable, 'filter');
            jest.spyOn(mockTable, 'group');
            jest.spyOn(mockTable, 'setColumns');

            component.table = mockTable as any;
        });

        it.each([FD_DIALOG_DISMISS_REASON.ESCAPE, FD_DIALOG_DISMISS_REASON.NAVIGATION_CHANGE])(
            'should ignore %s dismissal result without applying settings',
            (dismissReason) => {
                const dialogRefMock = createDialogRefMock();
                jest.spyOn(dialogServiceStub, 'open').mockReturnValue(dialogRefMock as any);

                component.showViewSettingsDialog();
                dialogRefMock.dismissWithReason(dismissReason);
                TestBed.flushEffects();

                expect(mockTable.sort).not.toHaveBeenCalled();
                expect(mockTable.filter).not.toHaveBeenCalled();
                expect(mockTable.group).not.toHaveBeenCalled();
                expect(mockTable.setColumns).not.toHaveBeenCalled();
            }
        );

        it('should ignore non-enum dismissal result without applying settings', () => {
            const dialogRefMock = createDialogRefMock();
            jest.spyOn(dialogServiceStub, 'open').mockReturnValue(dialogRefMock as any);

            component.showViewSettingsDialog();
            dialogRefMock.dismissWithReason('custom dismissal');
            TestBed.flushEffects();

            expect(mockTable.sort).not.toHaveBeenCalled();
            expect(mockTable.filter).not.toHaveBeenCalled();
            expect(mockTable.group).not.toHaveBeenCalled();
            expect(mockTable.setColumns).not.toHaveBeenCalled();
        });

        it('should stop observing a dialog after a dismissed terminal result', () => {
            const result = {
                sortingData: { sortBy: [{ field: 'name', direction: SortDirection.ASC }] },
                filteringData: null,
                includeExcludeFiltersData: null,
                groupingData: null,
                columnsData: null
            };
            const dialogRefMock = createDialogRefMock<typeof result>();

            jest.spyOn(dialogServiceStub, 'open').mockReturnValue(dialogRefMock as any);

            component.showViewSettingsDialog();
            dialogRefMock.dismissWithReason(FD_DIALOG_DISMISS_REASON.ESCAPE);
            TestBed.flushEffects();
            dialogRefMock.closeWithValue(result);
            TestBed.flushEffects();

            expect(mockTable.sort).not.toHaveBeenCalled();
            expect(mockTable.filter).not.toHaveBeenCalled();
            expect(mockTable.group).not.toHaveBeenCalled();
            expect(mockTable.setColumns).not.toHaveBeenCalled();
        });

        it('should apply settings when dialog closes with a result', () => {
            const result = {
                sortingData: { sortBy: [{ field: 'name', direction: SortDirection.ASC }] },
                filteringData: { filterBy: [{ field: 'name', value: 'test', strategy: 'contains', exclude: false }] },
                includeExcludeFiltersData: null,
                groupingData: { field: 'name', direction: SortDirection.DESC },
                columnsData: {
                    columns: [
                        { label: 'Price', key: 'price', name: 'price', visible: true },
                        { label: 'Name', key: 'name', name: 'name', visible: false }
                    ]
                }
            };
            const dialogRefMock = createDialogRefMock<typeof result>();

            jest.spyOn(dialogServiceStub, 'open').mockReturnValue(dialogRefMock as any);

            component.showViewSettingsDialog();
            dialogRefMock.closeWithValue(result);
            TestBed.flushEffects();

            expect(mockTable.sort).toHaveBeenCalledWith(result.sortingData.sortBy);
            expect(mockTable.filter).toHaveBeenCalledWith(result.filteringData.filterBy);
            expect(mockTable.group).toHaveBeenCalledWith([
                { field: 'name', direction: SortDirection.DESC, showAsColumn: true }
            ]);
            expect(mockTable.setColumns).toHaveBeenCalledWith(['price']);
        });
    });

    describe('columns functionality', () => {
        let mockTable: Table;
        const mockColumns: TableColumn[] = [
            { label: 'Name', key: 'name', name: 'name', visible: true } as TableColumn,
            { label: 'Description', key: 'description', name: 'description', visible: true } as TableColumn,
            { label: 'Price', key: 'price', name: 'price', visible: false } as TableColumn
        ];

        beforeEach(() => {
            mockTable = new TableComponentMock() as any;
            (mockTable as any).getTableColumns = jest.fn().mockReturnValue(mockColumns);
            (mockTable as any).getTableState = jest.fn().mockReturnValue({
                columns: ['name', 'description'],
                columnKeys: ['name', 'description'],
                sortBy: [],
                filterBy: [],
                groupBy: []
            } as TableState);
            (mockTable as any).setColumns = jest.fn();
        });

        it('should include columns data when opening settings dialog', () => {
            jest.spyOn(dialogServiceStub, 'open').mockReturnValue(createDialogRefMock() as any);

            component.table = mockTable;
            component.showViewSettingsDialog();

            const openCall = (dialogServiceStub.open as jest.Mock).mock.calls[0];
            const dialogConfig = openCall[1];
            expect(dialogConfig.data.columnsData).toBeDefined();
            expect(dialogConfig.data.columnsData.columns.length).toBe(3);

            // Check DOM - component should be rendered
            const nativeElement = fixture.nativeElement as HTMLElement;
            expect(nativeElement).toBeTruthy();
        });

        it('should read column visibility from table state', () => {
            jest.spyOn(dialogServiceStub, 'open').mockReturnValue(createDialogRefMock() as any);

            component.table = mockTable;
            component.showViewSettingsDialog();

            const openCall = (dialogServiceStub.open as jest.Mock).mock.calls[0];
            const columnsData = openCall[1].data.columnsData;

            expect(columnsData.columns[0].visible).toBe(true); // name
            expect(columnsData.columns[1].visible).toBe(true); // description
            expect(columnsData.columns[2].visible).toBe(false); // price

            // Check DOM - verify dialog service was called (dialog opens in separate container)
            expect(dialogServiceStub.open).toHaveBeenCalled();
        });

        it('should apply columns changes to table when dialog is confirmed', () => {
            const mockColumnsResult = {
                columns: [
                    { label: 'Name', key: 'name', name: 'name', visible: true },
                    { label: 'Price', key: 'price', name: 'price', visible: true },
                    { label: 'Description', key: 'description', name: 'description', visible: false }
                ]
            };
            const dialogRefMock = createDialogRefMock<Partial<CombinedTableDialogData>>();
            const dialogResult = {
                sortingData: null,
                filteringData: null,
                groupingData: null,
                columnsData: mockColumnsResult
            };

            jest.spyOn(dialogServiceStub, 'open').mockReturnValue(dialogRefMock as any);

            component.table = mockTable;
            component.showViewSettingsDialog();
            dialogRefMock.closeWithValue(dialogResult);
            TestBed.flushEffects();

            expect((mockTable as any).setColumns).toHaveBeenCalledWith(['name', 'price']);

            // Check DOM - verify component is in the fixture
            const nativeElement = fixture.nativeElement as HTMLElement;
            expect(nativeElement).toBeTruthy();
        });

        it('should preserve column order across dialog opens', () => {
            const firstDialogRefMock = createDialogRefMock<Partial<CombinedTableDialogData>>();
            const firstDialogResult = {
                sortingData: null,
                filteringData: null,
                groupingData: null,
                columnsData: {
                    columns: [
                        { label: 'Price', key: 'price', name: 'price', visible: true },
                        { label: 'Name', key: 'name', name: 'name', visible: true },
                        { label: 'Description', key: 'description', name: 'description', visible: false }
                    ]
                }
            };
            // First open - set custom order
            jest.spyOn(dialogServiceStub, 'open').mockReturnValueOnce(firstDialogRefMock as any);

            component.table = mockTable;
            component.showViewSettingsDialog();
            firstDialogRefMock.closeWithValue(firstDialogResult);
            TestBed.flushEffects();

            // Second open - should use stored order
            jest.spyOn(dialogServiceStub, 'open').mockReturnValueOnce(createDialogRefMock() as any);

            component.showViewSettingsDialog();

            const secondOpenCall = (dialogServiceStub.open as jest.Mock).mock.calls[1];
            const columnsData = secondOpenCall[1].data.columnsData;

            expect(columnsData.columns[0].name).toBe('price');
            expect(columnsData.columns[1].name).toBe('name');
            expect(columnsData.columns[2].name).toBe('description');

            // Check DOM - verify dialog service was called twice
            expect(dialogServiceStub.open).toHaveBeenCalledTimes(2);
        });

        it('should update visibility based on current state when reopening dialog', () => {
            const firstDialogRefMock = createDialogRefMock<Partial<CombinedTableDialogData>>();
            const firstDialogResult = {
                sortingData: null,
                filteringData: null,
                groupingData: null,
                columnsData: {
                    columns: [
                        { label: 'Name', key: 'name', name: 'name', visible: true },
                        { label: 'Description', key: 'description', name: 'description', visible: false },
                        { label: 'Price', key: 'price', name: 'price', visible: true }
                    ]
                }
            };
            // First open - hide description
            jest.spyOn(dialogServiceStub, 'open').mockReturnValueOnce(firstDialogRefMock as any);

            component.table = mockTable;
            component.showViewSettingsDialog();
            firstDialogRefMock.closeWithValue(firstDialogResult);
            TestBed.flushEffects();

            // Update table state to reflect new visibility
            (mockTable as any).getTableState = jest.fn().mockReturnValue({
                columns: ['name', 'price'],
                columnKeys: ['name', 'price']
            } as TableState);

            // Second open - should reflect current table state
            jest.spyOn(dialogServiceStub, 'open').mockReturnValueOnce(createDialogRefMock() as any);

            component.showViewSettingsDialog();

            const secondOpenCall = (dialogServiceStub.open as jest.Mock).mock.calls[1];
            const columnsData = secondOpenCall[1].data.columnsData;

            expect(columnsData.columns[0].visible).toBe(true); // name
            expect(columnsData.columns[1].visible).toBe(false); // description
            expect(columnsData.columns[2].visible).toBe(true); // price

            // Check DOM - verify dialog was opened twice with updated data
            expect(dialogServiceStub.open).toHaveBeenCalledTimes(2);
        });
    });
});
