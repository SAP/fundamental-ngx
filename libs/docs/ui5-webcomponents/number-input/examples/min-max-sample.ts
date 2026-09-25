import { Component, signal } from '@angular/core';
import { Label } from '@fundamental-ngx/ui5-webcomponents';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { NumberInput } from '@fundamental-ngx/ui5-webcomponents/number-input';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-number-input-min-max-sample',
    templateUrl: './min-max-sample.html',
    imports: [NumberInput, Label]
})
export class MinMaxSample {
    value = signal(5);

    onValueChange(event: UI5WrapperCustomEvent<NumberInput, 'ui5Change'>): void {
        const target = event.target as any;
        this.value.set(Number(target.value ?? 0));
    }
}
