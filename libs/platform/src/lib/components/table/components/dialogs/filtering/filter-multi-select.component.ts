import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { CollectionSelectFilter, SelectionValue } from '../../../interfaces';

type SelectableOption = SelectionValue & { selected: boolean };

@Component({
    selector: 'fdp-filter-multi-select',
    templateUrl: './filter-multi-select.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterMultiSelectComponent {
    @Input()
    options: SelectionValue[] = [];

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

    @Output()
    valueChange: EventEmitter<unknown[]> = new EventEmitter<unknown[]>();

    /** @hidden */
    _value: unknown[];

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
