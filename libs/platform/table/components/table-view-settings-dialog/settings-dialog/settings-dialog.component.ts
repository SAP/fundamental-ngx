import { CdkScrollable } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, signal } from '@angular/core';
import { InitialFocusDirective, Nullable, TemplateDirective } from '@fundamental-ngx/cdk/utils';
import {
    BarElementDirective,
    BarLeftDirective,
    BarRightDirective,
    ButtonBarComponent
} from '@fundamental-ngx/core/bar';
import {
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    DialogRef
} from '@fundamental-ngx/core/dialog';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { IconTabBarComponent, IconTabBarItem, IconTabBarTabComponent } from '@fundamental-ngx/platform/icon-tab-bar';
import { CollectionFilter, CollectionSort, Table } from '@fundamental-ngx/platform/table-helpers';
import { RESETTABLE_TOKEN, ResetButtonComponent, Resettable } from '../../reset-button/reset-button.component';
import { ColumnsComponent } from '../columns/columns.component';
import { FiltersViewStep } from '../filtering/filters-active-step';
import { FiltersComponent } from '../filtering/filters.component';
import { GroupingComponent } from '../grouping/grouping.component';
import { SortingComponent } from '../sorting/sorting.component';
import {
    ActiveTab,
    FiltersDialogData,
    FiltersDialogResultData,
    INITIAL_DIRECTION,
    NOT_GROUPED_OPTION_VALUE,
    NOT_SORTED_OPTION_VALUE,
    SettingsColumnsDialogData,
    SettingsColumnsDialogResultData,
    SettingsGroupDialogData,
    SettingsGroupDialogResultData,
    SettingsSortDialogData,
    SettingsSortDialogResultData
} from '../table-view-settings.model';

@Component({
    selector: 'fdp-settings-dialog-settings',
    providers: [{ provide: RESETTABLE_TOKEN, useExisting: forwardRef(() => SettingsDialogComponent) }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DialogComponent,
        DialogHeaderComponent,
        BarLeftDirective,
        BarElementDirective,
        BarRightDirective,
        ResetButtonComponent,
        CdkScrollable,
        DialogBodyComponent,
        DialogFooterComponent,
        FdTranslatePipe,
        SortingComponent,
        FiltersComponent,
        GroupingComponent,
        ColumnsComponent,
        NgTemplateOutlet,
        TemplateDirective,
        TitleComponent,
        ButtonBarComponent,
        InitialFocusDirective,
        IconTabBarComponent,
        IconTabBarTabComponent
    ],
    templateUrl: './settings-dialog.component.html'
})
export class SettingsDialogComponent implements Resettable {
    /** Data for sorting */
    sortingData = signal<Nullable<SettingsSortDialogData>>(null);

    /** Data for filtering */
    filteringData = signal<Nullable<FiltersDialogData>>(null);

    /** Data for grouping */
    groupingData = signal<Nullable<SettingsGroupDialogData>>(null);

    /** Data for columns */
    columnsData = signal<Nullable<SettingsColumnsDialogData>>(null);

    /** The active tab to display ('sort', 'filter', 'group', or 'columns') */
    activeTab = signal<Nullable<ActiveTab>>(null);

    /** Flag indicating whether the subheader should be shown */
    showSubheader = signal<boolean>(false);

    /** Heading level of the dialog header. */
    headingLevel: number;

    /** Current step component to render for filtering */
    activeFilterStepView = signal<Nullable<FiltersViewStep>>(null);

    /** Signal to track reset availability */
    readonly isResetAvailable$ = signal(false);

    /** Signal to track if the dialog is valid (OK button can be clicked) */
    readonly isDialogValid = signal(true);

    /** @hidden Initial sorting configuration */
    _initialSorting = signal<Nullable<CollectionSort>>(null);

    /** @hidden Initial filter configurations */
    _initialFilters = signal<CollectionFilter[]>([]);

    /** @hidden Initial grouping configurations */
    _initialGrouping = signal<Nullable<SettingsGroupDialogResultData>>(null);

    /** @hidden Initial columns configurations */
    _initialColumns = signal<Nullable<SettingsColumnsDialogResultData>>(null);

    /** @hidden */
    protected showColumns = false;

    /** @hidden Expose ActiveTab enum to template */
    protected readonly ActiveTab = ActiveTab;

    /** @hidden Pending columns changes (not applied to signal to avoid triggering child effects) */
    private _pendingColumnsChanges: Nullable<SettingsColumnsDialogResultData> = null;

    /** @hidden Tracks reset availability per tab */
    private _resetAvailabilityByTab = signal<Record<string, boolean>>({});

