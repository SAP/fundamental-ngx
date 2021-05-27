import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-message-page-actions',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagePageActionsComponent {
    /** @hidden */
    @HostBinding('class.fd-message-page__actions')
    fdMessagePageActionsClass = true;
}
