import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-message-page-more',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class MessagePageMoreComponent {
    /** @hidden */
    @HostBinding('class.fd-message-page__more')
    fdMessagePageMoreClass = true;
}
