import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-message-page-title',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class MessagePageTitleComponent {
    /** @ignore */
    @HostBinding('class.fd-message-page__title')
    fdMessagePageTitleClass = true;
}
