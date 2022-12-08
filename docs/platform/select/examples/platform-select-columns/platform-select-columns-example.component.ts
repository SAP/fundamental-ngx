import { ChangeDetectionStrategy, Component } from '@angular/core';

import { OptionItem } from '@fundamental-ngx/platform/shared';
import { FdpSelectionChangeEvent } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-select-columns-example',
    templateUrl: './platform-select-columns-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformSelectColumnsExampleComponent {
    option: OptionItem[] = [
        { label: 'Apple', secondaryText: 'Fruits', value: 'Apple' },
        { label: 'Banana', secondaryText: 'Fruits', value: 'Banana' },
        { label: 'Lorem ipsum dolor sit, amet', secondaryText: 'Fruits', value: 'Pineapple' },
        { label: 'Strawberry', secondaryText: 'Fruits', value: 'Strawberry' },
        {
            label: 'et tempore cum. Corporis,Lorem ipsum dolor sit, amet nobis',
            secondaryText: 'Vegetables',
            value: 'Broccoli'
        },
        { label: 'Carrot', secondaryText: 'Vegetables', value: 'Carrot' },
        { label: 'Jalapeño', secondaryText: 'Vegetables', value: 'Jalapeño' },
        {
            label: 'Lorem Lorem ipsum dolor sit, ametipsum dolor sit, amet',
            secondaryText: 'Vegetables',
            value: 'Spinach'
        }
    ];

    selectedItem = null;

    onSelect(item: FdpSelectionChangeEvent): void {
        this.selectedItem = item.payload;
    }
}
