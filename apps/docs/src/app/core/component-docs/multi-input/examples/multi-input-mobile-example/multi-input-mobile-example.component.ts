import { Component } from '@angular/core';
import { MobileModeConfig } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-multi-input-mobile-example',
    templateUrl: './multi-input-mobile-example.component.html'
})
export class MultiInputMobileExampleComponent {
    selectedValues: any[] = [];

    secondConfig: MobileModeConfig = {
        approveButtonText: 'Approve',
        cancelButtonText: 'Cancel',
        hasCloseButton: true
    };

    values: any[] = ['Apple', 'Banana', 'Pineapple', 'Tomato', 'Kiwi', 'Strawberry', 'Blueberry', 'Orange'];
}
