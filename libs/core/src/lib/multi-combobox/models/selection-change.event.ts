import { SelectableOptionItem } from '@fundamental-ngx/cdk/forms';
import { MultiComboboxComponent } from '../multi-combobox.component';

export class MultiComboboxSelectionChangeEvent {
    /**
     * Multi Combobox selection change event
     * @param source Multi Combobox component
     * @param selectedItems Selected items
     */
    constructor(
        public source: MultiComboboxComponent,
        public selectedItems: SelectableOptionItem['value'] // Contains selected items
    ) {}
}
