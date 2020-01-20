import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

export type MessageStates = 'success' | 'error' | 'warning' | 'information'

/**
 * Form message. Intended to be displayed with a form control for validation purposes.
 */
@Component({
    selector: 'fd-form-message',
    templateUrl: './form-message.component.html',
    styleUrls: ['./form-message.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormMessageComponent {

    /** Type of the message. Can be 'success' | 'error' | 'warning' | 'information' */
    @Input()
    type: MessageStates;

    /** Whether to apply compact mode to the message. */
    @Input()
    compact: boolean = false;
}
