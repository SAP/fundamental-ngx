import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

import { RtlService } from '@fundamental-ngx/cdk/utils';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';

import { TableDataProvider, TableDataSource } from './domain';
import { FILTER_STRING_STRATEGY, FilterableColumnDataType, SelectionMode, SortDirection, TableRowType } from './enums';
import { CollectionFilter, CollectionGroup, CollectionSort, CollectionStringFilter, TableState } from './interfaces';
import { TableRowClass, TableRowSelectionChangeEvent, TableRowToggleOpenStateEvent } from './models';
import { TableComponent } from './table.component';
import { PlatformTableModule } from './table.module';
import { TableService } from './table.service';

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

    fetch(): Observable<SourceItem[]> {
        return of(this.items);
    }
}

describe('TableComponent internal', () => {
    let component: TableComponent;
    let fixture: ComponentFixture<TableComponent>;
    let tableService: TableService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformTableModule],
            providers: [RtlService]
        }).compileComponents();
    }));

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

        component._toggleMultiSelectRow(component._tableRows[0]);

        expect(emitChangeSpy).toHaveBeenCalled();

        component._toggleMultiSelectRow(component._tableRows[1]);

        expect(emitChangeSpy).toHaveBeenCalled();
        expect(component._tableRows.filter((r) => r.checked).length).toEqual(2);
    });

    it('should select single row', () => {
        component.selectionMode = SelectionMode.SINGLE;
        component.ngAfterViewInit();

        const emitChangeSpy = spyOn(component.rowSelectionChange, 'emit').and.stub();

        component._toggleSingleSelectableRow(component._tableRows[0]);

        expect(emitChangeSpy).toHaveBeenCalled();
        expect(component._tableRows.filter((r) => r.checked).length).toEqual(1);

        component._toggleSingleSelectableRow(component._tableRows[1]);

        expect(emitChangeSpy).toHaveBeenCalled();
        expect(component._tableRows.filter((r) => r.checked).length).toEqual(1);
    });

    it('should unselect row on the second selection call', () => {
        component.selectionMode = SelectionMode.SINGLE;
        component.ngAfterViewInit();

        component._toggleSingleSelectableRow(component._tableRows[0]);

        expect(component._tableRows.filter((r) => r.checked).length).toEqual(1);

        component._toggleSingleSelectableRow(component._tableRows[0]);

        expect(component._tableRows.filter((r) => r.checked).length).toEqual(0);
    });

    it('should select all rows and unselect on the second call', () => {
        component.selectionMode = SelectionMode.MULTIPLE;
        component.ngAfterViewInit();

        component._toggleAllSelectableRows(true);

        expect(component._tableRows.filter((r) => r.checked).length).toEqual(
            component._tableRows.filter(({ type }) => type === TableRowType.ITEM).length
        );

        component._toggleAllSelectableRows(false);

        expect(component._tableRows.filter((r) => r.checked).length).toEqual(0);
    });

    it('sort by cell header method should call TableService.setSort with a proper params', () => {
        const field = 'price.value';
        const direction = SortDirection.ASC;
        const serviceSortSpy = spyOn(tableService, 'setSort').and.stub();

        component._columnHeaderSortBy(field, direction);

        expect(serviceSortSpy).toHaveBeenCalledWith([{ field, direction }]);
    });

    it('filter by cell header method should call TableService.addFilters with a proper params', () => {
        const field = 'status';
        const value = 'valid';
        const payload: CollectionStringFilter = {
            field,
            value,
            type: FilterableColumnDataType.STRING,
            strategy: FILTER_STRING_STRATEGY.CONTAINS,
            exclude: false
        };
        const serviceFilterSpy = spyOn(tableService, 'addFilters').and.stub();

        component._columnHeaderFilterBy(field, value);

        expect(serviceFilterSpy).toHaveBeenCalledWith([payload]);
    });

    it('group by cell header method should call TableService.setGroups with a proper params', () => {
        const field = 'price.value';
        const payload: CollectionGroup[] = [{ field, direction: SortDirection.NONE, showAsColumn: true }];
        const serviceGroupSpy = spyOn(tableService, 'setGroups').and.stub();

        component._columnHeaderGroupBy(field);

        expect(serviceGroupSpy).toHaveBeenCalledWith(payload);
    });

    it('freezeTo method should call TableService.freezeTo and set freezable info', async () => {
        const columnKey = 'description';
        const serviceFreezeToSpy = spyOn(tableService, 'freezeTo').and.stub();

        component.freezeToColumn(columnKey);

        expect(serviceFreezeToSpy).toHaveBeenCalledWith(columnKey, undefined);
        expect(component.freezeColumnsTo).toEqual(columnKey);
    });
});

