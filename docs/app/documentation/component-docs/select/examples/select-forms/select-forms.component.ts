import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'fd-select-forms',
  templateUrl: './select-forms.component.html',
  styleUrls: ['./select-forms.component.scss']
})
export class SelectFormsComponent {

    customForm = new FormGroup({
        selectControl: new FormControl('pineapple', Validators.required)
    });

}
