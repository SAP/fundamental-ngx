import { Component, signal } from '@angular/core';
import { Label } from '@fundamental-ngx/ui5-webcomponents';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { NumericInput } from '@fundamental-ngx/ui5-webcomponents/numeric-input';

@Component({
    selector: 'ui5-doc-numeric-input-basic-sample',
    templateUrl: './basic-sample.html',
    styleUrls: ['./styles.scss'],
    imports: [NumericInput, Label]
})
export class BasicSample {
    value1 = signal(0);
    value2 = signal(10);

    onValueChange(event: UI5WrapperCustomEvent<NumericInput, 'ui5Change'>, valueSignal: typeof this.value1): void {
        valueSignal.set(Number(event.currentTarget.value ?? 0));
    }
}
