import { Component } from '@angular/core';
import {
    DIALOG_CONFIG,
    DialogConfig,
    MULTI_INPUT_MOBILE_CONFIG,
    MultiInputMobileConfiguration
} from '@fundamental-ngx/core';

const customConfig: DialogConfig = {
    mobile: true,
    verticalPadding: false,
    maxWidth: '414px',
    maxHeight: '736px'
};

const customMobileModeConfig: MultiInputMobileConfiguration = {
    title: 'Title',
    approveButton: 'Approve',
    cancelButton: 'Cancel',
    closeButton: true
};

@Component({
    selector: 'fd-multi-input-mobile-example',
    templateUrl: './multi-input-mobile-example.component.html',
    styleUrls: ['./multi-input-mobile-example.component.scss'],
    providers: [
        { provide: DIALOG_CONFIG, useValue: customConfig },
        { provide: MULTI_INPUT_MOBILE_CONFIG, useValue: customMobileModeConfig }
    ]
})
export class MultiInputMobileExampleComponent {
    firstValues: any[] = [];
    secondValues: any[] = [];

    secondConfig: MultiInputMobileConfiguration = {
        title: 'Title 2',
        approveButton: 'Approve Button'
    }
}
