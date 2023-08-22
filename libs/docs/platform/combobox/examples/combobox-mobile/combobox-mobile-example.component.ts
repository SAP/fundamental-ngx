import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { DATA_PROVIDERS } from '@fundamental-ngx/platform/shared';
import { ComboboxSelectionChangeEvent } from '@fundamental-ngx/platform/form';
import { JsonPipe } from '@angular/common';
import { PlatformComboboxModule } from '@fundamental-ngx/platform/form';
import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-combobox-mobile-example',
    templateUrl: './combobox-mobile-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: DATA_PROVIDERS, useValue: new Map() }],
    standalone: true,
    imports: [FdpFormGroupModule, PlatformComboboxModule, JsonPipe]
})
export class ComboboxMobileExampleComponent {
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

    selectedItem = null;

    mobileConfig: MobileModeConfig = {
        title: 'Title',
        approveButtonText: 'Save',
        cancelButtonText: 'Cancel',
        hasCloseButton: true
    };

    onSelect(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem = item.payload;
    }
}
