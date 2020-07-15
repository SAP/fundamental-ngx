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
    selector: 'fd-combobox-mobile-example',
    templateUrl: './combobox-mobile-example.component.html',
    providers: [
        { provide: DIALOG_CONFIG, useValue: customConfig },
    ]
})
export class ComboboxMobileExampleComponent {
    selectedValue: string = '';

    config: MobileModeConfig = {
        title: 'Title',
        approveButtonText: 'Approve',
        cancelButtonText: 'Cancel',
        hasCloseButton: true
    };

    values: any[] = ['Apple', 'Banana', 'Pineapple', 'Tomato', 'Kiwi', 'Strawberry', 'Blueberry', 'Orange'];
}
