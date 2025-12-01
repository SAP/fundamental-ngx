import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { DateTimePicker } from '@fundamental-ngx/ui5-webcomponents/date-time-picker';

@Component({
    selector: 'ui5-date-time-picker-value-state-sample',
    templateUrl: './value-state-sample.html',
    standalone: true,
    imports: [DateTimePicker]
})
export class ValueStateSample {
    noneValue = signal('');
    negativeValue = signal('');
    criticalValue = signal('');
    positiveValue = signal('2024-12-25T14:30:00');
    informationValue = signal('');

    onValueChange(
        event: UI5WrapperCustomEvent<DateTimePicker, 'ui5Change'>,
        stateSetter: (value: string) => void
    ): void {
        stateSetter(event.detail.value);
    }
}
