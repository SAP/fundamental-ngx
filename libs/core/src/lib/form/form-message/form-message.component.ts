import { Component, Input, ViewEncapsulation } from '@angular/core';

/**
 * Form message. Intended to be displayed under a form control for validation purposes.
 */
@Component({
    selector: 'fd-form-message',
    templateUrl: './form-message.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FormMessageComponent {

    /** Type of the message. Can be `text`, `help`, `error` and `warning`. */
    @Input()
    type: string = '';
}
