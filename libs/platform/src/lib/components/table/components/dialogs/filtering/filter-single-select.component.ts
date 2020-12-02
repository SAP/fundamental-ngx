import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { CollectionSelectFilter, SelectionValue } from '../../../interfaces';

@Component({
    selector: 'fdp-filter-single-select',
    templateUrl: './filter-single-select.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterSingleSelectComponent {
    @Input()
    options: SelectionValue[] = [];

    @Input()
    set filterBy(filterBy: CollectionSelectFilter) {
        const value = filterBy?.value?.[0];
        this._value = value === undefined ? this.NOT_FILTERED_OPTION_VALUE : value;
    }

    @Output()
    valueChange: EventEmitter<unknown[]> = new EventEmitter<unknown[]>();

    readonly NOT_FILTERED_OPTION_VALUE = null;

    /** @hidden */
    _value: unknown;

    /** @hidden */
    _onValueChange(value: unknown): void {
        if (value === this._value) {
            return;
        }

        this._value = value;

        if (value === this.NOT_FILTERED_OPTION_VALUE) {
            this.valueChange.emit([]);
        } else {
            this.valueChange.emit([value]);
        }
    }
}
