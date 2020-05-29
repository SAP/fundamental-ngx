import { Component } from '@angular/core';
import {
    DIALOG_CONFIG,
    DialogConfig,
    MobileModeConfig
} from '@fundamental-ngx/core';

const customConfig: DialogConfig = {
    mobile: true,
    verticalPadding: false,
    maxWidth: '414px',
    maxHeight: '736px'
};

@Component({
    selector: 'fd-multi-input-mobile-example',
    templateUrl: './multi-input-mobile-example.component.html',
    providers: [
        { provide: DIALOG_CONFIG, useValue: customConfig },
    ]
})
export class MultiInputMobileExampleComponent {
    selectedValues: any[] = [];

    secondConfig: MobileModeConfig = {
        title: 'Title',
        approveButtonText: 'Approve',
        cancelButtonText: 'Cancel',
        hasCloseButton: true
    };

    values: any[] = ['Apple', 'Banana', 'Pineapple', 'Tomato', 'Kiwi', 'Strawberry', 'Blueberry', 'Orange'];
}
