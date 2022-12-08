import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'fd-select-forms-example',
    templateUrl: './select-forms-example.component.html'
})
export class SelectFormsExampleComponent {
    options: string[] = ['Apple', 'Pineapple', 'Kiwi', 'Tomato', 'Strawberry'];

    customForm = new FormGroup({
        selectControl1: new FormControl(this.options[1])
    });
}
