import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'fdp-platform-color-picker-reactive-form-example',
    templateUrl: './platform-color-picker-reactive-form-example.component.html'
})
export class PlatformColorPickerReactiveFormExampleComponent {
    customForm: FormGroup = new FormGroup({
        colorPicker2: new FormControl('rgba(45, 98, 225, 1)')
    });
}
