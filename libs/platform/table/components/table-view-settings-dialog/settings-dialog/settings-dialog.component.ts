import { CdkScrollable } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FocusableItemDirective, InitialFocusDirective, Nullable, TemplateDirective } from '@fundamental-ngx/cdk/utils';
import {
    BarElementDirective,
    BarLeftDirective,
    BarRightDirective,
    ButtonBarComponent
} from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    DialogRef
} from '@fundamental-ngx/core/dialog';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { CollectionFilter, CollectionSort, Table } from '@fundamental-ngx/platform/table-helpers';
import { RESETTABLE_TOKEN, ResetButtonComponent, Resettable } from '../../reset-button/reset-button.component';
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
    SettingsGroupDialogData,
    SettingsGroupDialogResultData,
    SettingsSortDialogData,
    SettingsSortDialogResultData
} from '../table-view-settings.model';

@Component({
    selector: 'fdp-settings-dialog-settings',
    standalone: true,
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
        FormsModule,
        ButtonComponent,
        SortingComponent,
        FiltersComponent,
        GroupingComponent,
        NgTemplateOutlet,
        SegmentedButtonComponent,
        TemplateDirective,
        TitleComponent,
        ButtonBarComponent,
        InitialFocusDirective,
        FocusableItemDirective
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

    /** The active tab to display ('sort', 'filter', or 'group') */
    activeTab = signal<Nullable<ActiveTab>>(null);

    /** Flag indicating whether the subheader should be shown */
    showSubheader = signal<boolean>(false);

    /** Current step component to render for filtering */
    activeFilterStepView = signal<Nullable<FiltersViewStep>>(null);

    /** Signal to track reset availability */
    readonly isResetAvailable$ = signal(false);

    /** @hidden Initial sorting configuration */
    _initialSorting = signal<Nullable<CollectionSort>>(null);

    /** @hidden Initial filter configurations */
    _initialFilters = signal<CollectionFilter[]>([]);

    /** @hidden Initial grouping configurations */
    _initialGrouping = signal<Nullable<SettingsGroupDialogResultData>>(null);

    /**
     * Constructor that initializes dialog data and sets initial values for sorting, filtering, and grouping.
     */
    constructor(
        private readonly dialogRef: DialogRef<{
            sortingData: Nullable<SettingsSortDialogData>;
            filteringData: Nullable<FiltersDialogData>;
            groupingData: Nullable<SettingsGroupDialogData>;
        }>,
        private readonly _table: Table
    ) {
        const data = this.dialogRef.data;
        this.sortingData.set(data.sortingData);
        this.filteringData.set(data.filteringData);
        this.groupingData.set(data.groupingData);
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
        this.dialogRef.close({
            sortingData: this.sortingData(),
            filteringData: this.filteringData(),
            groupingData: this.groupingData()
        });
    }

    /**
     * Cancel the dialog and close it without saving any changes.
     */
    cancel(): void {
        this.dialogRef.close(null);
    }

    /**
     * Reset the settings based on the currently active tab (sort, filter, group).
     */
    reset(): void {
        if (this.activeTab() === ActiveTab.SORT && this.sortingData()) {
            this.sortingData.set({
                ...this.sortingData()!,
                field: this._initialSorting()!.field,
                direction: this._initialSorting()!.direction
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
        this.isResetAvailable$.set(false);
    }

    /**
     * Handle sort change event and update sorting data.
     * @param event Updated sorting data.
     */
    onSortChange(event: SettingsSortDialogResultData): void {
        this.sortingData.set({
            ...this.sortingData()!,
            field: event.field,
            direction: event.direction
        });
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
     * Update the active filter step view when a change occurs.
     * @param event The new active filter step view.
     */
    onActiveFilterStepViewChange(event: FiltersViewStep): void {
        this.activeFilterStepView.set(event);
    }

    /**
     * Handle changes to the reset availability.
     * @param event Boolean indicating if reset is available.
     */
    onResetAvailabilityChange(event: boolean): void {
        this.isResetAvailable$.set(event);
    }

    /**
     * Determine the initial active tab based on available data.
     * @returns The name of the active tab to display.
     */
    private _getInitialActiveTab(): Nullable<ActiveTab> {
        if (this.sortingData()) {
            return ActiveTab.SORT;
        } else if (this.filteringData()) {
            return ActiveTab.FILTER;
        } else if (this.groupingData()) {
            return ActiveTab.GROUP;
        }
        return null;
    }

    /**
     * Determine if the subheader should be shown based on the availability of sorting, filtering, and grouping data.
     */
    private _shouldRenderSubheader(): void {
        const validDataCount = [this.sortingData(), this.filteringData(), this.groupingData()].filter(
            (data) => data !== null
        ).length;
        this.showSubheader.set(validDataCount >= 2);
    }

    /**
     * Set initial sorting configuration from the table's state.
     */
    private _setInitialSorting(): void {
        const initialSorting = (this._table.initialState?.initialSortBy || [])[0];
        this._initialSorting.set({
            field: initialSorting?.field ?? NOT_SORTED_OPTION_VALUE,
            direction: initialSorting?.direction ?? INITIAL_DIRECTION
        });
    }

    /**
     * Set initial filter configuration from the table's state.
     */
    private _setInitialFilters(): void {
        this._initialFilters.set(this._table.initialState?.initialFilterBy ?? []);
    }

    /**
     * Set initial grouping configuration from the table's state.
     */
    private _setInitialGrouping(): void {
        const initialGrouping = (this._table.initialState?.initialGroupBy || [])[0];
        this._initialGrouping.set({
            field: initialGrouping?.field ?? NOT_GROUPED_OPTION_VALUE,
            direction: initialGrouping?.direction ?? INITIAL_DIRECTION
        });
    }
}
