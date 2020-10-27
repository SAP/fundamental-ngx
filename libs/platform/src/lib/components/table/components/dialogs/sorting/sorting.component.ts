import { Component, Inject } from '@angular/core';

import { DIALOG_REF, DialogRef } from '@fundamental-ngx/core';
import { SortDirection } from '../../../enums';

@Component({
    templateUrl: './sorting.component.html'
})
export class SortingComponent {
    sortDirection = this.dialogRef.data.sortDirection || 'asc';
    sortField = this.dialogRef.data.sortField || null;

    readonly _sortDirections = SortDirection;
    readonly columns = this.dialogRef.data.columns;

    constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef) {}

    reset(): void {
        this.dialogRef.close({ action: 'Reset' });
    }

    cancel(): void {
        this.dialogRef.close();
    }

    confirm(): void {
        this.dialogRef.close({
            action: 'Confirm',
            value: {
                field: this.sortField,
                direction: this.sortDirection
            }
        });
    }
}
