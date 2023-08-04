import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { alertContainerNgIf } from './alert-animations';
import { warnOnce } from '@fundamental-ngx/cdk/utils';

/**
 * @deprecated
 * Alert component is deprecated since version 0.16.0
 * Message Strip component should be used instead.
 */
@Component({
    selector: 'fd-alert-container',
    template: ``,
    styles: [
        `
            .fd-alert-container {
                position: fixed;
                display: flex;
                flex-direction: column;
                z-index: 5000;
                align-items: center;
                top: 0;
                right: 50%;
                left: 50%;
            }
        `
    ],
    host: {
        '[@alertContainerNgIf]': ''
    },
    animations: [alertContainerNgIf],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertContainerComponent {
    /** @hidden */
    @HostBinding('class.fd-alert-container')
    fdAlertContainerClass = true;

    /** @hidden */
    constructor() {
        warnOnce(
            'AlertContainerComponent is deprecated since version 0.16.0 and will be removed in future release. Message Strip component should be used instead.'
        );
    }
}
