import { Directive, HostBinding } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-message-page-actions',
    standalone: true
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class MessagePageActionsComponent {
    /** @hidden */
    @HostBinding('class.fd-message-page__actions')
    fdMessagePageActionsClass = true;
}
