import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { CollectionSelectFilter, TableFilterSelectOption } from '../../../interfaces';

/**
 * Single Select filter type.
 * 
 */

const NOT_FILTERED_OPTION_VALUE = null;

@Component({
    selector: 'fdp-filter-single-select',
    templateUrl: './filter-single-select.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterSingleSelectComponent {
    /** Selectable filter options */
    @Input()
    options: TableFilterSelectOption[] = [];

    /** The filter model */
    @Input()
    set filterBy(filterBy: CollectionSelectFilter) {
        const value = filterBy?.value?.[0];
        this._value = value === undefined ? NOT_FILTERED_OPTION_VALUE : value;
    }

    /** Filter model change event */
    @Output()
    valueChange: EventEmitter<unknown[]> = new EventEmitter<unknown[]>();

    readonly NOT_FILTERED_OPTION_VALUE = NOT_FILTERED_OPTION_VALUE;

    /** Currently selected value */
    _value: unknown;

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
