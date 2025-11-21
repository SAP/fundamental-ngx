import { Component, signal, WritableSignal } from '@angular/core';
import { ButtonDesign, CheckBox, Option, Select } from '@fundamental-ngx/ui5-webcomponents';
import { ToggleButton } from '@fundamental-ngx/ui5-webcomponents/toggle-button';

// Import SAP Icon
import '@ui5/webcomponents-icons/dist/settings.js';

@Component({
    selector: 'ui5-toggle-button-interactive-sample',
    templateUrl: './interactive.html',
    standalone: true,
    imports: [ToggleButton, Select, Option, CheckBox]
})
export class ToggleButtonInteractiveSample {
    readonly designs: Array<keyof typeof ButtonDesign> = Object.keys(ButtonDesign) as Array<keyof typeof ButtonDesign>;

    readonly selectedDesign: WritableSignal<keyof typeof ButtonDesign> = signal('Default');
    readonly isPressed = signal(false);
    readonly isDisabled = signal(false);
    readonly hasIcon = signal(false);
    readonly hasText = signal(true);
    readonly isLoading = signal(false);

    onDesignChange(event: any): void {
        const selectedOption = event.detail?.selectedOption;
        if (selectedOption) {
            this.selectedDesign.set(selectedOption.getAttribute('value') || 'Default');
        }
    }

    onToggleClick(): void {
        if (!this.isDisabled() && !this.isLoading()) {
            this.isPressed.update((v) => !v);
        }
    }

    onDisabledChange(event: any): void {
        this.isDisabled.set(event.target.checked);
    }

    onIconChange(event: any): void {
        this.hasIcon.set(event.target.checked);
    }

    onTextChange(event: any): void {
        this.hasText.set(event.target.checked);
    }

    onLoadingChange(event: any): void {
        this.isLoading.set(event.target.checked);
    }
}
