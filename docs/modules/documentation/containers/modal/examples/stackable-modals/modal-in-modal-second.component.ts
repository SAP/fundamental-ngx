import { Component } from '@angular/core';
import { ModalRef } from '../../../../../../../library/src/lib/modal/modal-utils/modal-ref';

@Component({
    selector: 'fd-modal-in-modal-second',
    template: `
        <fd-modal-header>
            <h1 fd-modal-title>Second Modal</h1>
            <button fd-modal-close-btn (click)="modalRef.dismiss()"></button>
        </fd-modal-header>
        <fd-modal-body>
            <p>This is the second modal!</p>
            <p>It is completely independent from the first modal and can be controlled separately!</p>
        </fd-modal-body>
        <fd-modal-footer>
            <button fd-button (click)="modalRef.close()" [options]="'emphasized'">Close</button>
        </fd-modal-footer>
    `
})
export class ModalInModalSecondComponent {
    constructor(public modalRef: ModalRef) {}
}