    /**
     * Constructor that initializes dialog data and sets initial values for sorting, filtering, grouping, and columns.
     */
    constructor(
        private readonly dialogRef: DialogRef<{
            sortingData: Nullable<SettingsSortDialogData>;
            filteringData: Nullable<FiltersDialogData>;
            groupingData: Nullable<SettingsGroupDialogData>;
            columnsData: Nullable<SettingsColumnsDialogData>;
            headingLevel: 1 | 2 | 3 | 4 | 5 | 6;
            allowColumnConfiguration: boolean;
        }>,
        private readonly _table: Table
    ) {
        const data = this.dialogRef.data;
        this.sortingData.set(data.sortingData);
        this.filteringData.set(data.filteringData);
        this.groupingData.set(data.groupingData);
        this.showColumns = data.allowColumnConfiguration;
        if (this.showColumns) {
            this.columnsData.set(data.columnsData);
            this._setInitialColumns();
        }
        this.headingLevel = data.headingLevel;
        this.activeTab.set(this._getInitialActiveTab());
        this._shouldRenderSubheader();
        this._setInitialSorting();
        this._setInitialFilters();
        this._setInitialGrouping();
    }

    /**
     * Confirm the dialog action and close the dialog, returning updated settings data.
     */
    confirm(): void {
        const columnsData = this._pendingColumnsChanges
            ? { columns: this._pendingColumnsChanges.columns }
            : this.columnsData();

        // Build sorting result directly from sortingData signal
        const sortingData = this.sortingData();
        const sortingResult = sortingData ? { sortBy: sortingData.sortBy ?? [] } : null;

        this.dialogRef.close({
            sortingData: sortingResult,
            filteringData: this.filteringData(),
            groupingData: this.groupingData(),
            columnsData
        });
    }

    /**
     * Cancel the dialog and close it without saving any changes.
     */
    cancel(): void {
        this.dialogRef.close(null);
    }

    /**
     * Reset the settings based on the currently active tab (sort, filter, group, columns).
     */
    reset(): void {
        if (this.activeTab() === ActiveTab.SORT && this.sortingData()) {
            const current = this.sortingData()!;
            const initial = this._initialSorting()!;
            // Reset sortBy to initial sorting (if any)
            const initialSortBy =
                initial.field !== NOT_SORTED_OPTION_VALUE
                    ? [{ field: initial.field as string, direction: initial.direction }]
                    : [];
            this.sortingData.set({
                columns: current.columns,
                allowDisablingSorting: current.allowDisablingSorting,
                sortBy: initialSortBy
            });
        }
        if (this.activeTab() === ActiveTab.FILTER && this.filteringData()) {
            this.filteringData.set({
                ...this.filteringData()!,
                filterBy: this._initialFilters()
            });
        }
        if (this.activeTab() === ActiveTab.GROUP && this.groupingData()) {
            this.groupingData.set({
                ...this.groupingData()!,
                field: this._initialGrouping()!.field,
                direction: this._initialGrouping()!.direction
            });
        }
        if (this.activeTab() === ActiveTab.COLUMNS && this.columnsData()) {
            const initialColumns = this._initialColumns();
            if (initialColumns) {
                // Reset columns to initial state (both order and visibility)
                this.columnsData.set({
                    ...this.columnsData()!,
                    columns: initialColumns.columns
                });
            }
            this._pendingColumnsChanges = initialColumns;
        }
        this.updateResetAvailability(this.activeTab()!, false);
    }

    /**
     * Handle sort change event and update sorting data.
     * @param event Updated sorting data.
     */
    onSortChange(event: SettingsSortDialogResultData): void {
        // Update sortingData with new sortBy
        this.sortingData.set({
            ...this.sortingData()!,
            sortBy: event.sortBy ?? []
        });
    }

    /**
     * Handle sort validity change event.
     * @param isValid Whether the sorting configuration is valid.
     */
    onSortValidityChange(isValid: boolean): void {
        this.isDialogValid.set(isValid);
    }

    /**
     * Handle filter change event and update filtering data.
     * @param event Updated filtering data.
     */
    onFilterChange(event: FiltersDialogResultData): void {
        this.filteringData.set({
            ...this.filteringData()!,
            filterBy: event.filterBy
        });
    }

    /**
     * Handle group change event and update grouping data.
     * @param event Updated grouping data.
     */
    onGroupChange(event: SettingsGroupDialogResultData): void {
        this.groupingData.set({
            ...this.groupingData()!,
            field: event.field,
            direction: event.direction
        });
    }

    /**
     * Handle columns change event and update columns data.
     * Store pending changes without updating the signal to avoid triggering child effects.
     * @param event Updated columns data.
     */
    onColumnsChange(event: SettingsColumnsDialogResultData): void {
        this._pendingColumnsChanges = event;
    }

