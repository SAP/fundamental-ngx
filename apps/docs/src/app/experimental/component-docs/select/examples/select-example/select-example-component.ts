import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'fd-select-example',
    templateUrl: './select-example.component.html'
})
export class SelectExampleComponent {
    options: string[] = ['Apple', 'Pineapple', 'Kiwi', 'Tomato', 'Strawberry'];

    customForm = new FormGroup({
        selectControl: new FormControl(this.options[0])
    });
}
