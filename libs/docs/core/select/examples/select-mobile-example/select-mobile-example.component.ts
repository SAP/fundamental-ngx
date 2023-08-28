import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { SelectModule } from '@fundamental-ngx/core/select';

@Component({
    selector: 'fd-select-mobile-example',
    templateUrl: './select-mobile-example.component.html',
    standalone: true,
    imports: [SelectModule, NgFor]
})
export class SelectMobileExampleComponent {
    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];
    mobileConfig: MobileModeConfig = { hasCloseButton: true, title: 'Select your favourite fruit' };
    selectedValue: string;
}
