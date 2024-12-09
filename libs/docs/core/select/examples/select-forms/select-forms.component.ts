import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { SelectModule } from '@fundamental-ngx/core/select';

@Component({
    selector: 'fd-select-forms',
    templateUrl: './select-forms.component.html',
    styleUrls: ['select-forms.component.scss'],
    imports: [FormsModule, ReactiveFormsModule, SelectModule, ButtonComponent]
})
export class SelectFormsComponent {
    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];

    customForm = new FormGroup({
        selectControl: new FormControl(this.options[0], Validators.required)
    });

    disabledForm = new FormGroup({
        disabledControl: new FormControl({ value: 'Apple', disabled: true }, Validators.required)
    });

    toggleDisabledState(): void {
        this.disabledForm.controls.disabledControl.enabled
            ? this.disabledForm.controls.disabledControl.disable()
            : this.disabledForm.controls.disabledControl.enable();
    }
}
