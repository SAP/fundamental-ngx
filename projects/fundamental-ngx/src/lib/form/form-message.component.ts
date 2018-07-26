import { Component, Input } from '@angular/core';

@Component({
    selector: 'fd-form-message',
    templateUrl: './form-message.component.html'
})
export class FormMessageComponent {
    @Input() type: string = '';
}
