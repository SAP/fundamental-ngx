import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { TableComponent } from '../table.component';
import {
    CollectionFilter,
    CollectionGroup,
    CollectionSort,
    SelectionMode,
    SortDirection,
    TableDataSource,
    TableRowClass,
    TableRowSelectionChangeEvent,
    TableState
} from '@fundamental-ngx/platform/table-helpers';
import { SourceItem, TableDataProviderMock } from './helpers';
import { PlatformTableModule } from '../table.module';

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
                <fdp-table-cell *fdpCellDef="let item">{{ item.price.value }} {{ item.price.currency }}</fdp-table-cell>
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
    rowsClass: TableRowClass = 'class';
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
                    index: [0],
                    all: false
                };

                expect(emitSpy).toHaveBeenCalledWith(event1);

                // Select second row
                tableRowCells2DArray[1][0].nativeElement.dispatchEvent(new MouseEvent('click'));

                const event2: TableRowSelectionChangeEvent<SourceItem> = {
                    source: tableComponent,
                    added: [tableComponent._tableRowsVisible[1].value],
                    removed: event1.added,
                    selection: [tableComponent._tableRowsVisible[1].value],
                    index: [1, 0],
                    all: false
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

                getSelectionCheckbox(tableRowCells2DArray[0][0]).nativeElement.dispatchEvent(new MouseEvent('click'));

                expect(tableComponent._tableRowsVisible[0].checked).toBeTrue();
            });

            it('should unselect by clicking on selected cell', () => {
                tableComponent._tableRowsVisible[0].checked = true;
                fixture.detectChanges();

                expect(tableComponent._tableRowsVisible[0].checked).toBeTrue();

                getSelectionCheckbox(tableRowCells2DArray[0][0]).nativeElement.dispatchEvent(new MouseEvent('click'));

                expect(tableComponent._tableRowsVisible[0].checked).toBeFalse();
            });

            it('should select new cell and keep previous ones', () => {
                getSelectionCheckbox(tableRowCells2DArray[0][0]).nativeElement.dispatchEvent(new MouseEvent('click'));
                getSelectionCheckbox(tableRowCells2DArray[1][0]).nativeElement.dispatchEvent(new MouseEvent('click'));

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
                    index: [0],
                    all: false
                };

                expect(emitSpy).toHaveBeenCalledWith(event1);

                // Select second row
                secondRowCheckbox.nativeElement.dispatchEvent(new MouseEvent('click'));

                const event2: TableRowSelectionChangeEvent<SourceItem> = {
                    source: tableComponent,
                    selection: [tableComponent._tableRowsVisible[0].value, tableComponent._tableRowsVisible[1].value],
                    added: [tableComponent._tableRowsVisible[1].value],
                    removed: [],
                    index: [1],
                    all: false
                };

                expect(emitSpy).toHaveBeenCalledWith(event2);

                // Unselect first row
                firstRowCheckbox.nativeElement.dispatchEvent(new MouseEvent('click'));

                const event3: TableRowSelectionChangeEvent<SourceItem> = {
                    source: tableComponent,
                    selection: [tableComponent._tableRowsVisible[1].value],
                    added: [],
                    removed: [tableComponent._tableRowsVisible[0].value],
                    index: [0],
                    all: false
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

            it('should create group row title as pattern "{{columnLabel}}: {{columnUniqueValue}}"', () => {
                tableComponent.group([
                    { field: 'status', direction: SortDirection.ASC, showAsColumn: true },
                    { field: 'isVerified', direction: SortDirection.ASC, showAsColumn: true }
                ]);

                fixture.detectChanges();
                calculateTableElementsMetaData();

                expect(tableRowCells2DArray[0][0].nativeElement.innerText).toContain('Status: invalid');
                expect(tableRowCells2DArray[1][0].nativeElement.innerText).toContain('Client Verified: false');

                expect(tableRowCells2DArray[27][0].nativeElement.innerText).toContain('Status: valid');
                expect(tableRowCells2DArray[28][0].nativeElement.innerText).toContain('Client Verified: true');
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
