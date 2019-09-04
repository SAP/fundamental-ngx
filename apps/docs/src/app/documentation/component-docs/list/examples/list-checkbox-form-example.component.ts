import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'fd-list-checkbox-form-example',
    templateUrl: './list-checkbox-form-example.component.html'
})
export class ListCheckboxFormExampleComponent {
    customForm = new FormGroup({
        listItem1: new FormControl(false),
        listItem2: new FormControl(false),
        listItem3: new FormControl(false),
        listItem4: new FormControl(false)
    });
};
