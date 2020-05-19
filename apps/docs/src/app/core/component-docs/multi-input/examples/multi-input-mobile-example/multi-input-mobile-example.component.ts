import { Component } from '@angular/core';
import {
    DIALOG_CONFIG,
    DialogConfig,
    MULTI_INPUT_MOBILE_CONFIG,
    DropdownMobileConfiguration
} from '@fundamental-ngx/core';

const customConfig: DialogConfig = {
    mobile: true,
    verticalPadding: false,
    maxWidth: '414px',
    maxHeight: '736px'
};

const customMobileModeConfig: DropdownMobileConfiguration = {
    title: 'Title',
    approveButtonText: 'Approve',
    cancelButtonText: 'Cancel',
    hasCloseButton: true
};

@Component({
    selector: 'fd-multi-input-mobile-example',
    templateUrl: './multi-input-mobile-example.component.html',
    providers: [
        { provide: DIALOG_CONFIG, useValue: customConfig },
        { provide: MULTI_INPUT_MOBILE_CONFIG, useValue: customMobileModeConfig }
    ]
})
export class MultiInputMobileExampleComponent {
    firstValues: any[] = [];
    secondValues: any[] = [];

    secondConfig: DropdownMobileConfiguration = {
        title: 'Title 2',
        approveButtonText: 'Approve Button'
    };

    values: any[] = ['Apple', 'Banana', 'Pineapple', 'Tomato', 'Kiwi', 'Strawberry', 'Blueberry', 'Orange'];
}
