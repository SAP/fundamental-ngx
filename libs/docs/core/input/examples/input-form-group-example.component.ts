import { Component, OnInit } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    FormControlComponent,
    FormInputMessageGroupComponent,
    FormItemComponent,
    FormLabelComponent,
    FormMessageComponent
} from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-input-form-group-example',
    templateUrl: './input-form-group-example.component.html',
    styleUrls: ['input-form-group-example.component.scss'],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        FormItemComponent,
        FormLabelComponent,
        FormInputMessageGroupComponent,
        FormControlComponent,
        FormMessageComponent,
        ButtonComponent
    ]
})
export class InputFormGroupExampleComponent implements OnInit {
    myForm: FormGroup;
    arr: FormArray;
    numberInputControl: FormControl<number | null>;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.arr = this.fb.array([this.createItem()]);
        this.numberInputControl = new FormControl(0, [Validators.min(0), Validators.max(10)]);
        this.myForm = this.fb.group({
            inputControl: new FormControl('', Validators.required),
            disabledInputControl: new FormControl({ value: 'initial value', disabled: true }, Validators.required),
            numberInputControl: this.numberInputControl,
            arr: this.arr
        });
    }

    createItem(): FormGroup {
        return this.fb.group({
            primaryInput: [''],
            secondaryInput: ['']
        });
    }

    addItem(): void {
        this.arr.push(this.createItem());
    }

    onSubmit(): void {}
}
