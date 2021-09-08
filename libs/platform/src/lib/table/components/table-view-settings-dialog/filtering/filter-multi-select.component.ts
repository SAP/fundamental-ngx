import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { CollectionSelectFilter } from '../../../interfaces/collection-filter.interface';
import { TableFilterSelectOption } from '../../../interfaces/selection-value.interface';

/**
 * Multi Select filter type.
 *
 */

type SelectableOption = TableFilterSelectOption & { selected: boolean };

@Component({
    selector: 'fdp-filter-multi-select',
    templateUrl: './filter-multi-select.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterMultiSelectComponent {
    /** Selectable filter options */
    @Input()
    options: TableFilterSelectOption[] = [];

    /** The filter model */
    @Input()
    set filterBy(filterBy: CollectionSelectFilter) {
        const filterByValue = filterBy?.value || [];
        this._selectableOptions = this.options.map(
            (option): SelectableOption => ({
                ...option,
                selected: filterByValue.includes(option.value)
            })
        );
        this._updateValueBasedOnOptions();
    }

    /** Filter model change event */
    @Output()
    valueChange: EventEmitter<any[]> = new EventEmitter();

    /**
     * @hidden
     * Currently selected values
     */
    _value: any[];

    /** @hidden */
    _selectableOptions: SelectableOption[];

    /** @hidden */
    _onSelectChange(option: SelectableOption, selected: boolean): void {
        option.selected = selected;
        this._updateValueBasedOnOptions();
        this.valueChange.emit(this._value);
    }

    /** @hidden */
    _updateValueBasedOnOptions(): void {
        this._value = this._selectableOptions.filter(({ selected }) => selected).map(({ value }) => value);
    }
}
