import { Component, OnInit } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { NgFor } from '@angular/common';
import { FormControlModule } from '@fundamental-ngx/core/form';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { FormItemModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-input-form-group-example',
    templateUrl: './input-form-group-example.component.html',
    styleUrls: ['input-form-group-example.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, FormItemModule, FormLabelModule, FormControlModule, NgFor, ButtonModule]
})
export class InputFormGroupExampleComponent implements OnInit {
    myForm: FormGroup;
    arr: FormArray;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.arr = this.fb.array([this.createItem()]);
        this.myForm = this.fb.group({
            inputControl: new FormControl('', Validators.required),
            disabledInputControl: new FormControl({ value: 'initial value', disabled: true }, Validators.required),
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
