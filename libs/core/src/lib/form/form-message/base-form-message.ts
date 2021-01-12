import { Directive, Input } from '@angular/core';
import { MessageStates } from '@fundamental-ngx/core';

@Directive()
export class BaseFormMessage {
    /** Type of the message. Can be 'success' | 'error' | 'warning' | 'information' */
    @Input()
    type: MessageStates;

    @Input()
    message: string;
}
