import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComboboxComponent } from '@fundamental-ngx/core/combobox';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import {
    MessageToastConfig,
    MessageToastService,
    provideMessageToastConfig
} from '@fundamental-ngx/core/message-toast';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { ComboboxMobileGlobalExampleComponent } from './combobox-mobile-global-example.component';

@Component({
    selector: 'fd-combobox-mobile-example',
    templateUrl: './combobox-mobile-example.component.html',
    imports: [FormLabelComponent, ComboboxComponent, FormsModule, ComboboxMobileGlobalExampleComponent],
    providers: [MessageToastService, provideMessageToastConfig(new MessageToastConfig())]
})
export class ComboboxMobileExampleComponent {
    selectedValue = '';
    localCommitCount = 0;

    immediateSelectedValue = '';
    immediateCommitCount = 0;

    mobileConfig: MobileModeConfig = {
        title: 'Confirm selection',
        instruction: 'Select an item, then tap Approve to confirm',
        approveButtonText: 'Approve',
        cancelButtonText: 'Cancel',
        hasCloseButton: true,
        dialogConfig: {
            ariaLabel: 'Confirm selection'
        }
    };

    readonly immediateMobileConfig: MobileModeConfig = {
        title: 'Immediate selection',
        instruction: 'Tap an item to select and close immediately',
        approveButtonText: undefined,
        cancelButtonText: 'Cancel',
        hasCloseButton: true,
        dialogConfig: {
            ariaLabel: 'Immediate selection'
        }
    };

    readonly values = ['Apple', 'Banana', 'Pineapple', 'Tomato', 'Kiwi', 'Strawberry', 'Blueberry', 'Orange'];
    private readonly _messageToastService = inject(MessageToastService);

    onLocalModelChange(value: string): void {
        this.selectedValue = value;
        this.localCommitCount++;
        this._showCommitToast(value);
    }

    onImmediateModelChange(value: string): void {
        this.immediateSelectedValue = value;
        this.immediateCommitCount++;
        this._showCommitToast(value);
    }

    private _showCommitToast(value: string): void {
        this._messageToastService.hideAll();
        this._messageToastService.openFromString(`CVA committed value: ${value || 'None'}`, { duration: 3000 });
    }
}
