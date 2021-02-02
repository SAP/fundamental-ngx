import { Component } from '@angular/core';
import { MobileModeConfig } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-select-mobile-example',
    templateUrl: './platform-select-mobile-example.component.html'
})
export class PlatformSelectMobileExampleComponent {
    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];
    mobileConfig: MobileModeConfig = { hasCloseButton: true, title: 'Select your favourite fruit' };
    selectedValue: string;
}
