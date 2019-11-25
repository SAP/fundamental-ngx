import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'fd-input-form-group-example',
  templateUrl: './input-form-group-example.component.html',
  styleUrls: ['input-form-group-example.component.scss']
})
export class InputFormGroupExampleComponent implements OnInit {

  myForm: FormGroup;
  arr: FormArray;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      inputControl: new FormControl('', Validators.required),
      disabledInputControl: new FormControl({ value: 'initial value', disabled: true }, Validators.required),
      arr: this.fb.array([this.createItem()])
    })
  }

  createItem() {
    return this.fb.group({
      primaryInput: [''],
      secondaryInput: ['']
    })
  }

  addItem() {
    this.arr = this.myForm.get('arr') as FormArray;
    this.arr.push(this.createItem());
  }

  onSubmit() {
  }
}
