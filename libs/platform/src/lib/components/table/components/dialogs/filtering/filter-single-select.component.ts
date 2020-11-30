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
        this._value = filterBy?.value?.[0];
    }

    @Output()
    valueChange: EventEmitter<[unknown]> = new EventEmitter<[unknown]>();

    /** @hidden */
    _value: unknown;

    /** @hidden */
    _onValueChange(value: unknown): void {
        if (value === this._value) {
            return;
        }
        this._value = value;

        this.valueChange.emit([value]);
    }
}
