import { Component, Inject } from '@angular/core';

import { DIALOG_REF, DialogRef } from '@fundamental-ngx/core';
import { SortDirection } from '../../../enums';

@Component({
    templateUrl: './grouping.component.html'
})
export class GroupingComponent {
    initialOrder = this.dialogRef.data.groupOrder || 'asc';
    initialField = this.dialogRef.data.groupField || null;

    groupOrder = this.initialOrder;
    groupField = this.initialField;

    readonly _sortDirections = SortDirection;
    readonly columns = this.dialogRef.data.columns;

    constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef) {}

    reset(): void {
        this.groupOrder = this.initialOrder;
        this.groupField = this.initialField;
    }

    cancel(): void {
        this.dialogRef.close();
    }

    confirm(): void {
        this.dialogRef.close({
            action: 'Confirm',
            value: {
                field: this.groupField,
                direction: this.groupOrder
            }
        });
    }
}
