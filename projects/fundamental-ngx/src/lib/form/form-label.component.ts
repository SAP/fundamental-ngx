import { Component, Input } from '@angular/core';

@Component({
    selector: 'fd-form-label',
    templateUrl: './form-label.component.html'
})
export class FormLabelComponent {
    @Input() isRequired: boolean = false;
    @Input() forValue: string = '';
}
