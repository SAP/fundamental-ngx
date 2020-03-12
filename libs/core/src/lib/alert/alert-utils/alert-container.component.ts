import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { alertContainerNgIf } from './alert-animations';

@Component({
    selector: 'fd-alert-container',
    template: ``,
    styles: [`
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
    `],
    host: {
        '[@alertContainerNgIf]': '',
        '[class.fd-alert-container]': 'true'
    },
    animations: [
        alertContainerNgIf
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertContainerComponent {
}
