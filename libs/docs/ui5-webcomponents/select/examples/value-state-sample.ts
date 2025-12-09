import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent, ValueState } from '@fundamental-ngx/ui5-webcomponents-base';
import { Option } from '@fundamental-ngx/ui5-webcomponents/option';
import { Select } from '@fundamental-ngx/ui5-webcomponents/select';

// Import icon
import '@ui5/webcomponents-icons/dist/arrow-down.js';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-select-value-state-sample',
    templateUrl: './value-state-sample.html',
    standalone: true,
    imports: [Select, Option]
})
export class ValueStateSample {
    valueState = ValueState;
    defaultValue = signal('');
    successValue = signal('option2');
    warningValue = signal('');
    errorValue = signal('');
    infoValue = signal('option1');

    onValueChange(state: string, event: UI5WrapperCustomEvent<Select, 'ui5Change'>): void {
        const value = event.detail.selectedOption.value ?? '';

        switch (state) {
            case 'default':
                this.defaultValue.set(value);
                break;
            case 'success':
                this.successValue.set(value);
                break;
            case 'warning':
                this.warningValue.set(value);
                break;
            case 'error':
                this.errorValue.set(value);
                break;
            case 'info':
                this.infoValue.set(value);
                break;
        }
    }
}
