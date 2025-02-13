import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { MultiInputComponent } from '@fundamental-ngx/core/multi-input';

@Component({
    selector: 'fd-multi-input-mobile-example',
    templateUrl: './multi-input-mobile-example.component.html',
    imports: [FormLabelComponent, MultiInputComponent, FormsModule, JsonPipe]
})
export class MultiInputMobileExampleComponent {
    selectedValues: any[] = [];

    secondConfig: MobileModeConfig = {
        approveButtonText: 'Approve',
        cancelButtonText: 'Cancel',
        hasCloseButton: true,
        dialogConfig: {
            ariaLabel: 'Select fruits dialog'
        }
    };

    values: any[] = ['Apple', 'Banana', 'Pineapple', 'Tomato', 'Kiwi', 'Strawberry', 'Blueberry', 'Orange'];
}
