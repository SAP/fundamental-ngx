import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-message-page-subtitle',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagePageSubtitleComponent {
    /** @hidden */
    @HostBinding('class.fd-message-page__subtitle')
    fdMessagePageTitleClass = true;
}
