import { Component, signal } from '@angular/core';
import {
    FormControlComponent,
    FormInputMessageGroupComponent,
    FormItemComponent,
    FormLabelComponent,
    FormMessageComponent,
    NumberValidationError
} from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-input-number-example',
    templateUrl: './input-number-example.component.html',
    styleUrls: ['./input-number-example.component.scss'],
    imports: [
        FormInputMessageGroupComponent,
        FormItemComponent,
        FormLabelComponent,
        FormControlComponent,
        FormMessageComponent
    ]
})
export class InputNumberExampleComponent {
    readonly minMaxError = signal<NumberValidationError | null>(null);

    onMinMaxValidation(error: NumberValidationError | null): void {
        this.minMaxError.set(error?.type === 'min' || error?.type === 'max' ? error : null);
    }
}
