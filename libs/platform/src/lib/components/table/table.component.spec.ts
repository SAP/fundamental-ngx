import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, DebugElement, ViewChild } from '@angular/core';

import {
    ListModule,
    PopoverModule,
    RtlService,
    TableModule,
    CheckboxModule,
} from '@fundamental-ngx/core';

import { PlatformTableModule } from './table.module';
import { TableComponent } from './table.component';
import { FILTER_STRING_STRATEGY, SelectionMode, SortDirection } from './enums';
import { TableDataProvider, TableDataSource } from './domain';
import { CollectionFilter, CollectionGroup, CollectionSort, CollectionStringFilter, TableState } from './interfaces';
import { TableService } from './table.service';
import { PlatformButtonModule } from '../button/public_api';
import { By } from '@angular/platform-browser';
import { TableRowSelectionChangeEvent } from './models';

interface SourceItem {
    id: string;
    name: string;
    description: string;
    status: string;
    isVerified: boolean;
    price: {
        value: number;
        currency: string;
    };
}

const generateItems = (length = 50): SourceItem[] =>
    Array.from(Array(length)).map(
        (_, index): SourceItem => ({
            id: `${index}`,
            name: `Product ${index}`,
            description: `Description ${index}`,
            price: {
                value: index,
                currency: 'USD'
            },
            status: index < length / 2 ? 'valid' : 'invalid',
            isVerified: index < length / 2
        })
    );

class TableDataProviderMock extends TableDataProvider<SourceItem> {
    items = generateItems(50);
    totalItems = 50;

    fetch(state: TableState): Observable<SourceItem[]> {
        return of(this.items);
    }
}

describe('TableComponent internal', () => {
    let component: TableComponent;
    let fixture: ComponentFixture<TableComponent>;
    let tableService: TableService;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule, ReactiveFormsModule, TableModule, CheckboxModule, PopoverModule, ListModule],
                declarations: [TableComponent],
                providers: [RtlService]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TableComponent);
        component = fixture.componentInstance;

        component.dataSource = new TableDataSource(new TableDataProviderMock());
        tableService = (<any>component)._tableService;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should select two rows one by one', () => {
        component.selectionMode = SelectionMode.MULTIPLE;
        component.ngAfterViewInit();

        const emitChangeSpy = spyOn(component.rowSelectionChange, 'emit').and.stub();

        component._toggleSelectableRow(component._tableRows[0]);

        expect(emitChangeSpy).toHaveBeenCalled();

        component._toggleSelectableRow(component._tableRows[1]);

        expect(emitChangeSpy).toHaveBeenCalled();
        expect(component._tableRows.filter((r) => r.checked).length).toEqual(2);
    });

    it('should select single row', () => {
        component.selectionMode = SelectionMode.SINGLE;
        component.ngAfterViewInit();

        const emitChangeSpy = spyOn(component.rowSelectionChange, 'emit').and.stub();

        component._toggleSelectableRow(component._tableRows[0]);

        expect(emitChangeSpy).toHaveBeenCalled();
        expect(component._tableRows.filter((r) => r.checked).length).toEqual(1);

        component._toggleSelectableRow(component._tableRows[1]);

        expect(emitChangeSpy).toHaveBeenCalled();
        expect(component._tableRows.filter((r) => r.checked).length).toEqual(1);
    });

    it('should unselect row on the second selection call', () => {
        component.selectionMode = SelectionMode.SINGLE;
        component.ngAfterViewInit();

        component._toggleSelectableRow(component._tableRows[0]);

        expect(component._tableRows.filter((r) => r.checked).length).toEqual(1);

        component._toggleSelectableRow(component._tableRows[0]);

        expect(component._tableRows.filter((r) => r.checked).length).toEqual(0);
    });

    it('should select all rows and unselect on the second call', () => {
        component.selectionMode = SelectionMode.MULTIPLE;
        component.ngAfterViewInit();

        component._toggleAllSelectableRows(true);

        expect(component._tableRows.filter((r) => r.checked).length).toEqual(
            component._tableRows.filter(({ type }) => type === 'item').length
        );

        component._toggleAllSelectableRows(false);

        expect(component._tableRows.filter((r) => r.checked).length).toEqual(0);
    });

    it('sort by cell header method should call TableService.setSort with a proper params', () => {
        const field = 'price.value';
        const direction = SortDirection.ASC;
        const serviceSortSpy = spyOn(tableService, 'setSort').and.stub();

        component._columnHeaderSortBy(field, direction);

        expect(serviceSortSpy).toHaveBeenCalledWith([{ field: field, direction: direction }]);
    });

    it('filter by cell header method should call TableService.addFilters with a proper params', () => {
        const field = 'status';
        const value = 'valid';
        const payload: CollectionStringFilter = {
            field: field,
            value: value,
            strategy: FILTER_STRING_STRATEGY.CONTAINS,
            exclude: false
        };
        const serviceFilterSpy = spyOn(tableService, 'addFilters').and.stub();

        component._columnHeaderFilterBy(field, value);

        expect(serviceFilterSpy).toHaveBeenCalledWith([payload]);
    });

    it('group by cell header method should call TableService.setGroups with a proper params', () => {
        const field = 'price.value';
        const payload: CollectionGroup[] = [{ field: field, direction: SortDirection.NONE, showAsColumn: true }];
        const serviceGroupSpy = spyOn(tableService, 'setGroups').and.stub();

        component._columnHeaderGroupBy(field);

        expect(serviceGroupSpy).toHaveBeenCalledWith(payload);
    });

    it('freezeTo method should call TableService.freezeTo and set freezable info', async () => {
        const columnKey = 'description';
        const serviceFreezeToSpy = spyOn(tableService, 'freezeTo').and.stub();

        component.freezeToColumn(columnKey);

        expect(serviceFreezeToSpy).toHaveBeenCalledWith(columnKey);
        expect(component.freezeColumnsTo).toEqual(columnKey);
        expect(component._selectionColumnWidth).toEqual(0);
        expect(component._tablePadding).toEqual(0);
    });
});

