import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { dialogFadeNgIf } from './dialog-animations.js';

@Component({
    selector: 'fd-modal-container',
    template: ``,
    styles: [`
        .fd-modal-container {
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
    `],
    host: {
        '[@dialog-fade]': '',
        '[class.fd-modal-container]': 'true'
    },
    animations: [
        dialogFadeNgIf
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogContainer {}
