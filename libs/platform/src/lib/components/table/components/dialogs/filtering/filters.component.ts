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

import { DIALOG_REF, DialogRef } from '@fundamental-ngx/core';

import { CollectionFilter } from '../../../interfaces';
import { TableViewSettingsFilterComponent } from '../../table-view-settings-filter/table-view-settings-filter.component';
import { Resettable, RESETTABLE_TOKEN } from '../reset-button/reset-button.component';
import { FILTERS_VIEW_STEP_TOKEN, FiltersViewStep } from './filters-active-step';

export interface FiltersDialogData {
    filterBy: CollectionFilter[];
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
    initialFilterBy: CollectionFilter[];

    filterBy: CollectionFilter[];

    viewSettingsFilters: TableViewSettingsFilterComponent[];

    readonly _isResetAvailableSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    readonly isResetAvailable$: Observable<boolean> = this._isResetAvailableSubject$.asObservable();

    activeStep: ACTIVE_STEP = ACTIVE_STEP.SELECT_FILTER;

    activeFilter: TableViewSettingsFilterComponent | null;

    readonly ACTIVE_STEP = ACTIVE_STEP;

    @ViewChild(FILTERS_VIEW_STEP_TOKEN as any)
    set setActiveFilterStepView(view: FiltersViewStep) {
        this.activeFilterStepView = view;
        this._cd.detectChanges();
    }

    activeFilterStepView: FiltersViewStep;

    constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef, private _cd: ChangeDetectorRef) {
        const dialogData: FiltersDialogData = this.dialogRef.data;
        this.initialFilterBy = [...dialogData.filterBy];
        this.filterBy = [...dialogData.filterBy];
        this.viewSettingsFilters = dialogData.viewSettingsFilters;
    }

    ngAfterViewInit(): void {
        this._cd.detectChanges();
    }

    selectFilter(filter: TableViewSettingsFilterComponent): void {
        this.activeStep = ACTIVE_STEP.FILTER;
        this.activeFilter = filter;
        this._cd.detectChanges();
    }

    goToFilters(): void {
        this.activeStep = ACTIVE_STEP.SELECT_FILTER;
        this.activeFilter = null;
    }

    applyFilter(filter: CollectionFilter): void {
        if (filter) {
            this.filterBy = this.filterBy.filter(({ field }) => field !== filter.field);

            this.filterBy.push(filter);

            this._isResetAvailableSubject$.next(true);

            // To fix "Expression has changed after it was checked"
            this._cd.detectChanges();
        }
    }

    reset(): void {
        this.filterBy = [...this.initialFilterBy];
        this._isResetAvailableSubject$.next(false);
        this._cd.detectChanges();
    }

    cancel(): void {
        const result: FiltersDialogResultData = { filterBy: null };
        this.dialogRef.close(result);
    }

    confirm(): void {
        const result: FiltersDialogResultData = { filterBy: this.filterBy };
        this.dialogRef.close(result);
    }
}
