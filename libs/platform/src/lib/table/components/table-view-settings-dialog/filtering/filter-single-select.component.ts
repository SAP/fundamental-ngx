import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CollectionFilter, TableFilterSelectOption } from '@fundamental-ngx/platform/table-helpers';

import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListComponent, ListItemComponent, ListTitleDirective } from '@fundamental-ngx/core/list';
import { RadioButtonComponent } from '@fundamental-ngx/core/radio';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { NOT_FILTERED_OPTION_VALUE } from './constants';

/**
 * Single Select filter type.
 *
 */

@Component({
    selector: 'fdp-filter-single-select',
    templateUrl: './filter-single-select.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        ListComponent,
        ListItemComponent,
        RadioButtonComponent,
        FormsModule,
        ListTitleDirective,
        NgFor,
        FdTranslatePipe
    ]
})
export class FilterSingleSelectComponent {
    /** Selectable filter options */
    @Input()
    options: TableFilterSelectOption[] = [];

    /** The filter model */
    @Input()
    set filterBy(filterBy: CollectionFilter | undefined) {
        const value = filterBy?.value?.[0];
        this._value = value === undefined ? NOT_FILTERED_OPTION_VALUE : value;
    }

    /** Filter model change event */
    @Output()
    valueChange: EventEmitter<any[]> = new EventEmitter();

    /** @hidden */
    readonly NOT_FILTERED_OPTION_VALUE = NOT_FILTERED_OPTION_VALUE;

    /**
     * @hidden
     * Currently selected value
     */
    _value: any;

    /** @hidden */
    _onValueChange(value: unknown): void {
        if (value === this._value) {
            return;
        }

        this._value = value;

        if (value === NOT_FILTERED_OPTION_VALUE) {
            this.valueChange.emit([]);
        } else {
            this.valueChange.emit([value]);
        }
    }
}
