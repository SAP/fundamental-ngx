import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-message-page-title',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagePageTitleComponent {
    /** @hidden */
    @HostBinding('class.fd-message-page__title')
    fdMessagePageTitleClass = true;
}