(function (): void {
    @Component({
        template: `
            <fdp-table
                [dataSource]="source"
                fdCompact
                emptyTableMessage="No data found"
                [selectionMode]="selection"
                [rowsClass]="rowsClass"
            >
                <fdp-table-toolbar title="Order Items" [hideItemCount]="false"></fdp-table-toolbar>

                <fdp-column name="id" key="id" label="ID" *ngIf="showIdColumn"></fdp-column>

                <fdp-column name="name" key="name" label="Name" [width]="customColumnWidth + 'px'"></fdp-column>

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
        /** So big so table column won't grow on any device */
        customColumnWidth = 10000;
        rowsClass: TableRowClass<any> = 'class';
        showIdColumn = false;
    }

    describe('TableComponent Host', async () => {
        let hostComponent: TableHostComponent;
        let fixture: ComponentFixture<TableHostComponent>;
        let tableComponent: TableComponent<SourceItem>;
        let dataSourceLastFetchState: TableState;

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [PlatformTableModule, PlatformButtonModule, RouterModule, RouterTestingModule],
                declarations: [TableHostComponent],
                providers: [RtlService]
            }).compileComponents();
        }));

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

        const calculateTableElementsMetaData = (): void => {
            tableHeaderCells = fixture.debugElement.queryAll(
                By.css('.fdp-table__header .fd-table__row .fd-table__cell:not(.fd-table__cell--mock)')
            );
            tableBodyRows = fixture.debugElement.queryAll(By.css('.fdp-table__body tbody .fd-table__row'));
            tableRowCells2DArray = tableBodyRows.map((row) =>
                row.queryAll(By.css('.fd-table__cell:not(.fd-table__cell--mock)'))
            );
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

                it('should be render using column.width option', () => {
                    const nameCell = tableRowCells2DArray[0][0];
                    expect(nameCell.nativeElement.offsetWidth).toBe(hostComponent.customColumnWidth);
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

                const getSelectionCheckbox = (selectionCell: DebugElement): DebugElement =>
                    selectionCell.query(By.css('input'));
                const getSelectAllCheckbox = (): DebugElement => getSelectionCheckbox(tableHeaderCells[0]);

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
                    const sortBy: CollectionSort[] = [{ field: 'status', direction: SortDirection.ASC }];

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

            it('should render only specific columns in right order', fakeAsync(() => {
                tableComponent.setColumns(['name', 'status']);

                fixture.detectChanges();
                calculateTableElementsMetaData();

                expect(tableHeaderCells.length).toBe(2);
                expect(tableHeaderCells[0].nativeElement.innerText.trim()).toBe('Name');
                expect(tableHeaderCells[1].nativeElement.innerText.trim()).toBe('Status');

                hostComponent.showIdColumn = true;
                fixture.detectChanges();
                tick(200);

                calculateTableElementsMetaData();

                expect(tableHeaderCells.length).toBe(3);
                expect(tableHeaderCells[0].nativeElement.innerText.trim()).toBe('Name');
                expect(tableHeaderCells[1].nativeElement.innerText.trim()).toBe('Status');
                expect(tableHeaderCells[2].nativeElement.innerText.trim()).toBe('ID');
            }));
        });

        describe('navigation', () => {
            describe('data source', () => {
                it('fetch should not be triggered when call table.setColumns()', () => {
                    tableComponent.setColumns(['name', 'price', 'status']);

                    expect(hostComponent.source.fetch).toHaveBeenCalledTimes(1);
                });
            });

            it('should set and remove navigation', () => {
                const spy = spyOn(tableComponent.rowNavigate, 'emit').and.callThrough();

                tableComponent.setRowNavigation(0, true);

                fixture.detectChanges();
                calculateTableElementsMetaData();

                expect(tableHeaderCells.length).toBe(5);
                expect(tableRowCells2DArray[0][4].queryAll(By.css('.fd-table__icon')).length).toEqual(1);

                tableRowCells2DArray[0][4].nativeElement.click();

                expect(spy).toHaveBeenCalled();

                tableComponent.removeRowNavigation(0);

                fixture.detectChanges();
                calculateTableElementsMetaData();

                expect(tableHeaderCells.length).toBe(4);
            });
        });

        describe('rows', () => {
            describe('custom class', () => {
                it('should apply custom class using string value', () => {
                    const rowClass = 'rowClass';
                    hostComponent.rowsClass = rowClass;

                    fixture.detectChanges();
                    calculateTableElementsMetaData();

                    const rowsClassesAssigned = tableBodyRows.every((row) =>
                        row.nativeElement.classList.contains(rowClass)
                    );

                    expect(rowsClassesAssigned).toBeTrue();
                });

                it('should apply custom class using function', () => {
                    hostComponent.rowsClass = (row: SourceItem) => row.status;

                    fixture.detectChanges();
                    calculateTableElementsMetaData();

                    const rowsClassesAssigned = tableBodyRows.every((row, index) =>
                        row.nativeElement.classList.contains(hostComponent.table._tableRows[index].value.status)
                    );

                    expect(rowsClassesAssigned).toBeTrue();
                });
            });
        });
    });
})();

(function (): void {
    @Component({
        template: `
            <fdp-table
                [dataSource]="source"
                fdCompact
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

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [PlatformTableModule, RouterModule, RouterTestingModule],
                declarations: [TableHostComponent],
                providers: [RtlService]
            }).compileComponents();
        }));

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

