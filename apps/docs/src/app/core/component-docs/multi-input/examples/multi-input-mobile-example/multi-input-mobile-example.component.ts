import { Component, Inject, OnInit } from '@angular/core';
import { DIALOG_DEFAULT_CONFIG, DIALOG_REF, DialogConfig, DialogRef } from '@fundamental-ngx/core';

const customConfig: DialogConfig = {
    mobile: true,
    verticalPadding: false,
    maxWidth: '414px',
    maxHeight: '736px',
    defaultObject: {
        cancelButton: 'Cancel',
        title: 'Title',
        approveButton: 'Approve'
    }
};

@Component({
    selector: 'fd-multi-input-mobile-example',
    templateUrl: './multi-input-mobile-example.component.html',
    styleUrls: ['./multi-input-mobile-example.component.scss'],
    providers: [
        { provide: DIALOG_DEFAULT_CONFIG, useValue: customConfig }
    ]
})
export class MultiInputMobileExampleComponent {
}
