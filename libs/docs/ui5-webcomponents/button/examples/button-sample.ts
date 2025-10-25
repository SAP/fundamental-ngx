import { Component, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import '@ui5/webcomponents-icons/dist/AllIcons.js';

@Component({
    selector: 'ui5-button-sample',
    templateUrl: './button-sample.html',
    standalone: true,
    imports: [Button],
    styles: [
        `
            ui5-button {
                margin-right: 8px;
            }
        `
    ]
})
export class ButtonExample {
    // Example click handler
    onButtonClick(event: any, buttonLabel: string): void {
        console.log(`${buttonLabel} clicked`, event);
    }

    // Example for loading state
    isLoading = signal(false);

    delay = signal(500);

    toggleLoading(): void {
        this.isLoading.set(!this.isLoading());
    }
}
