import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef,
    ViewChild
} from '@angular/core';
import equal from 'fast-deep-equal/es6';
import { BehaviorSubject, Observable } from 'rxjs';

import { DialogRef } from '@fundamental-ngx/core/dialog';
import { Nullable } from '@fundamental-ngx/core/shared';

import { FilterType } from '../../../enums/filter-type.enum';
import { CollectionFilter } from '../../../interfaces/collection-filter.interface';
import { Table } from '../../../table';
import { TableColumn } from '../../table-column/table-column';
import { TableViewSettingsFilterComponent } from '../../table-view-settings-dialog/table-view-settings-filter.component';
import { Resettable, RESETTABLE_TOKEN } from '../../reset-button/reset-button.component';
import { FILTERS_VIEW_STEP_TOKEN, FiltersViewStep } from './filters-active-step';
import { TableDialogCommonData } from '../../../models/table-dialog-common-data.model';
import { SelectableFilter } from './filters-list-step.component';

export interface FiltersDialogData extends TableDialogCommonData {
    filterBy: CollectionFilter[];
    columns: TableColumn[];
    viewSettingsFilters: TableViewSettingsFilterComponent[];
}

export interface FiltersDialogResultData {
    filterBy: CollectionFilter[];
}

export enum ACTIVE_STEP {
    SELECT_FILTER = 'SELECT_FILTER',
    FILTER = 'FILTER'
}

@Component({
    templateUrl: './filters.component.html',
    providers: [{ provide: RESETTABLE_TOKEN, useExisting: forwardRef(() => FiltersComponent) }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent implements Resettable, AfterViewInit {
    /** Reference to the available steps */
    readonly ACTIVE_STEP = ACTIVE_STEP;

    /** Currently applied filters rules */
    filterBy: CollectionFilter[];

    /** Table columns. Used to retrieve a column key */
    columns: TableColumn[];

    /** Declared filters options */
    viewSettingsFilters: TableViewSettingsFilterComponent[];

    /** Currently selected step */
    activeStep: ACTIVE_STEP = ACTIVE_STEP.SELECT_FILTER;

    /** Currently selected filter to drill down */
    activeFilter: TableViewSettingsFilterComponent | null = null;

    /** Table column key associated with the currently selected filter  */
    activeFilterColumnKey: Nullable<string> = null;

    /** @hidden */
    private _isResetAvailableSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    /** Indicates when reset command is available */
    readonly isResetAvailable$: Observable<boolean> = this._isResetAvailableSubject$.asObservable();

    /** @hidden */
    private _initialFilters: CollectionFilter[] = [];

    /**
     * Current FiltersViewStep component to render.
     * The fd-dialog component relies on named projected content.
     * It means we must define all projected dialog options in the same view withing fd-dialog.
     * In order to keep filters steps as separate components
     * and do not break dialog content we are using this ViewChild hook
     * keeping reference to the conditionally rendered active step.
     * Each "FilterStepView" has template refs for dialog.title and dialog.body template
     * */
    @ViewChild(FILTERS_VIEW_STEP_TOKEN)
    set setActiveFilterStepView(view: FiltersViewStep) {
        this.activeFilterStepView = view;
        this._cd.detectChanges();
    }

    /** Current step component to render */
    activeFilterStepView: FiltersViewStep;

    /** @hidden */
    constructor(
        public readonly dialogRef: DialogRef<FiltersDialogData>,
        private readonly _cd: ChangeDetectorRef,
        private readonly _table: Table
    ) {
        const dialogData = this.dialogRef.data;
        this.filterBy = [...dialogData.filterBy];
        this.viewSettingsFilters = dialogData.viewSettingsFilters;
        this.columns = dialogData.columns;

        this._setInitialFilters();
        this._compareSelectedFilters();
    }

    /** Need it to keep activeFilterStepView rendering up to date */
    ngAfterViewInit(): void {
        this._cd.detectChanges();
    }

    /** Select filter to drill down */
    selectFilter(filter: SelectableFilter): void {
        this.activeStep = ACTIVE_STEP.FILTER;
        this.activeFilter = filter as TableViewSettingsFilterComponent;
        this.activeFilterColumnKey = this.columns.find(
            ({ name }) => name === (<TableViewSettingsFilterComponent>filter).column
        )?.key;
        this._cd.detectChanges();
    }

    /** Go back to the top filters list */
    goToFilters(): void {
        this.activeStep = ACTIVE_STEP.SELECT_FILTER;
        this.activeFilter = null;
    }

    /** Apply filter rule changes and emit the event */
    applyFilter(filter: CollectionFilter, { type }: TableViewSettingsFilterComponent): void {
        if (!filter) {
            return;
        }
        // exclude this filter from filters list
        this.filterBy = this.filterBy.filter(({ field }) => field !== filter.field);

        const filterIsNotEmpty =
            type === FilterType.CUSTOM ||
            (type === FilterType.MULTI && filter.value?.length) ||
            (type === FilterType.SINGLE && filter.value?.length);

        // if filter is not empty add it to the list
        if (filterIsNotEmpty) {
            this.filterBy.push(filter);
        }

        this._compareSelectedFilters();

        // To fix "Expression has changed after it was checked"
        this._cd.detectChanges();
    }

    /** Reset changes to the initial state */
    reset(): void {
        this.filterBy = this._initialFilters;
        this._isResetAvailableSubject$.next(false);
        this._cd.detectChanges();
    }

    /** Close dialog */
    cancel(): void {
        this.dialogRef.close(null);
    }

    /** Confirm changes and close dialog */
    confirm(): void {
        const result: FiltersDialogResultData = { filterBy: this.filterBy };
        this.dialogRef.close(result);
    }

    /** @hidden */
    private _setInitialFilters(): void {
        this._initialFilters = this._table.initialFilterBy ?? [];
    }

    /** @hidden */
    private _compareSelectedFilters(): void {
        if (equal(this._initialFilters, this.filterBy)) {
            return;
        }

        this._isResetAvailableSubject$.next(true);
    }
}
