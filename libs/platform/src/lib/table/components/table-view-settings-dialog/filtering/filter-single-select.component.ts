import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ContentDensity } from '@fundamental-ngx/core/utils';

import { CollectionFilter } from '../../../interfaces/collection-filter.interface';
import { TableFilterSelectOption } from '../../../interfaces/selection-value.interface';
import { NOT_FILTERED_OPTION_VALUE } from './constants';

/**
 * Single Select filter type.
 *
 */

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
    set filterBy(filterBy: CollectionFilter | undefined) {
        const value = filterBy?.value?.[0];
        this._value = value === undefined ? NOT_FILTERED_OPTION_VALUE : value;
    }

    /** Table's content density to be used */
    @Input()
    contentDensity: ContentDensity;

    /** Filter model change event */
    @Output()
    valueChange: EventEmitter<any[]> = new EventEmitter();

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
