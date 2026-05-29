import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DialogConfig, DialogRef, DialogService } from '@fundamental-ngx/core/dialog';
import { SortDirection, Table } from '@fundamental-ngx/platform/table-helpers';

import {
    ActiveTab,
    FiltersDialogData,
    FiltersDialogResultData,
    SettingsColumnsDialogData,
    SettingsColumnsDialogResultData,
    SettingsGroupDialogData,
    SettingsGroupDialogResultData,
    SettingsSortDialogData,
    SettingsSortDialogResultData
} from '../table-view-settings.model';
import { SettingsDialogComponent } from './settings-dialog.component';

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
        const mockTable = {
            getTableColumns: () => [],
            initialState: {}
        };
        TestBed.configureTestingModule({
            providers: [
                { provide: DialogRef, useValue: dialogRef },
                { provide: Table, useValue: mockTable },
                DialogService,
                DialogConfig
            ],
            imports: [SettingsDialogComponent]
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
        } as SettingsSortDialogData;
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
            direction: SortDirection.ASC
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

    describe('columns functionality', () => {
        const mockColumnsData: SettingsColumnsDialogData = {
            columns: [
                { label: 'Name', key: 'name', name: 'name', visible: true },
                { label: 'Description', key: 'description', name: 'description', visible: true },
                { label: 'Price', key: 'price', name: 'price', visible: false }
            ]
        };

        beforeEach(() => {
            dialogRef.data = {
                sortingData: null,
                filteringData: null,
                groupingData: null,
                columnsData: mockColumnsData,
                headingLevel: 2,
                allowColumnConfiguration: true
            };
            fixture = TestBed.createComponent(SettingsDialogComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should set initial columns data from dialog data', () => {
            expect(component.columnsData()).toEqual(mockColumnsData);

            // Check DOM - columns component should be rendered
            const nativeElement = fixture.nativeElement as HTMLElement;
            const columnsComponent = nativeElement.querySelector('fdp-columns');
            expect(columnsComponent).toBeTruthy();
        });

        it('should set active tab to columns when only columns data is present', () => {
            expect(component.activeTab()).toEqual(ActiveTab.COLUMNS);

            // Check DOM - no subheader should be shown when only one tab
            const nativeElement = fixture.nativeElement as HTMLElement;
            const segmentedButton = nativeElement.querySelector('fd-segmented-button');
            expect(segmentedButton).toBeFalsy();
        });

        it('should store columns changes without updating columnsData signal', () => {
            const originalColumnsData = component.columnsData();
            const newColumnsData: SettingsColumnsDialogResultData = {
                visibleColumns: ['name', 'price'],
                columnOrder: ['name', 'price', 'description'],
                columns: [
                    { label: 'Name', key: 'name', name: 'name', visible: true },
                    { label: 'Price', key: 'price', name: 'price', visible: true },
                    { label: 'Description', key: 'description', name: 'description', visible: false }
                ]
            };
            component.onColumnsChange(newColumnsData);

            // columnsData signal should NOT be updated (to avoid triggering child effect)
            expect(component.columnsData()).toBe(originalColumnsData);

            // But confirm() should return the new data
            const closeSpy = jest.spyOn(component['dialogRef'], 'close');
            component.confirm();
            expect(closeSpy).toHaveBeenCalledWith({
                sortingData: null,
                filteringData: null,
                groupingData: null,
                columnsData: { columns: newColumnsData.columns }
            });

            // Check DOM - columns component should still be rendered
            const nativeElement = fixture.nativeElement as HTMLElement;
            const columnsComponent = nativeElement.querySelector('fdp-columns');
            expect(columnsComponent).toBeTruthy();
        });

        it('should reset columns data to initial values', () => {
            const initialColumns: SettingsColumnsDialogResultData = {
                visibleColumns: ['name', 'description'],
                columnOrder: ['name', 'description', 'price'],
                columns: mockColumnsData.columns
            };
            component._initialColumns.set(initialColumns);

            // Change columns
            component.columnsData.set({
                columns: [
                    { label: 'Name', key: 'name', name: 'name', visible: false },
                    { label: 'Description', key: 'description', name: 'description', visible: true },
                    { label: 'Price', key: 'price', name: 'price', visible: true }
                ]
            });
            fixture.detectChanges();

            component.activeTab.set(ActiveTab.COLUMNS);
            component.reset();
            fixture.detectChanges();

            const resetColumns = component.columnsData()?.columns;
            expect(resetColumns?.[0].visible).toBe(true); // name
            expect(resetColumns?.[1].visible).toBe(true); // description
            expect(resetColumns?.[2].visible).toBe(false); // price

            // Check DOM - columns component should still be rendered after reset
            const nativeElement = fixture.nativeElement as HTMLElement;
            const columnsComponent = nativeElement.querySelector('fdp-columns');
            expect(columnsComponent).toBeTruthy();
        });

        it('should include columns data in confirm result', () => {
            const closeSpy = jest.spyOn(dialogRef, 'close');
            component.confirm();

            expect(closeSpy).toHaveBeenCalledWith({
                sortingData: null,
                filteringData: null,
                groupingData: null,
                columnsData: mockColumnsData
            });

            // Check DOM - dialog should have confirm button
            const nativeElement = fixture.nativeElement as HTMLElement;
            const buttonBars = nativeElement.querySelectorAll('fd-button-bar');
            expect(buttonBars.length).toBeGreaterThanOrEqual(1);
        });

        it('should show subheader when columns and sorting data are present', () => {
            dialogRef.data = {
                sortingData: { direction: SortDirection.ASC, field: 'name' } as SettingsSortDialogData,
                filteringData: null,
                groupingData: null,
                columnsData: mockColumnsData,
                headingLevel: 2,
                allowColumnConfiguration: true
            };
            fixture = TestBed.createComponent(SettingsDialogComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            expect(component.showSubheader()).toBe(true);

            // Check DOM - should render icon tab bar
            const nativeElement = fixture.nativeElement as HTMLElement;
            const iconTabBar = nativeElement.querySelector('fdp-icon-tab-bar');
            expect(iconTabBar).toBeTruthy();
        });
    });
});
