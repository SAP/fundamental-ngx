import { Component, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FieldsetComponent, FormItemComponent, FormLegendDirective } from '@fundamental-ngx/core/form';
import { RadioButtonComponent } from '@fundamental-ngx/core/radio';

@Component({
    selector: 'fd-radio-form-group-example',
    templateUrl: './radio-form-group-example.component.html',
    imports: [
        ButtonComponent,
        ReactiveFormsModule,
        FieldsetComponent,
        FormItemComponent,
        FormLegendDirective,
        RadioButtonComponent
    ]
})
export class RadioFormGroupExampleComponent {
    readonly options = [1, 2, 3] as const;
    readonly customForm = new FormGroup({
        radioInput: new FormControl<number | null>(1),
        disabledRadio: new FormControl<number | null>({ value: 1, disabled: true }),
        readonlyRadio: new FormControl<number | null>(1)
    });

    protected readonly readonlyRadioState = computed(() => {
        this._readonlyRadioEvents();
        const { value, touched, dirty, valid } = this.customForm.controls.readonlyRadio;
        return { value, touched, dirty, valid };
    });

    private readonly _readonlyRadioEvents = toSignal(this.customForm.controls.readonlyRadio.events, {
        initialValue: null
    });

    protected setReadonlyRadioValue(): void {
        this.customForm.controls.readonlyRadio.setValue(3);
    }

    protected resetReadonlyRadio(): void {
        this.customForm.controls.readonlyRadio.reset();
    }
}
