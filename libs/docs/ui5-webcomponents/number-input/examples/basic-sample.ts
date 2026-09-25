import { Component, signal } from '@angular/core';
import { Label } from '@fundamental-ngx/ui5-webcomponents';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { NumberInput } from '@fundamental-ngx/ui5-webcomponents/number-input';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-number-input-basic-sample',
    templateUrl: './basic-sample.html',
    imports: [NumberInput, Label]
})
export class BasicSample {
    value1 = signal(0);
    value2 = signal(10);

    onValueChange(event: UI5WrapperCustomEvent<NumberInput, 'ui5Change'>, valueSignal: typeof this.value1): void {
        const target = event.target as any;
        valueSignal.set(Number(target.value ?? 0));
    }
}
