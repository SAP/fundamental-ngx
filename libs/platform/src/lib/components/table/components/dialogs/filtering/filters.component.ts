import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef,
    Inject,
    ViewChild
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DialogRef } from '@fundamental-ngx/core';

import { CollectionFilter } from '../../../interfaces';
import { TableColumnComponent } from '../../table-column/table-column.component';
import { TableViewSettingsFilterComponent } from '../../table-view-settings-filter/table-view-settings-filter.component';
import { Resettable, RESETTABLE_TOKEN } from '../reset-button/reset-button.component';
import { FILTERS_VIEW_STEP_TOKEN, FiltersViewStep } from './filters-active-step';

export interface FiltersDialogData {
    filterBy: CollectionFilter[];
    columns: TableColumnComponent[];
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

    /** Initially selected filters. Used for restoring */
    initialFilterBy: CollectionFilter[];

    /** Currently applied filters rules */
    filterBy: CollectionFilter[];

    /** Table columns. Used to retrieve a column key */
    columns: TableColumnComponent[];

    /** Declared filters options */
    viewSettingsFilters: TableViewSettingsFilterComponent[];

    /** Currently selected step */
    activeStep: ACTIVE_STEP = ACTIVE_STEP.SELECT_FILTER;

    /** Currently selected filter to drill down */
    activeFilter: TableViewSettingsFilterComponent | null = null;

    /** Table column key associated with the currently selected filter  */
    activeFilterColumnKey: string | null = null;

    private _isResetAvailableSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    /** Indicates when reset command is available */
    readonly isResetAvailable$: Observable<boolean> = this._isResetAvailableSubject$.asObservable();

    /** 
     * Current FiltersViewStep component to render.
     * The fd-dialog component relies on named projected content. 
     * It means we must define all projected dialog options in the same view withing fd-dialog.
     * In order to keep filters steps as separate components 
     * and do not break dialog content we are using this ViewChild hook
     * keeping reference to the conditionally rendered active step.
     * Each "FilterStepView" has template refs for dialog.title and dialog.body template
     * */
    @ViewChild(FILTERS_VIEW_STEP_TOKEN as any)
    set setActiveFilterStepView(view: FiltersViewStep) {
        this.activeFilterStepView = view;
        this._cd.detectChanges();
    }

    /** Current step component to render */
    activeFilterStepView: FiltersViewStep;

    constructor(public dialogRef: DialogRef, private _cd: ChangeDetectorRef) {
        const dialogData: FiltersDialogData = this.dialogRef.data;
        this.initialFilterBy = [...dialogData.filterBy];
        this.filterBy = [...dialogData.filterBy];
        this.viewSettingsFilters = dialogData.viewSettingsFilters;
        this.columns = dialogData.columns;
    }
    
    /** Need it to keep activeFilterStepView rendering up to date */
    ngAfterViewInit(): void {
        this._cd.detectChanges();
    }

    /** Select filter to drill down */
    selectFilter(filter: TableViewSettingsFilterComponent): void {
        this.activeStep = ACTIVE_STEP.FILTER;
        this.activeFilter = filter;
        this.activeFilterColumnKey = this.columns.find(({ name }) => name === filter.column)?.key;
        this._cd.detectChanges();
    }

    /** Go back to the top filters list */
    goToFilters(): void {
        this.activeStep = ACTIVE_STEP.SELECT_FILTER;
        this.activeFilter = null;
    }

    /** Apply filter rule changes and emit the event */
    applyFilter(filter: CollectionFilter): void {
        if (filter) {
            this.filterBy = this.filterBy.filter(({ field }) => field !== filter.field);

            this.filterBy.push(filter);

            this._isResetAvailableSubject$.next(true);

            // To fix "Expression has changed after it was checked"
            this._cd.detectChanges();
        }
    }

    /** Reset changes to the initial state */
    reset(): void {
        this.filterBy = [...this.initialFilterBy];
        this._isResetAvailableSubject$.next(false);
        this._cd.detectChanges();
    }

    /** Close dialog */
    cancel(): void {
        const result: FiltersDialogResultData = { filterBy: null };
        this.dialogRef.close(result);
    }

    /** Confirm changes and close dialog */
    confirm(): void {
        const result: FiltersDialogResultData = { filterBy: this.filterBy };
        this.dialogRef.close(result);
    }
}
