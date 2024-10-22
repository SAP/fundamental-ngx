import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogConfig, DialogRef, DialogService } from '@fundamental-ngx/core/dialog';
import { SortDirection, Table } from '@fundamental-ngx/platform/table-helpers';

import { PlatformTableModule } from '../../../table.module';
import { SettingsDialogComponent } from './settings-dialog.component';
import {
    ActiveTab,
    FiltersDialogData, FiltersDialogResultData,
    SettingsGroupDialogData, SettingsGroupDialogResultData,
    SettingsSortDialogData,
    SettingsSortDialogResultData
} from '../table-view-settings.model';

describe('SettingsDialogComponent', () => {
    let component: SettingsDialogComponent;
    let fixture: ComponentFixture<SettingsDialogComponent>;
    const dialogRef = new DialogRef();
    dialogRef.data = {
        sortingData: { direction: SortDirection.ASC, field: 'name' } as SettingsSortDialogData,
        filteringData: { filterBy: [], columns: [], viewSettingsFilters: [] } as FiltersDialogData,
        groupingData: { direction: SortDirection.ASC, field: 'name', columns: [] } as SettingsGroupDialogData
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: DialogRef, useValue: dialogRef },
                { provide: Table, useValue: {} },
                DialogService,
                DialogConfig
            ],
            imports: [PlatformTableModule, NoopAnimationsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set initial sorting data from dialog data', () => {
        const expectedSortingData = {
                field: 'name',
                direction: SortDirection.ASC
            } as SettingsSortDialogData
        ;
        expect(component.sortingData()).toEqual(expectedSortingData);
    });

    it('should set initial filtering data from dialog data', () => {
        const expectedFilteringData = { filterBy: [], columns: [], viewSettingsFilters: [] };
        expect(component.filteringData()).toEqual(expectedFilteringData);
    });

    it('should set initial grouping data from dialog data', () => {
        const expectedGroupingData = { direction: SortDirection.ASC, field: 'name', columns: [] };
        expect(component.groupingData()).toEqual(expectedGroupingData);
    });

    it('should set the active tab based on the initial data', () => {
        expect(component.activeTab()).toEqual(ActiveTab.SORT);

        // Simulate sorting data being present
        component.sortingData.set({
            columns: [],
            direction: SortDirection.NONE,
            field: null,
            allowDisablingSorting: false
        });
        expect(component.activeTab()).toEqual(ActiveTab.SORT);

        component.activeTab.set(ActiveTab.FILTER);
        // Simulate filtering data being present
        component.filteringData.set({ filterBy: [] } as any);
        expect(component.activeTab()).toEqual(ActiveTab.FILTER);

        component.activeTab.set(ActiveTab.GROUP);
        // Simulate grouping data being present
        component.groupingData.set({ field: 'someField', direction: SortDirection.ASC } as any);
        expect(component.activeTab()).toEqual(ActiveTab.GROUP);
    });

    it('should reset sorting data to initial values', () => {
        component.sortingData.set({
            columns: [],
            direction: SortDirection.DESC,
            field: 'someField',
            allowDisablingSorting: true
        });
        component._initialSorting.set({ field: 'initialField', direction: SortDirection.ASC });
        component.reset();
        expect(component.sortingData()).toEqual({
            field: 'initialField',
            direction: SortDirection.ASC,
            columns: [],
            allowDisablingSorting: true
        });
    });

    it('should reset sorting data to initial values', () => {
        component.sortingData.set({
            columns: [],
            direction: SortDirection.DESC,
            field: 'someField',
            allowDisablingSorting: true
        });
        component._initialSorting.set({ field: 'initialField', direction: SortDirection.ASC });
        component.activeTab.set(ActiveTab.SORT);
        component.reset();
        expect(component.sortingData()).toEqual({
            ...component.sortingData(),
            ...component._initialSorting()
        } as any);
    });


    it('should reset filtering data to initial values', () => {
        component.filteringData.set({ filterBy: [{ field: 'someField', value: 'someValue' }] } as any);
        component._initialFilters.set([{ field: 'initialField', value: 'initialValue' }] as any);
        component.activeTab.set(ActiveTab.FILTER);
        component.reset();
        expect(component.filteringData()).toEqual({ filterBy: component._initialFilters() } as any);
    });

    it('should reset grouping data to initial values', () => {
        component.groupingData.set({ field: 'someField', direction: SortDirection.ASC } as any);
        component._initialGrouping.set({ field: 'initialGroupField', direction: SortDirection.DESC });
        component.activeTab.set(ActiveTab.GROUP);
        component.reset();
        expect(component.groupingData()).toEqual({
            field: 'initialGroupField',
            direction: SortDirection.DESC
        } as any);
    });

    it('should update sorting data on sort change', () => {
        const newSortData: SettingsSortDialogResultData = { field: 'newField', direction: SortDirection.ASC };
        component.onSortChange(newSortData);
        expect(component.sortingData()).toEqual({
            field: 'newField',
            direction: SortDirection.ASC,
        } as any);
    });

    it('should update filtering data on filter change', () => {
        const newFilterData = { filterBy: [{ field: 'filterField', value: 'filterValue' }] } as FiltersDialogResultData;
        component.onFilterChange(newFilterData);
        expect(component.filteringData()).toEqual({
            ...component.filteringData(),
            filterBy: [{ field: 'filterField', value: 'filterValue' }]
        } as any);
    });

    it('should update grouping data on group change', () => {
        const newGroupData = { field: 'groupField', direction: SortDirection.ASC } as SettingsGroupDialogResultData;
        component.onGroupChange(newGroupData);
        expect(component.groupingData()).toEqual({
            ...component.groupingData(),
            field: 'groupField',
            direction: SortDirection.ASC
        } as any);
    });

    it('should handle changes to reset availability', () => {
        component.onResetAvailabilityChange(true);
        expect(component.isResetAvailable$()).toBe(true);
    });
});
