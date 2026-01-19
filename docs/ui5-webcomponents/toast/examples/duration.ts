import { Component, signal } from '@angular/core';
import { Button, Label, Option, Select, Toast } from '@fundamental-ngx/ui5-webcomponents';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-toast-duration-sample',
    templateUrl: './duration.html',
    standalone: true,
    imports: [Toast, Button, Select, Option, Label]
})
export class ToastDurationSample {
    readonly durations = [
        { value: 1000, label: '1 second' },
        { value: 3000, label: '3 seconds' },
        { value: 5000, label: '5 seconds' },
        { value: 10000, label: '10 seconds' }
    ];

    readonly selectedDuration = signal(3000);
    readonly isToastOpen = signal(false);
    readonly toastMessage = signal('This toast will auto-close after the selected duration');

    onDurationChange(event: UI5WrapperCustomEvent<Select, 'ui5Change'>): void {
        const selectedOption = event.detail?.selectedOption;
        if (selectedOption) {
            const duration = parseInt(selectedOption.getAttribute('value') || '3000');
            this.selectedDuration.set(duration);
        }
    }

    showToast(): void {
        this.isToastOpen.set(true);
    }

    onToastClose(): void {
        this.isToastOpen.set(false);
    }
}
