import { Component, signal } from '@angular/core';

import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { CheckBox } from '@fundamental-ngx/ui5-webcomponents/check-box';

@Component({
    selector: 'ui5-basic-checkbox-sample',
    standalone: true,
    imports: [CheckBox],
    templateUrl: './basic-sample.html',
    styles: [
        `
            .checkbox-examples {
                display: flex;
                align-items: flex-start;
                padding: 1rem;
                flex-direction: column;
            }

            .checkbox-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .checkbox-value {
                margin: 1rem;
                font-family: monospace;
            }
        `
    ]
})
export class BasicCheckBoxSample {
    checked = signal(false);

    onCheckboxChange(event: UI5WrapperCustomEvent<CheckBox, 'ui5Change'>): void {
        this.checked.set(event.target?.['checked']);
    }
}