(function (): void {
    class TableDataProviderWithPaging extends TableDataProvider<SourceItem> {
        private readonly ALL_ITEMS = generateItems(200);

        items: SourceItem[] = [];
        totalItems = 0;

        fetch(state: TableState): Observable<SourceItem[]> {
            const { currentPage, pageSize } = state.page;

            const items = [...this.ALL_ITEMS];

            this.totalItems = items.length;

            const startIndex = (currentPage - 1) * pageSize;
            this.items = items.slice(startIndex, startIndex + pageSize);

            return of(this.items);
        }
    }

    @Component({
        template: `
            <fdp-table [dataSource]="source" fdCompact [pageScrolling]="true" [pageSize]="50" bodyHeight="20rem">
                <fdp-column name="name" key="name" label="Name"></fdp-column>
                <fdp-column name="description" key="description" label="Description"></fdp-column>
                <fdp-column name="status" key="status" label="Status"></fdp-column>
            </fdp-table>
        `
    })
    class TableHostComponent {
        @ViewChild(TableComponent) table: TableComponent;

        source = new TableDataSource(new TableDataProviderWithPaging());
    }

    describe('TableComponent Page Scrolling', async () => {
        let hostComponent: TableHostComponent;
        let fixture: ComponentFixture<TableHostComponent>;
        let tableComponent: TableComponent<SourceItem>;

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [PlatformTableModule, RouterModule, RouterTestingModule],
                declarations: [TableHostComponent],
                providers: [RtlService]
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TableHostComponent);
            hostComponent = fixture.componentInstance;

            const originFetch = hostComponent.source.fetch;
            spyOn(hostComponent.source, 'fetch').and.callFake((state: TableState) =>
                originFetch.call(hostComponent.source, state)
            );

            fixture.detectChanges();

            tableComponent = hostComponent.table;
        });

        let tableBodyRows: DebugElement[] = [];
        let tableBodyContainer: DebugElement;

        const calculateTableElementsMetaData = (): void => {
            tableBodyRows = fixture.debugElement.queryAll(By.css('.fdp-table__body tbody .fd-table__row'));
            tableBodyContainer = fixture.debugElement.query(By.css('.fdp-table__body'));
        };

        const tableBodyScrollTop = async (scrollTop): Promise<void> => {
            const container = tableBodyContainer.nativeElement as HTMLElement;
            container.scrollTop = scrollTop;
            await new Promise((resolve) => setTimeout(() => resolve(null), 200));
            fixture.detectChanges();
            calculateTableElementsMetaData();
        };

        beforeEach(() => {
            calculateTableElementsMetaData();
        });

        it('should load first page at initial phase', () => {
            expect(tableBodyRows.length).toBe(50);
        });

        it('should apply "pageSize"=50 to table state', () => {
            expect(tableComponent.getTableState().page.pageSize).toEqual(50);
        });

        it('should have currentPage = 1 as default', () => {
            expect(tableComponent.getTableState().page.currentPage).toEqual(1);
        });

        it('should have table body height = 20rem', () => {
            expect(tableBodyContainer.styles.height).toBe('20rem');
            const container = tableBodyContainer.nativeElement as HTMLElement;
            expect(container.scrollHeight).toBeGreaterThan(container.clientHeight);
        });

        it('should not trigger fetch if scrolled not to the bottom', () => {
            expect(hostComponent.source.fetch).toHaveBeenCalledTimes(1); // 1 means initial fetch
            const container = tableBodyContainer.nativeElement as HTMLElement;
            container.scrollTop = 100;
            fixture.detectChanges();
            expect(hostComponent.source.fetch).toHaveBeenCalledTimes(1);
        });

        it('should trigger fetch when scrolled to the bottom', async () => {
            expect(hostComponent.source.fetch).toHaveBeenCalledTimes(1); // 1 means initial fetch
            const container = tableBodyContainer.nativeElement as HTMLElement;
            await tableBodyScrollTop(container.scrollHeight);
            expect(hostComponent.source.fetch).toHaveBeenCalledTimes(2);
        });

        // TODO: flaky test  https://github.com/SAP/fundamental-ngx/issues/7534
        xit('should get new 50 items per each request', async () => {
            await tableBodyScrollTop(999999);

            expect(tableBodyRows.length).toBe(100);

            await tableBodyScrollTop(999999);

            expect(tableBodyRows.length).toBe(150);
        });

        // TODO: flaky test  https://github.com/SAP/fundamental-ngx/issues/7534
        xit('should stop fetching on scroll if currentPage is the last one', async () => {
            await tableBodyScrollTop(999999); // 100
            await tableBodyScrollTop(999999); // 150
            await tableBodyScrollTop(999999); // 200

            expect(tableBodyRows.length).toBe(200);
            expect(hostComponent.source.fetch).toHaveBeenCalledTimes(4);

            // try one more
            await tableBodyScrollTop(0);
            await tableBodyScrollTop(999999);

            expect(tableBodyRows.length).toBe(200);
            expect(hostComponent.source.fetch).toHaveBeenCalledTimes(4);
        });
    });
})();

