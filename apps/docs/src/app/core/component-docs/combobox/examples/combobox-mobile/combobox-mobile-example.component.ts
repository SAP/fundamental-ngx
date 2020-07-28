import { Component } from '@angular/core';
import { MobileModeConfig } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-combobox-mobile-example',
    templateUrl: './combobox-mobile-example.component.html',
})
export class ComboboxMobileExampleComponent {
    selectedValue: string = '';

    mobileConfig: MobileModeConfig = {
        title: 'Title',
        approveButtonText: 'Approve',
        cancelButtonText: 'Cancel',
        hasCloseButton: true
    };

    values: any[] = ['Apple', 'Banana', 'Pineapple', 'Tomato', 'Kiwi', 'Strawberry', 'Blueberry', 'Orange'];
}
