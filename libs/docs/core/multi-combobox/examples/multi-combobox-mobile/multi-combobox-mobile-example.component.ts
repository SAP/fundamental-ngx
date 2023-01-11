import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { MultiComboboxSelectionChangeEvent } from '@fundamental-ngx/core/multi-combobox';

@Component({
    selector: 'fd-multi-combobox-mobile-example',
    templateUrl: './multi-combobox-mobile-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiComboboxMobileExampleComponent {
    dataSource = [
        { name: 'Apple', type: 'Fruits' },
        { name: 'Banana', type: 'Fruits' },
        { name: 'Pineapple', type: 'Fruits' },
        { name: 'Strawberry', type: 'Fruits' },
        { name: 'Broccoli', type: 'Vegetables' },
        { name: 'Carrot', type: 'Vegetables' },
        { name: 'Jalapeño', type: 'Vegetables' },
        { name: 'Spinach', type: 'Vegetables' }
    ];

    selectedItems = [];

    mobileConfig: MobileModeConfig = {
        title: 'Title',
        approveButtonText: 'Save',
        cancelButtonText: 'Cancel',
        hasCloseButton: true
    };

    onSelect(item: MultiComboboxSelectionChangeEvent): void {
        this.selectedItems = item.selectedItems;
    }
}
