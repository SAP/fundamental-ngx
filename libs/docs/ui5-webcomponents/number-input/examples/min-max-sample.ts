import { Component, signal } from '@angular/core';
import { Label } from '@fundamental-ngx/ui5-webcomponents';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { NumberInput } from '@fundamental-ngx/ui5-webcomponents/number-input';
@Component({
    selector: 'ui5-doc-number-input-min-max-sample',
    templateUrl: './min-max-sample.html',
    styleUrls: ['./styles.scss'],
    imports: [NumberInput, Label]
})
export class MinMaxSample {
    value = signal(5);

    onValueChange(event: UI5WrapperCustomEvent<NumberInput, 'ui5Change'>): void {
        this.value.set(Number(event.currentTarget.value ?? 0));
    }
}
