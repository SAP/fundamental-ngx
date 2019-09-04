import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'fd-time-form-example',
    styles: [`
        .flex-form{
            display: flex;
            justify-content: space-between;
        }
    `],
    templateUrl: './time-form-example.component.html'
})
export class TimeFormExampleComponent {
    customForm = new FormGroup({
        time: new FormControl(''),
        disabledTime: new FormControl({ value: '', disabled: true })
    });
};
