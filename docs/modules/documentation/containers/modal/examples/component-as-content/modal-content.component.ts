import { Component, Input } from '@angular/core';
import { ModalService } from '../../../../../../../library/src/lib/modal/modal-service/modal.service';
import { ModalRef } from '../../../../../../../library/src/lib/modal/modal-utils/modal-ref';

@Component({
    selector: 'fd-modal-content',
    template: `
        <fd-modal-header>
            <h1 fd-modal-title>{{modalRef.data.title}}</h1>
            <button fd-modal-close-btn (click)="modalRef.dismiss('x')"></button>
        </fd-modal-header>
        <fd-modal-body style="max-height: 100px;">
            <p>{{modalRef.data.firstParagraph}}</p>
            <p>{{modalRef.data.secondParagraph}}</p>
            <p>{{modalRef.data.thirdParagraph}}</p>
        </fd-modal-body>
        <fd-modal-footer>
            <button class="action-button" fd-button [fdType]="'light'" (click)="this.modalRef.dismiss('cancel')">
                Cancel
            </button>
            <button class="action-button"  fd-button [options]="'emphasized'" (click)="this.modalRef.close('success')">
                Buy
            </button>
        </fd-modal-footer>
    `,
    styles: ['.action-button {margin-left: 12px}']
})
export class ModalContentComponent {

    constructor(public modalRef: ModalRef)  {}
}
