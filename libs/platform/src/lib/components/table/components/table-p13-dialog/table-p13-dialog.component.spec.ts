import { QueryList } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { Table } from '../../table';
import { TableViewSettingsFilterComponent } from '../table-view-settings-dialog/table-view-settings-filter.component';

import { TableP13DialogComponent } from './table-p13-dialog.component';

describe('TableP13DialogComponent', () => {
    let component: TableP13DialogComponent;
    let fixture: ComponentFixture<TableP13DialogComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TableP13DialogComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TableP13DialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    /* it('should add filters to table and keep it up to date', () => {
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
    }); */
});
