import { Directive, HostBinding } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-message-page-subtitle',
    standalone: true
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class MessagePageSubtitleComponent {
    /** @hidden */
    @HostBinding('class.fd-message-page__subtitle')
    fdMessagePageTitleClass = true;
}
