import {
    ChangeDetectionStrategy,
    Component,
    effect,
    EventEmitter,
    Input,
    Output,
    viewChildren,
    ViewEncapsulation
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { ListComponent, ListItemComponent, ListTitleDirective } from '@fundamental-ngx/core/list';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { CollectionFilter, TableFilterSelectOption } from '@fundamental-ngx/platform/table-helpers';

/**
 * Multi Select filter type.
 *
 */

type SelectableOption = TableFilterSelectOption & { selected: boolean };

@Component({
    selector: 'fdp-filter-multi-select',
    templateUrl: './filter-multi-select.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [ListComponent, ListItemComponent, CheckboxComponent, FormsModule, ListTitleDirective, FdTranslatePipe]
})
export class FilterMultiSelectComponent {
    /** Selectable filter options */
    @Input()
    options: TableFilterSelectOption[] = [];

    /** The filter model */
    @Input()
    set filterBy(filterBy: CollectionFilter | undefined) {
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

    /** @hidden */
    readonly listItems = viewChildren(ListItemComponent);

    /**
     * @hidden
     * Currently selected values
     */
    _value: any[];

    /** @hidden */
    _selectableOptions: SelectableOption[];

    /** @hidden */
    constructor() {
        effect(() => {
            const items = this.listItems();
            if (items.length > 0) {
                items[0].focus();
            }
        });
    }

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
