import { Component, Inject, Optional } from '@angular/core';

import { DIALOG_REF, DialogConfig, DialogRef, DialogService } from '@fundamental-ngx/core';
import { TableViewSettingsFilterComponent } from '@fundamental-ngx/platform';
import { FiltersComponent } from './filters.component';
import { TableService } from '../../../table.service';

@Component({
    templateUrl: './filter-by-step.component.html'
})
export class FilterByStepComponent {
    initialFilterBy = this.dialogRef.data.filterBy || [];
    filterBy = this.initialFilterBy;
    readonly filters = this._tableService.filters;

    private filtersDialogRed: DialogRef;
    constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef,
                public _dialogService: DialogService,
                private _tableService: TableService) {}

    nextStep(filter: TableViewSettingsFilterComponent): void {
        this.filtersDialogRed = this._dialogService.open(FiltersComponent, {
            responsivePadding: true,
            verticalPadding: false,
            minWidth: '30%',
            minHeight: '50%',
            backdropClass: 'no-backdrop',
            data: {
                filters: this.filters,
                filter: filter,
                filterBy: this.filterBy
            }
        } as DialogConfig)
    }

    reset(): void {
        this.filterBy = this.initialFilterBy;
    }

    cancel(): void {
        this.dialogRef.close();
    }

    confirm(): void {
        this.dialogRef.close({
            action: 'Confirm',
            value: {

            }
        });
    }
}
