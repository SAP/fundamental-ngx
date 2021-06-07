import { Component } from '@angular/core';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';

@Component({
    selector: 'fd-select-mobile-example',
    templateUrl: './select-mobile-example.component.html'
})
export class SelectMobileExampleComponent {
    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];
    mobileConfig: MobileModeConfig = { hasCloseButton: true, title: 'Select your favourite fruit' };
    selectedValue: string;
}
