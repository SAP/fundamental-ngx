import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { DIALOG_REF, DialogConfig, DialogRef, DialogService } from '@fundamental-ngx/core';

import { TableViewSettingsFilterComponent } from '../../table-view-settings-filter/table-view-settings-filter.component';

import { FiltersComponent } from './filters.component';

@Component({
    templateUrl: './filter-by-step.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterByStepComponent {
    initialFilterBy = this.dialogRef.data.filterBy || [];

    filterBy = this.initialFilterBy;

    readonly filters = this.dialogRef.data.filters;

    private filtersDialogRed: DialogRef;

    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef, public _dialogService: DialogService) {}

    nextStep(filter: TableViewSettingsFilterComponent): void {
        this.filtersDialogRed = this._dialogService.open(FiltersComponent, {
            responsivePadding: filter.dialogResponsivePadding,
            verticalPadding: filter.dialogVerticalPadding,
            minWidth: '30%',
            minHeight: '50%',
            backdropClass: 'no-backdrop',
            data: {
                filter: filter,
                filterBy: this.filterBy
            }
        } as DialogConfig);
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
            value: {}
        });
    }
}
