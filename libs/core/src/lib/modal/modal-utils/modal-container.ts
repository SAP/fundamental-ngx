import { Component, ViewEncapsulation } from '@angular/core';
import { modalFadeNgIf } from './modal-animations';

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
        '[@modal-fade]': '',
        '[class.fd-modal-container]': 'true'
    },
    animations: [
        modalFadeNgIf
    ],
    encapsulation: ViewEncapsulation.None
})
export class ModalContainer {}
