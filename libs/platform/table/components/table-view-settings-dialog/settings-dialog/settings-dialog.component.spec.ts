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
        sortingData: { columns: [], allowDisablingSorting: true } as SettingsSortDialogData,
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
            columns: [],
            allowDisablingSorting: true
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
            allowDisablingSorting: true,
            sortBy: [{ field: 'someField', direction: SortDirection.DESC }]
        });
        component._initialSorting.set({ field: 'initialField', direction: SortDirection.ASC });
        component.reset();
        expect(component.sortingData()).toEqual({
            sortBy: [{ field: 'initialField', direction: SortDirection.ASC }],
            columns: [],
            allowDisablingSorting: true
        });
    });

    it('should reset sorting data to initial values when on sort tab', () => {
        component.sortingData.set({
            columns: [],
            allowDisablingSorting: true,
            sortBy: [{ field: 'someField', direction: SortDirection.DESC }]
        });
        component._initialSorting.set({ field: 'initialField', direction: SortDirection.ASC });
        component.activeTab.set(ActiveTab.SORT);
        component.reset();
        expect(component.sortingData()?.sortBy).toEqual([{ field: 'initialField', direction: SortDirection.ASC }]);
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
        const newSortData: SettingsSortDialogResultData = {
            sortBy: [{ field: 'newField', direction: SortDirection.ASC }]
        };
        component.onSortChange(newSortData);
        expect(component.sortingData()?.sortBy).toEqual([{ field: 'newField', direction: SortDirection.ASC }]);
    });

    it('should store sortBy array from sort change', () => {
        const newSortData: SettingsSortDialogResultData = {
            sortBy: [
                { field: 'name', direction: SortDirection.ASC },
                { field: 'description', direction: SortDirection.DESC }
            ]
        };
        component.onSortChange(newSortData);

        // Verify sortBy is stored by checking confirm result
        const closeSpy = jest.spyOn(component['dialogRef'], 'close');
        component.confirm();

        expect(closeSpy).toHaveBeenCalledWith(
            expect.objectContaining({
                sortingData: expect.objectContaining({
                    sortBy: [
                        { field: 'name', direction: SortDirection.ASC },
                        { field: 'description', direction: SortDirection.DESC }
                    ]
                })
            })
        );
    });

    it('should preserve existing sort settings when confirming without changes', () => {
        // Set up dialog with existing sort settings
        const existingSortBy = [
            { field: 'name', direction: SortDirection.ASC },
            { field: 'price', direction: SortDirection.DESC }
        ];
        dialogRef.data = {
            sortingData: {
                columns: [],
                allowDisablingSorting: true,
                sortBy: existingSortBy
            } as SettingsSortDialogData,
            filteringData: null,
            groupingData: null,
            columnsData: null,
            headingLevel: 2,
            allowColumnConfiguration: false
        };

        // Recreate component with new dialog data
        fixture = TestBed.createComponent(SettingsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        // Confirm WITHOUT calling onSortChange (simulating user clicking OK without modifications)
        const closeSpy = jest.spyOn(component['dialogRef'], 'close');
        component.confirm();

        // Should preserve the existing sort settings, not return empty array
        expect(closeSpy).toHaveBeenCalledWith(
            expect.objectContaining({
                sortingData: expect.objectContaining({
                    sortBy: existingSortBy
                })
            })
        );
    });

    it('should track sort validity and update dialog validity', () => {
        expect(component.isDialogValid()).toBe(true);

        component.onSortValidityChange(false);
        expect(component.isDialogValid()).toBe(false);

        component.onSortValidityChange(true);
        expect(component.isDialogValid()).toBe(true);
    });

    it('should disable OK button when invalid combobox input is provided', () => {
        // Set up sorting data with columns
        const sortingDataWithColumns: SettingsSortDialogData = {
            columns: [
                { label: 'Name', key: 'name' },
                { label: 'Description', key: 'description' },
                { label: 'Price', key: 'price' }
            ],
            allowDisablingSorting: true
        };
        component.sortingData.set(sortingDataWithColumns);
        fixture.detectChanges();

        // Initially, dialog should be valid and OK button enabled
        expect(component.isDialogValid()).toBe(true);
        const okButton = fixture.nativeElement.querySelector('fd-button-bar[fdType="emphasized"]');
        expect(okButton).toBeTruthy();
        expect(okButton.disabled).toBe(false);

        // Get the combobox input element inside the sorting component
        const comboboxInput = fixture.nativeElement.querySelector('fdp-sorting fd-combobox input');
        expect(comboboxInput).toBeTruthy();

        // Simulate typing invalid text that doesn't match any column
        comboboxInput.value = 'InvalidColumnName';
        comboboxInput.dispatchEvent(new Event('input', { bubbles: true }));

        // Trigger ngModelChange by dispatching input and change events
        const inputEvent = new Event('input', { bubbles: true });
        const changeEvent = new Event('change', { bubbles: true });
        comboboxInput.dispatchEvent(inputEvent);
        comboboxInput.dispatchEvent(changeEvent);

        // Need to trigger Angular's change detection and the combobox's internal logic
        // The combobox will call ngModelChange with the string value
        fixture.detectChanges();

        // Get the sorting component instance to trigger the validation
        const sortingComponent = fixture.debugElement.query(
            (el) => el.componentInstance?.constructor?.name === 'SortingComponent'
        )?.componentInstance;

        if (sortingComponent) {
            // Simulate what the combobox does: call _sortFieldChangeForRow with invalid string
            sortingComponent._sortFieldChangeForRow(0, 'InvalidColumnName');
            fixture.detectChanges();
        }

        // Dialog should become invalid and OK button disabled
        expect(component.isDialogValid()).toBe(false);
        expect(okButton.disabled).toBe(true);

        // Restore validity by selecting a valid column
        if (sortingComponent) {
            sortingComponent._sortFieldChangeForRow(0, sortingDataWithColumns.columns[0]);
            fixture.detectChanges();
        }

        // Dialog should be valid again and OK button enabled
        expect(component.isDialogValid()).toBe(true);
        expect(okButton.disabled).toBe(false);
    });

    it('should prevent confirm action when dialog is invalid', () => {
        const closeSpy = jest.spyOn(dialogRef, 'close');

        // Make dialog invalid
        component.onSortValidityChange(false);
        fixture.detectChanges();

        expect(component.isDialogValid()).toBe(false);

        // Try to confirm - button should be disabled
        const okButton = fixture.nativeElement.querySelector('fd-button-bar[fdType="emphasized"]');
        expect(okButton.disabled).toBe(true);

        // Clicking disabled button should not trigger confirm
        // (In real browser, disabled buttons don't fire click events, but we verify the state)
        expect(component.isDialogValid()).toBe(false);

        // Restore validity and confirm should work
        component.onSortValidityChange(true);
        fixture.detectChanges();

        expect(okButton.disabled).toBe(false);
        component.confirm();
        expect(closeSpy).toHaveBeenCalled();
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
            const iconTabBar = nativeElement.querySelector('fdp-icon-tab-bar');
            expect(iconTabBar).toBeFalsy();
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

        it('should show subheader with icon tab bar when columns and sorting data are present', () => {
            dialogRef.data = {
                sortingData: { columns: [], allowDisablingSorting: true } as SettingsSortDialogData,
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

        it('should handle tab selection correctly with icon tab bar', () => {
            dialogRef.data = {
                sortingData: { columns: [], allowDisablingSorting: true } as SettingsSortDialogData,
                filteringData: { filterBy: [], columns: [], viewSettingsFilters: [] } as FiltersDialogData,
                groupingData: { direction: SortDirection.ASC, field: 'name', columns: [] } as SettingsGroupDialogData,
                columnsData: mockColumnsData,
                headingLevel: 2,
                allowColumnConfiguration: true
            };
            fixture = TestBed.createComponent(SettingsDialogComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            // Initially should be on columns tab (first available)
            expect(component.activeTab()).toBe(ActiveTab.COLUMNS);

            // Simulate tab selection via icon tab bar
            component['onTabSelected']({ index: 1 }); // Sort tab
            expect(component.activeTab()).toBe(ActiveTab.SORT);

            component['onTabSelected']({ index: 2 }); // Filter tab
            expect(component.activeTab()).toBe(ActiveTab.FILTER);

            component['onTabSelected']({ index: 3 }); // Group tab
            expect(component.activeTab()).toBe(ActiveTab.GROUP);

            component['onTabSelected']({ index: 0 }); // Back to columns
            expect(component.activeTab()).toBe(ActiveTab.COLUMNS);
        });
    });

    describe('tab-based reset availability', () => {
        const mockData = {
            sortingData: { columns: [], allowDisablingSorting: true } as SettingsSortDialogData,
            filteringData: { filterBy: [], columns: [], viewSettingsFilters: [] } as FiltersDialogData,
            groupingData: { direction: SortDirection.ASC, field: 'name', columns: [] } as SettingsGroupDialogData,
            columnsData: {
                columns: [
                    { label: 'Name', key: 'name', name: 'name', visible: true },
                    { label: 'Price', key: 'price', name: 'price', visible: true }
                ]
            } as SettingsColumnsDialogData,
            headingLevel: 2 as const,
            allowColumnConfiguration: true
        };

        beforeEach(() => {
            dialogRef.data = mockData;
            fixture = TestBed.createComponent(SettingsDialogComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should track reset availability per tab independently', () => {
            // Initially on columns tab
            expect(component.activeTab()).toBe(ActiveTab.COLUMNS);
            expect(component.isResetAvailable$()).toBe(false);

            // Set reset availability for columns tab
            component['updateResetAvailability'](ActiveTab.COLUMNS, true);
            expect(component.isResetAvailable$()).toBe(true);

            // Switch to sort tab
            component['onTabSelected']({ index: 1 }); // Sort is index 1 (columns, sort, filter, group)
            expect(component.activeTab()).toBe(ActiveTab.SORT);
            // Reset availability should match whatever the sort tab has (which may be true from initialization)
            const sortResetAvailability = component['_resetAvailabilityByTab']()[ActiveTab.SORT] ?? false;
            expect(component.isResetAvailable$()).toBe(sortResetAvailability);

            // Set reset availability for sort tab explicitly
            component['updateResetAvailability'](ActiveTab.SORT, true);
            expect(component.isResetAvailable$()).toBe(true);

            // Set sort reset to false
            component['updateResetAvailability'](ActiveTab.SORT, false);
            expect(component.isResetAvailable$()).toBe(false);

            // Switch back to columns - should restore columns reset state
            component['onTabSelected']({ index: 0 }); // Columns is index 0
            expect(component.activeTab()).toBe(ActiveTab.COLUMNS);
            expect(component.isResetAvailable$()).toBe(true);
        });

        it('should update global reset availability when active tab changes', () => {
            component.activeTab.set(ActiveTab.SORT);
            component['updateResetAvailability'](ActiveTab.SORT, true);
            expect(component.isResetAvailable$()).toBe(true);

            // Switch to filter tab (no changes)
            component['onTabSelected']({ index: 2 }); // Filter is index 2 (columns, sort, filter, group)
            expect(component.isResetAvailable$()).toBe(false);

            // Mark filter as having changes
            component['updateResetAvailability'](ActiveTab.FILTER, true);
            expect(component.isResetAvailable$()).toBe(true);
        });

        it('should handle reset availability for all tabs', () => {
            component['onTabSelected']({ index: 0 }); // Columns tab
            component['updateResetAvailability'](ActiveTab.COLUMNS, true);
            expect(component.isResetAvailable$()).toBe(true);

            component['onTabSelected']({ index: 1 }); // Sort tab
            component['updateResetAvailability'](ActiveTab.SORT, true);
            expect(component.isResetAvailable$()).toBe(true);

            component['onTabSelected']({ index: 2 }); // Filter tab
            component['updateResetAvailability'](ActiveTab.FILTER, true);
            expect(component.isResetAvailable$()).toBe(true);

            component['onTabSelected']({ index: 3 }); // Group tab
            component['updateResetAvailability'](ActiveTab.GROUP, true);
            expect(component.isResetAvailable$()).toBe(true);
        });

        it('should reset columns to initial values and update pending changes', () => {
            const initialColumns: SettingsColumnsDialogResultData = {
                visibleColumns: ['name'],
                columnOrder: ['name', 'price'],
                columns: [
                    { label: 'Name', key: 'name', name: 'name', visible: true },
                    { label: 'Price', key: 'price', name: 'price', visible: false }
                ]
            };
            component._initialColumns.set(initialColumns);

            // Make changes
            component.columnsData.set({
                columns: [
                    { label: 'Name', key: 'name', name: 'name', visible: false },
                    { label: 'Price', key: 'price', name: 'price', visible: true }
                ]
            });

            component.activeTab.set(ActiveTab.COLUMNS);
            component.reset();

            // Signal should be reset
            expect(component.columnsData()?.columns).toEqual(initialColumns.columns);

            // Pending changes should also be reset
            const closeSpy = jest.spyOn(component['dialogRef'], 'close');
            component.confirm();
            expect(closeSpy).toHaveBeenCalledWith(
                expect.objectContaining({
                    columnsData: { columns: initialColumns.columns }
                })
            );
        });
    });

    describe('confirm with pending columns changes', () => {
        const mockColumnsData: SettingsColumnsDialogData = {
            columns: [
                { label: 'Name', key: 'name', name: 'name', visible: true },
                { label: 'Price', key: 'price', name: 'price', visible: true }
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

        it('should prefer pending columns changes over signal value when confirming', () => {
            const pendingColumns: SettingsColumnsDialogResultData = {
                visibleColumns: ['price'],
                columnOrder: ['price', 'name'],
                columns: [
                    { label: 'Price', key: 'price', name: 'price', visible: true },
                    { label: 'Name', key: 'name', name: 'name', visible: false }
                ]
            };

            // Trigger columns change (stores in pending, doesn't update signal)
            component.onColumnsChange(pendingColumns);

            // Confirm should use pending changes
            const closeSpy = jest.spyOn(component['dialogRef'], 'close');
            component.confirm();
            expect(closeSpy).toHaveBeenCalledWith({
                sortingData: null,
                filteringData: null,
                groupingData: null,
                columnsData: { columns: pendingColumns.columns }
            });
        });

        it('should use signal value when no pending changes exist', () => {
            const closeSpy = jest.spyOn(component['dialogRef'], 'close');
            component.confirm();
            expect(closeSpy).toHaveBeenCalledWith({
                sortingData: null,
                filteringData: null,
                groupingData: null,
                columnsData: mockColumnsData
            });
        });
    });
});
