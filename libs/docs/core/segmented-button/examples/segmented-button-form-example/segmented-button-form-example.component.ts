import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'fd-segmented-button-form-example',
    templateUrl: './segmented-button-form-example.component.html'
})
export class SegmentedButtonFormExampleComponent {
    customForm = new FormGroup({
        basic: new FormControl('first'),
        disabled: new FormControl({
            value: 'first',
            disabled: true
        })
    });
}
