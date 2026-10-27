import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComboboxComponent } from '@fundamental-ngx/core/combobox';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import {
    MessageToastConfig,
    MessageToastService,
    provideMessageToastConfig
} from '@fundamental-ngx/core/message-toast';
import { MOBILE_MODE_CONFIG, MobileModeConfigToken, MobileModeControl } from '@fundamental-ngx/core/mobile-mode';

const GLOBAL_COMBOBOX_CONFIRMATION_CONFIG: MobileModeConfigToken = {
    target: MobileModeControl.COMBOBOX,
    config: {
        title: 'Global confirmation',
        instruction: 'Select an item, then tap Approve to confirm',
        approveButtonText: 'Approve',
        cancelButtonText: 'Cancel',
        hasCloseButton: true,
        dialogConfig: {
            ariaLabel: 'Global confirmation'
        }
    }
};

@Component({
    selector: 'fd-combobox-mobile-global-example',
    templateUrl: './combobox-mobile-global-example.component.html',
    imports: [FormLabelComponent, ComboboxComponent, FormsModule],
    providers: [
        {
            provide: MOBILE_MODE_CONFIG,
            useValue: GLOBAL_COMBOBOX_CONFIRMATION_CONFIG,
            multi: true
        },
        MessageToastService,
        provideMessageToastConfig(new MessageToastConfig())
    ]
})
export class ComboboxMobileGlobalExampleComponent {
    readonly values = input.required<string[]>();

    selectedValue = '';
    commitCount = 0;
    private readonly _messageToastService = inject(MessageToastService);

    onModelChange(value: string): void {
        this.selectedValue = value;
        this.commitCount++;
        this._messageToastService.hideAll();
        this._messageToastService.openFromString(`CVA committed value: ${value || 'None'}`, { duration: 3000 });
    }
}
