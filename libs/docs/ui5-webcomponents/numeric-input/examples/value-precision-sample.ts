import { Component, signal } from '@angular/core';
import { Label } from '@fundamental-ngx/ui5-webcomponents';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { NumericInput } from '@fundamental-ngx/ui5-webcomponents/numeric-input';

@Component({
    selector: 'ui5-doc-numeric-input-value-precision-sample',
    templateUrl: './value-precision-sample.html',
    styleUrls: ['./styles.scss'],
    imports: [NumericInput, Label]
})
export class ValuePrecisionSample {
    value1 = signal(3.14);
    value2 = signal(99.999);

    onValueChange(event: UI5WrapperCustomEvent<NumericInput, 'ui5Change'>, valueSignal: typeof this.value1): void {
        valueSignal.set(Number(event.currentTarget.value ?? 0));
    }
}
