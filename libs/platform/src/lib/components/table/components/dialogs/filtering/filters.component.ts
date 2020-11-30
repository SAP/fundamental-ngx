import { Component, forwardRef, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DIALOG_REF, DialogRef } from '@fundamental-ngx/core';

import { CollectionFilter } from '../../../interfaces';
import { TableViewSettingsFilterComponent } from '../../table-view-settings-filter/table-view-settings-filter.component';
import { Resettable, RESETTABLE_TOKEN } from '../reset-button/filters-reset-button.component';

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
    providers: [{ provide: RESETTABLE_TOKEN, useExisting: forwardRef(() => FiltersComponent) }]
})
export class FiltersComponent implements Resettable {
    initialFilterBy: CollectionFilter[];

    filterBy: CollectionFilter[];

    viewSettingsFilters: TableViewSettingsFilterComponent[];

    private _isResetAvailableSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    isResetAvailable$: Observable<boolean> = this._isResetAvailableSubject$.asObservable();

    activeStep: ACTIVE_STEP = ACTIVE_STEP.SELECT_FILTER;

    activeFilter: TableViewSettingsFilterComponent;

    readonly ACTIVE_STEP = ACTIVE_STEP;

    constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef) {
        const dialogData: FiltersDialogData = this.dialogRef.data;
        this.initialFilterBy = [...dialogData.filterBy];
        this.filterBy = [...dialogData.filterBy];
        this.viewSettingsFilters = dialogData.viewSettingsFilters;
    }

    selectFilter(filter: TableViewSettingsFilterComponent): void {
        this.activeStep = ACTIVE_STEP.FILTER;
        this.activeFilter = filter;
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
        }
    }

    reset(): void {
        this.filterBy = [...this.initialFilterBy];
        this._isResetAvailableSubject$.next(false);
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
