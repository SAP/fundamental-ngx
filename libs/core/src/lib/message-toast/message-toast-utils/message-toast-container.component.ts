import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-message-toast-container',
    template: ``,
    styles: [
        `
            .fd-message-toast-container {
                position: fixed;
                display: flex;
                flex-direction: column;
                z-index: 5000;
                align-items: center;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
            }
        `
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageToastContainerComponent {
    /** @hidden */
    @HostBinding('class.fd-message-toast-container')
    fdMessageToastContainerClass = true;
}
