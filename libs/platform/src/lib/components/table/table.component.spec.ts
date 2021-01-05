import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListModule, PopoverModule, RtlService, TableModule, CheckboxModule } from '@fundamental-ngx/core';

import { TableComponent } from './table.component';
import { FILTER_STRING_STRATEGY, SelectionMode, SortDirection } from './enums';
import { TableDataProvider, TableDataSource } from './domain';
import { CollectionFilter, CollectionGroup, CollectionStringFilter, TableState } from './interfaces';
import { TableService } from './table.service';

interface SourceItem {
    id: string;
    name: string;
    description: string;
    status: string;
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
                value: Math.random() * (400 - 5) + 5,
                currency: 'USD'
            },
            status: 'valid'
        })
    );

class TableDataProviderMock extends TableDataProvider<SourceItem> {
    items = generateItems(50);
    totalItems = 50;

    fetch(tableState: TableState): Observable<SourceItem[]> {
        return of(this.items);
    }
}

describe('TableComponent', () => {
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
        tableService = component['_tableService'];
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
        expect(component._popoverOpen).toBeFalse();
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
        expect(component._popoverOpen).toBeFalse();
    });

    it('group by cell header method should call TableService.setGroups with a proper params', () => {
        const field = 'price.value';
        const payload: CollectionGroup[] = [{ field: field, direction: SortDirection.NONE, showAsColumn: true }];
        const serviceGroupSpy = spyOn(tableService, 'setGroups').and.stub();

        component._columnHeaderGroupBy(field);

        expect(serviceGroupSpy).toHaveBeenCalledWith(payload);
        expect(component._popoverOpen).toBeFalse();
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
