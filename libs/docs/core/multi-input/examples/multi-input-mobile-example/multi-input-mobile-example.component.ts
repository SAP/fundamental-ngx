import { Component } from '@angular/core';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiInputModule } from '@fundamental-ngx/core/multi-input';
import { FormLabelModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-multi-input-mobile-example',
    templateUrl: './multi-input-mobile-example.component.html',
    standalone: true,
    imports: [FormLabelModule, MultiInputModule, FormsModule, JsonPipe]
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
