import { SelectableOptionItem } from '@fundamental-ngx/cdk/forms';
import { BaseMultiCombobox } from '../base-multi-combobox.class';

export class MultiComboboxSelectionChangeEvent {
    /**
     * Multi Combobox selection change event
     * @param source Multi Combobox component
     * @param selectedItems Selected items
     */
    constructor(
        public source: BaseMultiCombobox,
        public selectedItems: SelectableOptionItem['value'] // Contains selected items
    ) {}
}
