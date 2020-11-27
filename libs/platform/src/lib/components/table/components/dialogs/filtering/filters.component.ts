import { Component, Inject } from '@angular/core';

import { DIALOG_REF, DialogRef } from '@fundamental-ngx/core';

import { FilterType } from '../../../enums';

let id = 0;

@Component({
    templateUrl: './filters.component.html',
    styles: [
        `
            .no-backdrop {
                background-color: transparent;
            }
        `
    ]
})
export class FiltersComponent {
    readonly FILTER_TYPE = FilterType;

    initialFilterBy = this.dialogRef.data.filterBy || [];
    filterBy = this.initialFilterBy;
    filter = this.dialogRef.data.filter;

    readonly id = `table-view-settings-filter-id-${id++}`;

    constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef) {}

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
            value: {}
        });
    }

    _isFiltersChanged(): boolean {
        return false;
    }
}
