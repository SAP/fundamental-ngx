import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'fd-select-form-group',
    templateUrl: './select-native-form-group-example.component.html',
    styleUrls: ['select-native-form-group-example.component.scss']
})
export class SelectNativeFormGroupExampleComponent {
    customForm = new FormGroup({
        selectControl: new FormControl('', Validators.required)
    });
}
