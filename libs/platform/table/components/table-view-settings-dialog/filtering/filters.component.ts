import { NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    input,
    Input,
    OnInit,
    output,
    signal,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { CollectionFilter, FilterType, TableColumn } from '@fundamental-ngx/platform/table-helpers';
import equal from 'fast-deep-equal/es6';
import { TableViewSettingsFilterComponent } from '../table-view-settings-filter.component';
import { ACTIVE_STEP, FiltersDialogData, FiltersDialogResultData } from '../table-view-settings.model';
import { FilterStepComponent } from './filter-step.component';
import { FILTERS_VIEW_STEP_TOKEN, FiltersViewStep } from './filters-active-step';
import { FiltersListStepComponent, SelectableFilter } from './filters-list-step.component';

@Component({
    selector: 'fdp-filters',
    templateUrl: './filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [NgTemplateOutlet, FiltersListStepComponent, FilterStepComponent]
})
export class FiltersComponent implements AfterViewInit, OnInit {
    /** Data for the filtering dialog */
    @Input() set filteringData(value: FiltersDialogData) {
        this._initializeFilterData(value);
    }

    /** @hidden Heading level */
    headingLevel = input<number>(2);

    /** Initial set of filters applied */
    initialFilters = input<CollectionFilter[]>([]);

    /** Emits when the active filter step view changes */
    activeFilterStepViewChange = output<FiltersViewStep>();

    /** Emits the final result of filter changes */
    filterChange = output<FiltersDialogResultData>();

    /** Emits whether the reset button should be enabled */
    resetAvailabilityChange = output<boolean>();

    /** Signal to hold currently applied filter rules */
    filterBy = signal<CollectionFilter[]>([]);

    /** Signal for table columns, used to retrieve the column key */
    columns = signal<TableColumn[]>([]);

    /** Signal for declared filter options */
    viewSettingsFilters = signal<TableViewSettingsFilterComponent[]>([]);

    /** Signal to track the currently selected filter step */
    activeStep = signal<ACTIVE_STEP>(ACTIVE_STEP.SELECT_FILTER);

    /** Signal to track the currently selected filter */
    activeFilter = signal<Nullable<TableViewSettingsFilterComponent>>(null);

    /** Signal to track the column key associated with the active filter */
    activeFilterColumnKey = signal<Nullable<string>>(null);

    /** Signal for the currently active filter step view */
    activeFilterStepView = signal<Nullable<FiltersViewStep>>(null);

    /** Reference to the available steps */
    readonly ACTIVE_STEP = ACTIVE_STEP;

    /** hidden */
    constructor(private readonly _cd: ChangeDetectorRef) {}

    /** hidden */
    ngOnInit(): void {
        this._compareSelectedFilters();
    }

    /** hidden */
    ngAfterViewInit(): void {
        this._cd.detectChanges();
    }

    /** Setter for the active filter step view to trigger updates */
    @ViewChild(FILTERS_VIEW_STEP_TOKEN)
    set setActiveFilterStepView(view: FiltersViewStep) {
        this.activeFilterStepView.set(view);
        this.activeFilterStepViewChange.emit(view);
        this._cd.detectChanges();
    }

    /**
     * Select a filter to drill down and update the active filter step.
     * @param filter The filter to be selected and applied.
     */
    selectFilter(filter: SelectableFilter): void {
        this.activeStep.set(ACTIVE_STEP.FILTER);
        const selectedFilter = filter as TableViewSettingsFilterComponent;
        this.activeFilter.set(selectedFilter);
        const columnKey = this.columns().find(({ name }) => name === selectedFilter.column)?.key || null;
        this.activeFilterColumnKey.set(columnKey);
        this._cd.detectChanges();
    }

    /** Navigate back to the top-level filters list */
    goToFilters(): void {
        this.activeStep.set(ACTIVE_STEP.SELECT_FILTER);
        this.activeFilter.set(null);
    }

    /**
     * Apply changes to the selected filter and emit the filter change event.
     * @param filter The filter to apply
     * @param filterComponent The component for the filter (provides type info)
     */
    applyFilter(filter: CollectionFilter, filterComponent: Nullable<TableViewSettingsFilterComponent>): void {
        if (!filter) {
            return;
        }

        // Update the filter by removing the previous filter for the field
        this.filterBy.set(this.filterBy().filter(({ field }) => field !== filter.field));

        if (!filterComponent) {
            return;
        }
        const filterIsNotEmpty =
            filterComponent.type === FilterType.CUSTOM ||
            (filterComponent.type === FilterType.MULTI && filter.value?.length) ||
            (filterComponent.type === FilterType.SINGLE && filter.value?.length);

        // Add the new filter if it has a value
        if (filterIsNotEmpty) {
            this.filterBy.set([...this.filterBy(), filter]);
        }

        this._compareSelectedFilters();
        this.filterChange.emit({ filterBy: this.filterBy() });
        this._cd.detectChanges();
    }

    /**
     * Private method to initialize filter data on component initialization.
     * Extracts the initial filter values and table column data.
     */
    private _initializeFilterData(filteringData: FiltersDialogData): void {
        if (filteringData) {
            this.filterBy.set([...filteringData.filterBy]);
            this.viewSettingsFilters.set(filteringData.viewSettingsFilters);
            this.columns.set(filteringData.columns);
        }
    }

    /**
     * Private method to compare the current selected filters against the initial state.
     * Enables or disables the reset button based on filter state comparison.
     */
    private _compareSelectedFilters(): void {
        if (!equal(this.initialFilters(), this.filterBy())) {
            this.resetAvailabilityChange.emit(true);
        } else {
            this.resetAvailabilityChange.emit(false);
        }
    }
}
