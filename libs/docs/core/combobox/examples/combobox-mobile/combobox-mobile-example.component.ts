import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComboboxComponent } from '@fundamental-ngx/core/combobox';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';

@Component({
    selector: 'fd-combobox-mobile-example',
    templateUrl: './combobox-mobile-example.component.html',
    imports: [FormLabelComponent, ComboboxComponent, FormsModule]
})
export class ComboboxMobileExampleComponent {
    selectedValue = '';

    mobileConfig: MobileModeConfig = {
        title: 'Title',
        approveButtonText: 'Approve',
        cancelButtonText: 'Cancel',
        hasCloseButton: true,
        dialogConfig: {
            ariaLabel: 'Title'
        }
    };

    values: any[] = ['Apple', 'Banana', 'Pineapple', 'Tomato', 'Kiwi', 'Strawberry', 'Blueberry', 'Orange'];
}
