import { QueryList } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from '../../table.component';
import { TableViewSettingsFilterComponent } from '../table-view-settings-filter/table-view-settings-filter.component';

import { TableViewSettingsDialogComponent } from './table-view-settings-dialog.component';

describe('TableViewSettingsDialogComponent', () => {
    let component: TableViewSettingsDialogComponent;
    let fixture: ComponentFixture<TableViewSettingsDialogComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TableViewSettingsDialogComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TableViewSettingsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add filters to table and keep it up to date', () => {
        const mockFilterComponent = {} as TableViewSettingsFilterComponent;
        const queryList = new QueryList<TableViewSettingsFilterComponent>();
        const mockTable: Partial<TableComponent<any>> = { setViewSettingsFilters: () => {} };
        const setViewSettingsFiltersSpy = spyOn(mockTable, 'setViewSettingsFilters').and.stub();

        queryList.reset([mockFilterComponent]);

        component.table = mockTable as TableComponent;
        component.filters = queryList;

        fixture.detectChanges();

        component._addFiltersToTable();

        expect(setViewSettingsFiltersSpy).toHaveBeenCalledTimes(1);
        expect(setViewSettingsFiltersSpy).toHaveBeenCalledWith(queryList.toArray());

        component.filters.notifyOnChanges();

        expect(setViewSettingsFiltersSpy).toHaveBeenCalledTimes(2);
        expect(setViewSettingsFiltersSpy).toHaveBeenCalledWith(queryList.toArray());
    });
});
