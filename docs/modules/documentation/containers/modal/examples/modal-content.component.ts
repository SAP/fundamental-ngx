import { Component, Input } from '@angular/core';
import { ModalService } from '../../../../../../library/src/lib/modal/modal.service';
import { ModalRef } from '../../../../../../library/src/lib/modal/modal-ref';

@Component({
    selector: 'fd-modal-content',
    template: `
        <fd-modal-header>
            {{modalRef.data.title}}
        </fd-modal-header>
        <fd-modal-body>
            <p>{{modalRef.data.firstParagraph}}</p>
            <p>{{modalRef.data.secondParagraph}}</p>
            <p>{{modalRef.data.thirdParagraph}}</p>
        </fd-modal-body>
        <fd-modal-footer>
            <button fd-button (click)="this.modalRef.dismiss('cancel')">
                Cancel
            </button>
            <button fd-button [options]="'emphasized'" (click)="this.modalRef.close('success')">
                Close Modal
            </button>
        </fd-modal-footer>
    `
})
export class ModalContentComponent {

    constructor(public modalRef: ModalRef)  {}
}
