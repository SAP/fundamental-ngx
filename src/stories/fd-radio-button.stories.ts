import { moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, text, boolean, number, radios, array } from '@storybook/addon-knobs';
import { NgForm, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

import { RadioButtonComponent, RadioModule } from '../../libs/core/src/lib/radio/public_api';

export default {
  title: 'Fd radio button',
  component: RadioButtonComponent,
  moduleMetadata: moduleMetadata,
  decorators: [
    withKnobs,
    moduleMetadata({
      imports: [RadioModule, ReactiveFormsModule],
      declarations: []
    })
  ]
};

const stateOptions = {
  valid: 'valid',
  invalid: 'invalid',
  warning: 'warning',
  default: 'default',
  information: 'information'
};

const stateDefaultValue = 'default';

const radioValues = ['1', '2', '3'];

export const NgModel = () => ({
  template: `  
  <div fd-form-item *ngFor="let value of radioButtonValues">
    <fd-radio-button
        (click)="onClick(value)"
        [state]="state"
        [value]="value"
        [name]="name"
        [(ngModel)]="model">
          Option {{ value }}
    </fd-radio-button>
  </div>
`,
  props: {
    model: text('[(ngModel)]', '1'),
    name: 'radio-buttons-ngmodel',
    state: radios('state', stateOptions, stateDefaultValue),
    radioButtonValues: array('radioButtonValues', [...radioValues]),
    onClick: (value: string) => action('radio button clicked')(value)
  }
});

const form = new FormGroup({
  radioInput: new FormControl('1'),
});

export const ReactiveForms = () => ({
  template:
    `
    <form [formGroup]="form" class="flex-form">
      <div fd-form-item *ngFor="let value of radioButtonValues">
        <fd-radio-button
            [state]="state"
            [value]="value"
            [name]="name"
            [selectedValue]="selectedValue()"
            [formControlName]="formControlName">
              Option {{ value }}
        </fd-radio-button>
      </div>
    </form>
  `,
  props: {
    form: form,
    formControlName: 'radioInput',
    name: 'radio-buttons',
    selectedValue: () => form.controls.radioInput.value,
    state: radios('state', stateOptions, stateDefaultValue),
    radioButtonValues: array('radioButtonValues', [...radioValues]),
  }
});
