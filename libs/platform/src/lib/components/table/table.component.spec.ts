import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    DialogModule,
    ListModule,
    PopoverModule,
    RtlService,
    TableModule,
    CheckboxModule
} from '@fundamental-ngx/core';

import { TableComponent } from './table.component';
import { CollectionStringFilterStrategy, SelectionMode, SortDirection } from './enums';
import { TableDataProvider, TableDataSource } from './domain';
import { TableState } from './interfaces';
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
                imports: [
                    FormsModule,
                    ReactiveFormsModule,
                    TableModule,
                    CheckboxModule,
                    PopoverModule,
                    ListModule,
                    DialogModule
                ],
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

        const resetSpy = spyOn(<any>component, '_reset').and.callThrough();
        const emitChangeSpy = spyOn(<any>component, '_emitSelectionChange').and.stub();

        component.select(0, (<any>component)._rows[0], true);

        expect(resetSpy).toHaveBeenCalled();
        expect(emitChangeSpy).toHaveBeenCalledWith(0);
        expect(component._checkedAll).toBeFalse();
        expect((<any>component)._checked.length).toEqual(1);

        component.select(1, (<any>component)._rows[1], true);

        expect(resetSpy).toHaveBeenCalled();
        expect(emitChangeSpy).toHaveBeenCalledWith(1);
        expect(component._checkedAll).toBeFalse();
        expect((<any>component)._checked.length).toEqual(1);
        expect((<any>component)._rows.filter((r) => r.checked).length).toEqual(2);
    });

    it('should select single row', () => {
        component.selectionMode = SelectionMode.SINGLE;
        component.ngAfterViewInit();

        const resetSpy = spyOn(<any>component, '_reset').and.callThrough();
        const emitChangeSpy = spyOn(<any>component, '_emitSelectionChange').and.stub();

        component.selectSingle(0, (<any>component)._rows[0]);

        expect(resetSpy).toHaveBeenCalled();
        expect(emitChangeSpy).toHaveBeenCalledWith(0);
        expect((<any>component)._checked.length).toEqual(1);
        expect((<any>component)._rows.filter((r) => r.checked).length).toEqual(1);

        component.selectSingle(1, (<any>component)._rows[1]);

        expect(resetSpy).toHaveBeenCalled();
        expect(emitChangeSpy).toHaveBeenCalledWith(1);
        expect((<any>component)._checked.length).toEqual(1);
        expect((<any>component)._rows.filter((r) => r.checked).length).toEqual(1);
    });

    it('should unselect row on the second selection call', () => {
        component.selectionMode = SelectionMode.SINGLE;
        component.ngAfterViewInit();

        const resetSpy = spyOn(<any>component, '_reset').and.callThrough();
        const emitChangeSpy = spyOn(<any>component, '_emitSelectionChange').and.stub();

        component.selectSingle(0, (<any>component)._rows[0]);

        expect(resetSpy).toHaveBeenCalled();
        expect(emitChangeSpy).toHaveBeenCalledWith(0);
        expect((<any>component)._checked.length).toEqual(1);
        expect((<any>component)._rows.filter((r) => r.checked).length).toEqual(1);

        component.selectSingle(0, (<any>component)._rows[0]);

        expect(resetSpy).toHaveBeenCalled();
        expect(emitChangeSpy).toHaveBeenCalledWith(0);
        expect((<any>component)._checked.length).toEqual(0);
        expect((<any>component)._unchecked.length).toEqual(1);
        expect((<any>component)._rows.filter((r) => r.checked).length).toEqual(0);
    });

    it('should select all rows and unselect on the second call', () => {
        component.selectionMode = SelectionMode.MULTIPLE;
        component.ngAfterViewInit();

        const resetSpy = spyOn(<any>component, '_reset').and.callThrough();
        const checkAllSpy = spyOn(<any>component, '_checkAll').and.callThrough();
        const uncheckAllSpy = spyOn(<any>component, '_uncheckAll').and.callThrough();
        const emitChangeSpy = spyOn(<any>component, '_emitSelectionChange').and.stub();

        component.selectAll(true);

        expect(resetSpy).toHaveBeenCalled();
        expect(checkAllSpy).toHaveBeenCalled();
        expect(emitChangeSpy).toHaveBeenCalled();
        expect(component._checkedAll).toBeTrue();
        expect((<any>component)._checked.length).toEqual((<any>component)._rows.length);
        expect((<any>component)._rows.filter((r) => r.checked).length).toEqual((<any>component)._rows.length);

        component.selectAll(false);

        expect(resetSpy).toHaveBeenCalled();
        expect(uncheckAllSpy).toHaveBeenCalled();
        expect(emitChangeSpy).toHaveBeenCalled();
        expect(component._checkedAll).toBeFalse();
        expect((<any>component)._unchecked.length).toEqual((<any>component)._rows.length);
        expect((<any>component)._rows.filter((r) => r.checked).length).toEqual(0);
    });

    it('sort method should call TableService.sort with a proper params', () => {
        const field = 'price.value';
        const direction = SortDirection.ASC;
        const serviceSortSpy = spyOn(tableService, 'sort').and.stub();

        component.sort(field, direction);

        expect(serviceSortSpy).toHaveBeenCalledWith(field, direction);
        expect(component._popoverOpen).toBeFalse();
    });

    it('filter method should call TableService.filter with a proper params', () => {
        const field = 'status';
        const value = 'valid';
        const serviceFilterSpy = spyOn(tableService, 'filter').and.stub();

        component.filter(field, value);

        expect(serviceFilterSpy).toHaveBeenCalledWith([
            {
                field: field,
                value: value,
                strategy: CollectionStringFilterStrategy.CONTAINS
            }
        ]);
        expect(component._popoverOpen).toBeFalse();
    });

    it('group method should call TableService.group with a proper params', () => {
        const field = 'price.value';
        const direction = SortDirection.ASC;
        const serviceGroupSpy = spyOn(tableService, 'group').and.stub();

        component.group(field);

        expect(serviceGroupSpy).toHaveBeenCalledWith(field, direction);
        expect(component._popoverOpen).toBeFalse();
    });

    it('freezeTo method should call TableService.freezeTo and set freezable info', async () => {
        const columnKey = 'description';
        const serviceFreezeToSpy = spyOn(tableService, 'freezeTo').and.stub();
        const setFreezableInfoSpy = spyOn(<any>component, '_setFreezableInfo').and.callThrough();
        const getFreezableColumnsSpy = spyOn(<any>component, '_getFreezableColumn').and.stub();

        component.freezeTo(columnKey);

        expect(serviceFreezeToSpy).toHaveBeenCalledWith(columnKey);
        expect(component.freezeColumnsTo).toEqual(columnKey);
        expect(setFreezableInfoSpy).toHaveBeenCalled();
        expect(getFreezableColumnsSpy).toHaveBeenCalled();
        expect(component._selectionColumnsSize).toEqual(0);
        expect(component._tablePadding).toEqual(0);
    });

    it('unfreeze method should call TableService.freezeTo and set freezable info', async () => {
        (<any>component)._freezableColumns = ['name', 'description'];
        const columnKey = 'description';
        const idx = (<any>component)._freezableColumns.indexOf(columnKey);
        const freezeToKey = (<any>component)._freezableColumns[idx - 1];
        const serviceFreezeToSpy = spyOn(tableService, 'freezeTo').and.stub();
        const setFreezableInfoSpy = spyOn(<any>component, '_setFreezableInfo').and.callThrough();
        const getFreezableColumnsSpy = spyOn(<any>component, '_getFreezableColumn').and.stub();

        component.freezeTo(freezeToKey);

        expect(serviceFreezeToSpy).toHaveBeenCalledWith(freezeToKey);
        expect(component.freezeColumnsTo).toEqual(freezeToKey);
        expect(setFreezableInfoSpy).toHaveBeenCalled();
        expect(getFreezableColumnsSpy).toHaveBeenCalled();
        expect(component._selectionColumnsSize).toEqual(0);
        expect(component._tablePadding).toEqual(0);
    });
});
