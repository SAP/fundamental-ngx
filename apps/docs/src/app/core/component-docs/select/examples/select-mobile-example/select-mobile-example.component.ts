import { Component } from '@angular/core';
import { DialogService, MobileModeConfig } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-select-mobile-example',
    templateUrl: './select-mobile-example.component.html'
})
export class SelectMobileExampleComponent {
    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];
    mobileConfig: MobileModeConfig = { hasCloseButton: true, title: 'Select your favourite fruit' };
    selectedValue: string;

    constructor(private _dialogService: DialogService) { }
}