(function (): void {
    @Component({
        template: `
            <fdp-table
                [dataSource]="source"
                contentDensity="compact"
                emptyTableMessage="No data found"
                [selectionMode]="selection"
            >
                <fdp-table-toolbar title="Order Items" [hideItemCount]="false"></fdp-table-toolbar>

                <fdp-column name="name" key="name" label="Name"></fdp-column>

                <fdp-column name="price" key="price.value">
                    <fdp-table-header *fdpHeaderCellDef>Price Header</fdp-table-header>
                    <fdp-table-cell *fdpCellDef="let item"
                        >{{ item.price.value }} {{ item.price.currency }}</fdp-table-cell
                    >
                </fdp-column>

                <fdp-column name="status" key="status" label="Status"></fdp-column>

                <fdp-column name="verified" key="isVerified" label="Client Verified"></fdp-column>
            </fdp-table>
        `
    })
    class TableHostComponent {
        @ViewChild(TableComponent) table: TableComponent;

        source = new TableDataSource(new TableDataProviderMock());
        selection: SelectionMode = SelectionMode.NONE;
    }

    describe('TableComponent Host', async () => {
        let hostComponent: TableHostComponent;
        let fixture: ComponentFixture<TableHostComponent>;
        let tableComponent: TableComponent<SourceItem>;
        let dataSourceLastFetchState: TableState;

        beforeEach(
            waitForAsync(() => {
                TestBed.configureTestingModule({
                    imports: [PlatformTableModule, PlatformButtonModule],
                    declarations: [TableHostComponent],
                    providers: [RtlService]
                }).compileComponents();
            })
        );

        beforeEach(() => {
            fixture = TestBed.createComponent(TableHostComponent);
            hostComponent = fixture.componentInstance;

            const originFetch = hostComponent.source.fetch;
            spyOn(hostComponent.source, 'fetch').and.callFake((state: TableState) => {
                dataSourceLastFetchState = state;
                return originFetch.call(hostComponent.source, state);
            });

            fixture.detectChanges();

            tableComponent = hostComponent.table;
        });

        let tableHeaderCells: DebugElement[] = [];
        let tableBodyRows: DebugElement[] = [];
        let tableRowCells2DArray: DebugElement[][] = [];

        const calculateTableElementsMetaData = () => {
            tableHeaderCells = fixture.debugElement.queryAll(By.css('.fd-table thead .fd-table__row .fd-table__cell'));
            tableBodyRows = fixture.debugElement.queryAll(By.css('.fd-table tbody .fd-table__row'));
            tableRowCells2DArray = tableBodyRows.map((row) => row.queryAll(By.css('.fd-table__cell')));
        };

        it('should create host element', () => {
            expect(hostComponent).toBeTruthy();
        });

        it('should render table', () => {
            expect(tableComponent).toBeTruthy();
        });

        describe('column template', () => {
            describe('header', () => {
                beforeEach(() => {
                    calculateTableElementsMetaData();
                });

                it('should be render using column.label option', () => {
                    const nameHeaderCell = tableHeaderCells[0];
                    expect(nameHeaderCell.nativeElement.innerText.trim()).toBe('Name');
                });

                it('should be render using fdpHeaderCellDef template option', () => {
                    const priceHeaderCell = tableHeaderCells[1];
                    expect(priceHeaderCell.nativeElement.innerText.trim()).toBe('Price Header');
                });
            });

            describe('cell', () => {
                beforeEach(() => {
                    calculateTableElementsMetaData();
                });

                it('should be render using column.key option', () => {
                    const nameCell = tableRowCells2DArray[0][0];
                    expect(nameCell.nativeElement.innerText.trim()).toBe(tableComponent._tableRows[0].value.name);
                });

                it('should be render using fdpHeaderCellDef template option', () => {
                    const priceCell = tableRowCells2DArray[0][1];
                    const price = tableComponent._tableRows[0].value.price;
                    expect(priceCell.nativeElement.innerText.trim()).toBe(`${price.value} ${price.currency}`);
                });
            });
        });

        describe('selection', () => {
            describe('column', () => {
                it('should be hidden when selectionMode="none"', () => {
                    hostComponent.selection = SelectionMode.NONE;

                    fixture.detectChanges();

                    calculateTableElementsMetaData();

                    expect(tableHeaderCells.length).toBe(4);
                });

                it('should be shown when selectionMode="single" or selectionMode="multiple"', () => {
                    hostComponent.selection = SelectionMode.SINGLE;

                    fixture.detectChanges();

                    calculateTableElementsMetaData();

                    expect(tableHeaderCells.length).toBe(5);

                    hostComponent.selection = SelectionMode.MULTIPLE;

                    fixture.detectChanges();

                    calculateTableElementsMetaData();

                    expect(tableHeaderCells.length).toBe(5);
                });
            });

            describe('single mode', () => {
                beforeEach(() => {
                    hostComponent.selection = SelectionMode.SINGLE;
                    fixture.detectChanges();
                });

                beforeEach(() => {
                    calculateTableElementsMetaData();
                });

                it('should select by clicking on unselected cell', () => {
                    tableComponent._tableRowsVisible[0].checked = false;
                    fixture.detectChanges();

                    const selectionCell = tableRowCells2DArray[0][0];

                    expect(tableComponent._tableRowsVisible[0].checked).toBeFalse();

                    selectionCell.nativeElement.dispatchEvent(new MouseEvent('click'));

                    expect(tableComponent._tableRowsVisible[0].checked).toBeTrue();
                });

                it('should unselect by clicking on selected cell', () => {
                    tableComponent._tableRowsVisible[0].checked = true;
                    fixture.detectChanges();

                    const selectionCell = tableRowCells2DArray[0][0];

                    expect(tableComponent._tableRowsVisible[0].checked).toBeTrue();

                    selectionCell.nativeElement.dispatchEvent(new MouseEvent('click'));

                    expect(tableComponent._tableRowsVisible[0].checked).toBeFalse();
                });

                it('should select new cell and unselected previous one', () => {
                    tableComponent._tableRowsVisible[0].checked = true;
                    fixture.detectChanges();

                    const newlySelectedCell = tableRowCells2DArray[1][0];

                    expect(tableComponent._tableRowsVisible[0].checked).toBeTrue();

                    newlySelectedCell.nativeElement.dispatchEvent(new MouseEvent('click'));

                    expect(tableComponent._tableRowsVisible[0].checked).toBeFalse();
                    expect(tableComponent._tableRowsVisible[1].checked).toBeTrue();
                });

                it('should emit RowSelectionChange event', () => {
                    const emitSpy = spyOn(tableComponent.rowSelectionChange, 'emit').and.callThrough();

                    // Select first row
                    tableRowCells2DArray[0][0].nativeElement.dispatchEvent(new MouseEvent('click'));

                    const event1: TableRowSelectionChangeEvent<SourceItem> = {
                        source: tableComponent,
                        added: [tableComponent._tableRowsVisible[0].value],
                        removed: [],
                        selection: [tableComponent._tableRowsVisible[0].value],
                        index: [0]
                    };

                    expect(emitSpy).toHaveBeenCalledWith(event1);

                    // Select second row
                    tableRowCells2DArray[1][0].nativeElement.dispatchEvent(new MouseEvent('click'));

                    const event2: TableRowSelectionChangeEvent<SourceItem> = {
                        source: tableComponent,
                        added: [tableComponent._tableRowsVisible[1].value],
                        removed: event1.added,
                        selection: [tableComponent._tableRowsVisible[1].value],
                        index: [1, 0]
                    };

                    expect(emitSpy).toHaveBeenCalledWith(event2);
                });
            });

            describe('multiple mode', () => {
                beforeEach(() => {
                    hostComponent.selection = SelectionMode.MULTIPLE;
                    fixture.detectChanges();
                });

                beforeEach(() => {
                    calculateTableElementsMetaData();
                });

                const getSelectionCheckbox = (selectionCell: DebugElement) => selectionCell.query(By.css('input'));
                const getSelectAllCheckbox = () => getSelectionCheckbox(tableHeaderCells[0]);

                it('should select by clicking on unselected cell', () => {
                    tableComponent._tableRowsVisible[0].checked = false;
                    fixture.detectChanges();

                    expect(tableComponent._tableRowsVisible[0].checked).toBeFalse();

                    getSelectionCheckbox(tableRowCells2DArray[0][0]).nativeElement.dispatchEvent(
                        new MouseEvent('click')
                    );

                    expect(tableComponent._tableRowsVisible[0].checked).toBeTrue();
                });

                it('should unselect by clicking on selected cell', () => {
                    tableComponent._tableRowsVisible[0].checked = true;
                    fixture.detectChanges();

                    expect(tableComponent._tableRowsVisible[0].checked).toBeTrue();

                    getSelectionCheckbox(tableRowCells2DArray[0][0]).nativeElement.dispatchEvent(
                        new MouseEvent('click')
                    );

                    expect(tableComponent._tableRowsVisible[0].checked).toBeFalse();
                });

                it('should select new cell and keep previous ones', () => {
                    getSelectionCheckbox(tableRowCells2DArray[0][0]).nativeElement.dispatchEvent(
                        new MouseEvent('click')
                    );
                    getSelectionCheckbox(tableRowCells2DArray[1][0]).nativeElement.dispatchEvent(
                        new MouseEvent('click')
                    );

                    expect(tableComponent._tableRowsVisible[0].checked).toBeTrue();
                    expect(tableComponent._tableRowsVisible[1].checked).toBeTrue();
                });

                it('should emit RowSelectionChange event', () => {
                    const emitSpy = spyOn(tableComponent.rowSelectionChange, 'emit').and.callThrough();
                    const firstRowCheckbox = getSelectionCheckbox(tableRowCells2DArray[0][0]);
                    const secondRowCheckbox = getSelectionCheckbox(tableRowCells2DArray[1][0]);

                    // Select first row
                    firstRowCheckbox.nativeElement.dispatchEvent(new MouseEvent('click'));

                    const event1: TableRowSelectionChangeEvent<SourceItem> = {
                        source: tableComponent,
                        selection: [tableComponent._tableRowsVisible[0].value],
                        added: [tableComponent._tableRowsVisible[0].value],
                        removed: [],
                        index: [0]
                    };

                    expect(emitSpy).toHaveBeenCalledWith(event1);

                    // Select second row
                    secondRowCheckbox.nativeElement.dispatchEvent(new MouseEvent('click'));

                    const event2: TableRowSelectionChangeEvent<SourceItem> = {
                        source: tableComponent,
                        selection: [
                            tableComponent._tableRowsVisible[0].value,
                            tableComponent._tableRowsVisible[1].value
                        ],
                        added: [tableComponent._tableRowsVisible[1].value],
                        removed: [],
                        index: [1]
                    };

                    expect(emitSpy).toHaveBeenCalledWith(event2);

                    // Unselect first row
                    firstRowCheckbox.nativeElement.dispatchEvent(new MouseEvent('click'));

                    const event3: TableRowSelectionChangeEvent<SourceItem> = {
                        source: tableComponent,
                        selection: [tableComponent._tableRowsVisible[1].value],
                        added: [],
                        removed: [tableComponent._tableRowsVisible[0].value],
                        index: [0]
                    };

                    expect(emitSpy).toHaveBeenCalledWith(event3);
                });

                it('should selectAll/unselectAll by clicking SelectAll cell', () => {
                    const selectAllCheckbox = getSelectAllCheckbox();
                    // Select all
                    selectAllCheckbox.nativeElement.dispatchEvent(new MouseEvent('click'));
                    fixture.detectChanges();
                    expect(tableComponent._tableRows.every((row) => row.checked)).toBeTrue();

                    // Unselect all
                    selectAllCheckbox.nativeElement.dispatchEvent(new MouseEvent('click'));
                    fixture.detectChanges();
                    expect(tableComponent._tableRows.every((row) => !row.checked)).toBeTrue();
                });
            });
        });

        describe('data source', () => {
            it('should be called once on initial phase and pass tableState', () => {
                expect(hostComponent.source.fetch).toHaveBeenCalledTimes(1);
                expect(hostComponent.source.fetch).toHaveBeenCalledWith(tableComponent.getTableState());
            });
        });

        describe('grouping', () => {
            describe('data source', () => {
                it('fetch should not be triggered when call table.group()', () => {
                    expect(hostComponent.source.fetch).toHaveBeenCalledTimes(1);

                    const groupBy: CollectionGroup[] = [
                        { field: 'status', direction: SortDirection.ASC, showAsColumn: true }
                    ];

                    tableComponent.group(groupBy);

                    expect(hostComponent.source.fetch).toHaveBeenCalledTimes(1);

                });
            });

            describe('not nested', () => {
                beforeEach(() => {
                    calculateTableElementsMetaData();
                });

                it('should add two group rows', () => {
                    expect(tableBodyRows.length).toBe(50);

                    tableComponent.group([{ field: 'status', direction: SortDirection.ASC, showAsColumn: true }]);

                    fixture.detectChanges();
                    calculateTableElementsMetaData();

                    expect(tableBodyRows.length).toBe(52);
                });

                it('should create group row title as pattern "{{columnUniqueValue}} - {{length}}"', () => {
                    tableComponent.group([{ field: 'status', direction: SortDirection.ASC, showAsColumn: true }]);

                    fixture.detectChanges();
                    calculateTableElementsMetaData();

                    expect(tableRowCells2DArray[0][0].nativeElement.innerText).toContain('invalid - 25');
                    expect(tableRowCells2DArray[26][0].nativeElement.innerText).toContain('valid - 25');
                });
            });

            describe('nested', () => {
                beforeEach(() => {
                    calculateTableElementsMetaData();
                });

                it('should add nested group rows', () => {
                    expect(tableBodyRows.length).toBe(50);

                    tableComponent.group([
                        { field: 'status', direction: SortDirection.ASC, showAsColumn: true },
                        { field: 'isVerified', direction: SortDirection.ASC, showAsColumn: true }
                    ]);

                    fixture.detectChanges();
                    calculateTableElementsMetaData();

                    expect(tableBodyRows.length).toBe(54);
                });

                it('should create group row title as pattern "{{columnLabel}} : {{columnUniqueValue}}"', () => {
                    tableComponent.group([
                        { field: 'status', direction: SortDirection.ASC, showAsColumn: true },
                        { field: 'isVerified', direction: SortDirection.ASC, showAsColumn: true }
                    ]);

                    fixture.detectChanges();
                    calculateTableElementsMetaData();

                    expect(tableRowCells2DArray[0][0].nativeElement.innerText).toContain('Status : invalid');
                    expect(tableRowCells2DArray[1][0].nativeElement.innerText).toContain('Client Verified : false');

                    expect(tableRowCells2DArray[27][0].nativeElement.innerText).toContain('Status : valid');
                    expect(tableRowCells2DArray[28][0].nativeElement.innerText).toContain('Client Verified : true');
                });
            });
        });

        describe('sorting', () => {
            beforeEach(() => {
                calculateTableElementsMetaData();
            });

            describe('data source', () => {
                it('fetch should be triggered when call table.sort()', () => {
                    const sortBy: CollectionSort[] = [
                        { field: 'status', direction: SortDirection.ASC }
                    ];

                    tableComponent.sort(sortBy);

                    expect(hostComponent.source.fetch).toHaveBeenCalledTimes(2);

                    expect(dataSourceLastFetchState.sortBy).toEqual(sortBy);
                });
            });

            it('should add sorting icon in sorted column header', () => {
                tableComponent.sort([
                    { field: 'name', direction: SortDirection.ASC },
                    { field: 'status', direction: SortDirection.DESC }
                ]);

                fixture.detectChanges();
                calculateTableElementsMetaData();

                expect(tableHeaderCells[0].query(By.css('.sap-icon--sort-ascending'))).toBeDefined();

                expect(tableHeaderCells[2].query(By.css('.sap-icon--sort-descending'))).toBeDefined();
            });
        });

        describe('filtering', () => {
            describe('data source', () => {
                it('fetch should be triggered when call table.filter()', () => {
                    const filterBy: CollectionFilter[] = [
                        { field: 'status', value: 'valid', strategy: 'equalTo', exclude: false }
                    ];

                    tableComponent.filter(filterBy);

                    expect(hostComponent.source.fetch).toHaveBeenCalledTimes(2);
                    
                    expect(dataSourceLastFetchState.filterBy).toEqual(filterBy);
                });
            });
        });

        describe('columns', () => {
            describe('data source', () => {
                it('fetch should not be triggered when call table.setColumns()', () => {
                    tableComponent.setColumns(['name', 'price', 'status']);

                    expect(hostComponent.source.fetch).toHaveBeenCalledTimes(1);                    
                });
            });

            it('should render only specific columns in right order', () => {
                tableComponent.setColumns(['name', 'status']);

                fixture.detectChanges();
                calculateTableElementsMetaData();

                expect(tableHeaderCells.length).toBe(2); 
                expect(tableHeaderCells[0].nativeElement.innerText.trim()).toBe('Name');                    
                expect(tableHeaderCells[1].nativeElement.innerText.trim()).toBe('Status');                    
            });
        });
    });
})();

