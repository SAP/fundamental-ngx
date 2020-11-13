import { Component, Inject } from '@angular/core';

import { DIALOG_REF, DialogRef } from '@fundamental-ngx/core';
import { TableService } from '../../../table.service';
import { TableViewSettingsFilterComponent } from '@fundamental-ngx/platform';
import { FilterType } from '../../../enums';

@Component({
    templateUrl: './filters.component.html',
    styles: [`.no-backdrop { background-color: transparent; }`]
})
export class FiltersComponent {
    initialFilterBy = this.dialogRef.data.filterBy || [];
    filterBy = this.initialFilterBy;
    filter = this.dialogRef.data.filter;

    readonly filtersTypes = FilterType;
    readonly filters = this.dialogRef.data.filters;

    constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef) {}

    _isFiltersChanged(): boolean {
        return false;
    }

    reset(): void {
        this.filterBy = this.initialFilterBy;
    }

    back(): void {
        this.reset();
        this.dialogRef.close({
            action: 'Back'
        });
    }

    cancel(): void {
        this.dialogRef.close({
            action: 'Cancel'
        });
    }

    confirm(): void {
        this.dialogRef.close({
            action: 'Confirm',
            value: {

            }
        });
    }
}
