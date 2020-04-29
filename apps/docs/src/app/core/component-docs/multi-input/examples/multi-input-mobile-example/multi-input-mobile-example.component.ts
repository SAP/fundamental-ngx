import { Component, OnInit } from '@angular/core';
import { DIALOG_DEFAULT_CONFIG, DialogConfig } from '@fundamental-ngx/core';

const customConfig: DialogConfig = {
    defaultObject: {
        cancelButton: 'cancel',
        title: 'Title'
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
export class MultiInputMobileExampleComponent {}