    /**
     * Update the active filter step view when a change occurs.
     * @param event The new active filter step view.
     */
    onActiveFilterStepViewChange(event: FiltersViewStep): void {
        this.activeFilterStepView.set(event);
    }

    /**
     * Handle tab selection changes from the icon tab bar.
     * @param event The selected tab item.
     */
    protected onTabSelected(event: IconTabBarItem): void {
        // Map tab index to ActiveTab enum based on which tabs are rendered
        // The order is: columns (if showColumns), sort, filter, group
        const tabOrder: ActiveTab[] = [];
        if (this.columnsData() && this.showColumns) {
            tabOrder.push(ActiveTab.COLUMNS);
        }
        if (this.sortingData()) {
            tabOrder.push(ActiveTab.SORT);
        }
        if (this.filteringData()) {
            tabOrder.push(ActiveTab.FILTER);
        }
        if (this.groupingData()) {
            tabOrder.push(ActiveTab.GROUP);
        }

        const selectedTab = tabOrder[event.index];
        if (selectedTab) {
            this.activeTab.set(selectedTab);
            this.updateResetAvailability();
        }
    }

    /**
     * Update reset availability for a specific tab or the currently active tab.
     * @param tab Optional tab to update. If provided, updates that specific tab and the global state if it's active.
     *            If not provided, updates the global state based on the currently active tab.
     * @param available Whether reset is available (only used when tab is provided).
     */
    protected updateResetAvailability(tab?: ActiveTab, available?: boolean): void {
        if (tab !== undefined && available !== undefined) {
            // Update tracking for the specific tab
            this._resetAvailabilityByTab.update((state) => ({ ...state, [tab]: available }));

            // If this is the active tab, update the global reset availability
            if (this.activeTab() === tab) {
                this.isResetAvailable$.set(available);
            }
        } else {
            // Update global reset availability based on the currently active tab
            const currentTab = this.activeTab();
            if (currentTab) {
                const tabAvailable = this._resetAvailabilityByTab()[currentTab] ?? false;
                this.isResetAvailable$.set(tabAvailable);
            }
        }
    }

    /**
     * Determine the initial active tab based on available data.
     * @returns The name of the active tab to display.
     */
    private _getInitialActiveTab(): Nullable<ActiveTab> {
        if (this.columnsData()) {
            return ActiveTab.COLUMNS;
        } else if (this.sortingData()) {
            return ActiveTab.SORT;
        } else if (this.filteringData()) {
            return ActiveTab.FILTER;
        } else if (this.groupingData()) {
            return ActiveTab.GROUP;
        }
        return null;
    }

    /**
     * Determine if the subheader should be shown based on the availability of sorting, filtering, grouping, and columns data.
     */
    private _shouldRenderSubheader(): void {
        const validDataCount = [
            this.sortingData(),
            this.filteringData(),
            this.groupingData(),
            this.columnsData()
        ].filter((data) => data !== null).length;
        this.showSubheader.set(validDataCount >= 2);
    }

    /**
     * Set initial sorting configuration from the table's state.
     */
    private _setInitialSorting(): void {
        // Use snapshot which preserves the original initial state
        // even if initialSortBy input is dynamically updated
        const initialSorting = (this._table.initialState?.getInitialSortBySnapshot() || [])[0];
        this._initialSorting.set({
            field: initialSorting?.field ?? NOT_SORTED_OPTION_VALUE,
            direction: initialSorting?.direction ?? INITIAL_DIRECTION
        });
    }

    /**
     * Set initial filter configuration from the table's state.
     */
    private _setInitialFilters(): void {
        // Use snapshot which preserves the original initial state
        this._initialFilters.set(this._table.initialState?.getInitialFilterBySnapshot() ?? []);
    }

    /**
     * Set initial grouping configuration from the table's state.
     */
    private _setInitialGrouping(): void {
        // Use snapshot which preserves the original initial state
        const initialGrouping = (this._table.initialState?.getInitialGroupBySnapshot() || [])[0];
        this._initialGrouping.set({
            field: initialGrouping?.field ?? NOT_GROUPED_OPTION_VALUE,
            direction: initialGrouping?.direction ?? INITIAL_DIRECTION
        });
    }

    /**
     * Set initial columns configuration from the table's state.
     */
    private _setInitialColumns(): void {
        const allColumns = this._table.getTableColumns();
        const initialVisibleColumns = allColumns.filter((col) => col.visible).map((col) => col.name);
        const columnOrder = allColumns.map((col) => col.name);

        // Build initial columns array
        const initialColumnsArray = allColumns.map((col) => ({
            label: col.label,
            key: col.key,
            name: col.name,
            visible: col.visible
        }));

        this._initialColumns.set({
            visibleColumns: initialVisibleColumns,
            columnOrder,
            columns: initialColumnsArray
        });
    }
}