interface SourceTreeItem {
    name: string;
    children: SourceTreeItem[] | SourceItem[];
}

const treeItemParentsCount = 10;
const treeItemsChildrenPerParentCount = 1;
const totalTreeItems = treeItemParentsCount + treeItemParentsCount * treeItemsChildrenPerParentCount;

const generateTreeItems = (length = 50): SourceTreeItem[] =>
    Array.from(Array(length)).map(
        (_, index): SourceTreeItem => ({
            name: `${index}`,
            children: generateItems(treeItemsChildrenPerParentCount)
        })
    );

class TreeTableDataProviderMock extends TableDataProvider<SourceTreeItem> {
    items = generateTreeItems(treeItemParentsCount);
    totalItems = totalTreeItems;

    fetch(): Observable<SourceTreeItem[]> {
        return of(this.items);
    }
}

(function (): void {
    @Component({
        template: `
            <fdp-table
                fdCompact
                selectionMode="multiple"
                [dataSource]="source"
                [isTreeTable]="true"
                [relationKey]="relationKey"
            >
                <fdp-column name="name" key="name" label="Name"></fdp-column>
                <fdp-column name="description" key="description" label="Description"></fdp-column>
                <fdp-column name="status" key="status" label="Status"></fdp-column>
            </fdp-table>
        `
    })
    class TableHostComponent {
        @ViewChild(TableComponent) table: TableComponent;

        source = new TableDataSource(new TreeTableDataProviderMock());
        relationKey = 'children';
    }

    describe('TableComponent Tree View', async () => {
        let hostComponent: TableHostComponent;
        let fixture: ComponentFixture<TableHostComponent>;
        let tableComponent: TableComponent<SourceItem>;

        let tableBodyRows: DebugElement[] = [];
        let tableRowTogglerCellsArray: DebugElement[] = [];

        const calculateTableElementsMetaData = (): void => {
            tableBodyRows = fixture.debugElement.queryAll(By.css('.fdp-table__body tbody .fd-table__row'));
            tableRowTogglerCellsArray = fixture.debugElement.queryAll(
                By.css('.fdp-table__body tbody .fd-table__row .fd-table__cell--expand')
            );
        };

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [PlatformTableModule, RouterModule, RouterTestingModule],
                declarations: [TableHostComponent],
                providers: [RtlService]
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TableHostComponent);
            hostComponent = fixture.componentInstance;
            spyOn(hostComponent.source, 'fetch').and.callThrough();

            fixture.detectChanges();

            tableComponent = hostComponent.table;
        });

        beforeEach(() => {
            calculateTableElementsMetaData();
        });

        it('should generate rows for provided items', () => {
            expect(tableComponent._tableRows.length).toEqual(totalTreeItems);

            expect(tableRowTogglerCellsArray.length).toEqual(treeItemParentsCount);
        });

        describe('Collapsing/Expanding', () => {
            let firstRowToggler: DebugElement;
            let secondRowToggler: DebugElement;

            beforeEach(() => {
                calculateTableElementsMetaData();

                firstRowToggler = tableRowTogglerCellsArray[0];
                secondRowToggler = tableRowTogglerCellsArray[1];
            });

            it('should emit event when parent item collapsed/expanded', () => {
                const emitSpy = spyOn(tableComponent.rowToggleOpenState, 'emit').and.callThrough();

                firstRowToggler.nativeElement.dispatchEvent(new MouseEvent('click'));

                const event1 = new TableRowToggleOpenStateEvent<SourceItem>(
                    0,
                    tableComponent._tableRowsVisible[0].value,
                    true
                );

                expect(emitSpy).toHaveBeenCalledWith(event1);

                secondRowToggler.nativeElement.dispatchEvent(new MouseEvent('click'));

                const secondRowIndex = 1 + treeItemsChildrenPerParentCount;
                const event2 = new TableRowToggleOpenStateEvent<SourceItem>(
                    secondRowIndex,
                    tableComponent._tableRowsVisible[secondRowIndex].value,
                    true
                );

                expect(emitSpy).toHaveBeenCalledTimes(2);
                expect(emitSpy.calls.argsFor(1)).toEqual([event2]);
            });

            it('should react to toggling/collapsing with changing rows count', () => {
                firstRowToggler.nativeElement.dispatchEvent(new MouseEvent('click'));

                fixture.detectChanges();

                calculateTableElementsMetaData();

                expect(tableBodyRows.length).toEqual(treeItemParentsCount + treeItemsChildrenPerParentCount);

                secondRowToggler.nativeElement.dispatchEvent(new MouseEvent('click'));

                fixture.detectChanges();

                calculateTableElementsMetaData();

                expect(tableBodyRows.length).toEqual(treeItemParentsCount + treeItemsChildrenPerParentCount * 2);

                firstRowToggler.nativeElement.dispatchEvent(new MouseEvent('click'));

                fixture.detectChanges();

                calculateTableElementsMetaData();

                expect(tableBodyRows.length).toEqual(treeItemParentsCount + treeItemsChildrenPerParentCount);

                secondRowToggler.nativeElement.dispatchEvent(new MouseEvent('click'));

                fixture.detectChanges();

                calculateTableElementsMetaData();

                expect(tableBodyRows.length).toEqual(treeItemParentsCount);
            });
        });

        describe('Drag & Drop', () => {
            let firstRowToggler: DebugElement;

            beforeEach(() => {
                calculateTableElementsMetaData();

                firstRowToggler = tableRowTogglerCellsArray[0];
            });

            it('should rearrange table rows on drop', () => {
                firstRowToggler.nativeElement.dispatchEvent(new MouseEvent('click'));

                tableComponent._dragDropItemDrop({
                    items: [],
                    replacedItemIndex: 0,
                    draggedItemIndex: 1,
                    mode: 'group',
                    insertAt: 'after'
                });

                fixture.detectChanges();

                calculateTableElementsMetaData();

                expect(tableBodyRows.length).toEqual(treeItemParentsCount + treeItemsChildrenPerParentCount * 1);
            });

            it('should emit event after rearranging rows', () => {
                const emitSpy = spyOn(tableComponent.rowsRearrange, 'emit').and.callThrough();

                firstRowToggler.nativeElement.dispatchEvent(new MouseEvent('click'));

                tableComponent._dragDropItemDrop({
                    items: [],
                    replacedItemIndex: 0,
                    draggedItemIndex: 1,
                    mode: 'group',
                    insertAt: 'after'
                });

                fixture.detectChanges();

                expect(emitSpy).toHaveBeenCalled();
            });

            it('should update dragged rows attributes', () => {
                tableComponent._dragDropItemDrop({
                    items: [],
                    replacedItemIndex: 0,
                    draggedItemIndex: 1,
                    mode: 'group',
                    insertAt: 'after'
                });

                fixture.detectChanges();

                calculateTableElementsMetaData();

                expect(tableComponent._tableRows[0].expanded).toBeTrue();
                expect(tableComponent._tableRows[2].level).toEqual(1);
                expect(tableComponent._tableRows[3].level).toEqual(2);
            });

            it('should prevent from dropping row inside itself', () => {
                firstRowToggler.nativeElement.dispatchEvent(new MouseEvent('click'));

                fixture.detectChanges();

                calculateTableElementsMetaData();

                expect(tableBodyRows.length).toEqual(treeItemParentsCount + treeItemsChildrenPerParentCount * 1);

                tableComponent._dragDropItemDrop({
                    items: [],
                    replacedItemIndex: 1,
                    draggedItemIndex: 0,
                    mode: 'group',
                    insertAt: 'after'
                });

                fixture.detectChanges();

                calculateTableElementsMetaData();

                expect(tableComponent._tableRowsVisible[0].level).toEqual(0);
            });

            it('should change type for row with 0 children to "item"', () => {
                expect(tableRowTogglerCellsArray.length).toEqual(treeItemParentsCount);

                firstRowToggler.nativeElement.dispatchEvent(new MouseEvent('click'));

                fixture.detectChanges();

                tableComponent._dragDropItemDrop({
                    items: [],
                    replacedItemIndex: 2,
                    draggedItemIndex: 1,
                    mode: 'group',
                    insertAt: 'after'
                });

                fixture.detectChanges();

                calculateTableElementsMetaData();

                expect(tableRowTogglerCellsArray.length).toEqual(treeItemParentsCount - 1);
            });

            it('should have correct order of items before and after drag and drop', () => {
                const row1 = tableComponent._tableRowsVisible[0];
                const draggedRow = tableComponent._tableRowsVisible[1];
                const row3 = tableComponent._tableRowsVisible[2];

                tableComponent._dragDropItemDrop({
                    items: [],
                    replacedItemIndex: 2,
                    draggedItemIndex: 1,
                    mode: 'group',
                    insertAt: 'after'
                });

                fixture.detectChanges();

                expect(row1).toEqual(tableComponent._tableRowsVisible[0]);
                expect(draggedRow).toEqual(tableComponent._tableRowsVisible[3]);
                expect(row3).toEqual(tableComponent._tableRowsVisible[1]);
            });

            it('should correctly drag and drop first element to last element', () => {
                const draggedRow = tableComponent._tableRowsVisible[0];

                tableComponent._dragDropItemDrop({
                    items: [],
                    replacedItemIndex: 9,
                    draggedItemIndex: 0,
                    mode: 'group',
                    insertAt: 'after'
                });

                fixture.detectChanges();

                expect(draggedRow).toEqual(tableComponent._tableRowsVisible[10]);
            });

            it('should correctly drag and drop last element to first element', () => {
                const draggedRow = tableComponent._tableRowsVisible[9];

                tableComponent._dragDropItemDrop({
                    items: [],
                    replacedItemIndex: 0,
                    draggedItemIndex: 9,
                    mode: 'group',
                    insertAt: 'after'
                });

                fixture.detectChanges();

                expect(draggedRow).toEqual(tableComponent._tableRowsVisible[2]);
            });

            it('should correctly drag and drop first element to in-between', () => {
                const draggedRow = tableComponent._tableRowsVisible[0];

                tableComponent._dragDropItemDrop({
                    items: [],
                    replacedItemIndex: 5,
                    draggedItemIndex: 0,
                    mode: 'group',
                    insertAt: 'after'
                });

                fixture.detectChanges();

                expect(draggedRow).toEqual(tableComponent._tableRowsVisible[6]);
            });

            it('should correctly drag and drop last element to in-between', () => {
                const draggedRow = tableComponent._tableRowsVisible[9];

                tableComponent._dragDropItemDrop({
                    items: [],
                    replacedItemIndex: 5,
                    draggedItemIndex: 9,
                    mode: 'group',
                    insertAt: 'after'
                });

                fixture.detectChanges();

                expect(draggedRow.parent).toEqual(tableComponent._tableRowsVisible[5]);
            });
        });
    });
})();