(function (): void {
    @Component({
        template: `
            <fdp-table
                [dataSource]="source"
                contentDensity="compact"
                [initialSortBy]="initialSortBy"
                [initialFilterBy]="initialFilterBy"
                [initialGroupBy]="initialGroupBy"
                [initialVisibleColumns]="initialColumns"
            >
                <fdp-column name="name" key="name" label="Name"></fdp-column>
                <fdp-column name="description" key="description" label="Description"></fdp-column>
                <fdp-column name="status" key="status" label="Status"></fdp-column>
            </fdp-table>
        `
    })
    class TableHostComponent {
        @ViewChild(TableComponent) table: TableComponent;

        initialSortBy: CollectionSort[] = [{ field: 'name', direction: SortDirection.ASC }];
        initialFilterBy: CollectionFilter[] = [
            { field: 'name', value: 'Product 5', strategy: 'beginsWith', exclude: false }
        ];
        initialGroupBy: CollectionGroup[] = [{ field: 'status', direction: SortDirection.NONE, showAsColumn: true }];
        initialColumns: string[] = ['name', 'status'];

        source = new TableDataSource(new TableDataProviderMock());
    }

    describe('TableComponent Initial State', async () => {
        let hostComponent: TableHostComponent;
        let fixture: ComponentFixture<TableHostComponent>;
        let tableComponent: TableComponent<SourceItem>;

        beforeEach(
            waitForAsync(() => {
                TestBed.configureTestingModule({
                    imports: [PlatformTableModule],
                    declarations: [TableHostComponent],
                    providers: [RtlService]
                }).compileComponents();
            })
        );

        beforeEach(() => {
            fixture = TestBed.createComponent(TableHostComponent);
            hostComponent = fixture.componentInstance;
            spyOn(hostComponent.source, 'fetch').and.callThrough();

            fixture.detectChanges();

            tableComponent = hostComponent.table;
        });

        it('should apply initialSortBy option to table state', () => {
            expect(tableComponent.getTableState().sortBy).toEqual(hostComponent.initialSortBy);
        });

        it('should apply initialFilterBy option to table state', () => {
            expect(tableComponent.getTableState().filterBy).toEqual(hostComponent.initialFilterBy);
        });

        it('should apply initialGroupBy option to table state', () => {
            expect(tableComponent.getTableState().groupBy).toEqual(hostComponent.initialGroupBy);
        });

        it('should apply initialVisibleColumns option to table state', () => {
            expect(tableComponent.getTableState().columns).toEqual(hostComponent.initialColumns);
        });

        it('should apply initial options to table state and pass it to data source', () => {
            expect(hostComponent.source.fetch).toHaveBeenCalledTimes(1);
            expect(hostComponent.source.fetch).toHaveBeenCalledWith(tableComponent.getTableState());
        });
    });
})();
