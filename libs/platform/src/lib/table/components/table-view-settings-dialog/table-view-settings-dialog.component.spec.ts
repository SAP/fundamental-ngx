import { EventEmitter, QueryList } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { DialogModule } from '@fundamental-ngx/core/dialog';

import { Table } from '../../table';
import { TableViewSettingsFilterComponent } from './table-view-settings-filter.component';
import { TableViewSettingsDialogComponent } from './table-view-settings-dialog.component';
import { TableColumn } from '../table-column/table-column';

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
    search(): void {}
}

describe('TableViewSettingsDialogComponent', () => {
    let component: TableViewSettingsDialogComponent;
    let fixture: ComponentFixture<TableViewSettingsDialogComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [DialogModule],
            declarations: [TableViewSettingsDialogComponent]
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

    it('should listen to table "open sort settings" event and call showSortingSettings', () => {
        const mockTable: Table = new TableComponentMock() as any;
        const showSettingsSpy = jest.spyOn(component, 'showSortingSettings');

        component.table = mockTable as Table;

        expect(showSettingsSpy).toHaveBeenCalledTimes(0);

        mockTable.openTableSortSettings.emit();

        expect(showSettingsSpy).toHaveBeenCalledTimes(1);
    });

    it('should listen to table "open group settings" event and call showGroupingSettings', () => {
        const mockTable: Table = new TableComponentMock() as any;
        const showSettingsSpy = jest.spyOn(component, 'showGroupingSettings');

        component.table = mockTable as Table;

        expect(showSettingsSpy).toHaveBeenCalledTimes(0);

        mockTable.openTableGroupSettings.emit();

        expect(showSettingsSpy).toHaveBeenCalledTimes(1);
    });

    it('should listen to table "open filter settings" event and call showFilteringSettings', () => {
        const mockTable: Table = new TableComponentMock() as any;
        const showSettingsSpy = jest.spyOn(component, 'showFilteringSettings');

        component.table = mockTable as Table;

        expect(showSettingsSpy).toHaveBeenCalledTimes(0);

        mockTable.openTableFilterSettings.emit();

        expect(showSettingsSpy).toHaveBeenCalledTimes(1);
    });

    it('should listen to filters options and notify table if "filter settings" is available', () => {
        const mockFilterComponent = {} as TableViewSettingsFilterComponent;
        const queryList = new QueryList<TableViewSettingsFilterComponent>();
        const mockTable = new TableComponentMock();
        const setViewSettingsFiltersSpy = jest.spyOn(mockTable, 'showFilterSettingsInToolbar');

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
        const showSortSettingsInToolbarSpy = jest.spyOn(mockTable, 'showSortSettingsInToolbar');

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
        const showGroupSettingsInToolbarSpy = jest.spyOn(mockTable, 'showGroupSettingsInToolbar');

        component.table = mockTable as any;

        fixture.detectChanges();

        expect(showGroupSettingsInToolbarSpy).toHaveBeenCalledTimes(1);
        expect(showGroupSettingsInToolbarSpy).toHaveBeenCalledWith(false);

        mockTable._tableColumnsSubject.next([{ groupable: true } as TableColumn]);

        expect(showGroupSettingsInToolbarSpy).toHaveBeenCalledTimes(2);
        expect(showGroupSettingsInToolbarSpy).toHaveBeenCalledWith(true);
    });
});
