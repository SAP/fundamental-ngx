import { Directive, HostBinding } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-message-page-title',
    standalone: true
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class MessagePageTitleComponent {
    /** @hidden */
    @HostBinding('class.fd-message-page__title')
    fdMessagePageTitleClass = true;
}
