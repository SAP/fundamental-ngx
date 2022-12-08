import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { OptionItem } from '@fundamental-ngx/platform/shared';
import { FdpSelectionChangeEvent } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-select-forms',
    templateUrl: './platform-select-forms.component.html',
    styleUrls: ['platform-select-forms.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformSelectFormsComponent {
    fromData: OptionItem[] = [
        { label: 'Apple', value: 'A' },
        { label: 'Banana', value: 'B' },
        { label: 'Pineapple', value: 'C' },
        { label: 'Strawberry', value: 'D' },
        { label: 'Broccoli', value: 'E' },
        { label: 'Carrot', value: 'F' },
        { label: 'Jalapeño', value: 'G' },
        { label: 'Spinach', value: 'H' }
    ];

    customForm = new FormGroup({
        field: new FormControl()
    });

    selectedItem = null;

    onSelect(item: FdpSelectionChangeEvent): void {
        this.selectedItem = item.payload;
    }
}
