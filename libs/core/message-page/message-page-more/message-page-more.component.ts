import { Directive, HostBinding } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-message-page-more',
    standalone: true
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class MessagePageMoreComponent {
    /** @hidden */
    @HostBinding('class.fd-message-page__more')
    fdMessagePageMoreClass = true;
}
