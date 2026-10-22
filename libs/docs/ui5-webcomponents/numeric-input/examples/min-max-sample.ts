import { Component, signal } from '@angular/core';
import { Label } from '@fundamental-ngx/ui5-webcomponents';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { NumericInput } from '@fundamental-ngx/ui5-webcomponents/numeric-input';
@Component({
    selector: 'ui5-doc-numeric-input-min-max-sample',
    templateUrl: './min-max-sample.html',
    styleUrls: ['./styles.scss'],
    imports: [NumericInput, Label]
})
export class MinMaxSample {
    value = signal(5);

    onValueChange(event: UI5WrapperCustomEvent<NumericInput, 'ui5Change'>): void {
        this.value.set(Number(event.currentTarget.value ?? 0));
    }
}
