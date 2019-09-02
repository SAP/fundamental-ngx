import { Component } from '@angular/core';
import { ModalService } from '../../../../../../../library/src/lib/modal/modal-service/modal.service';
import { ModalInModalSecondComponent } from './modal-in-modal-second.component';
import { ModalRef } from '../../../../../../../library/src/lib/modal/modal-utils/modal-ref';

@Component({
    selector: 'fd-modal-in-modal',
    template: `
        <fd-modal-header>
            <h1 fd-modal-title>First Modal</h1>
            <button fd-modal-close-btn (click)="modalRef.dismiss('x')"></button>
        </fd-modal-header>
        <fd-modal-body>
            This is the first modal! Click the button below to open the second modal.
        </fd-modal-body>
        <fd-modal-footer>
            <button fd-button (click)="openModal()" [options]="'emphasized'">Open Second Modal</button>
        </fd-modal-footer>
`
})
export class ModalInModalComponent {

    constructor(public modalService: ModalService, public modalRef: ModalRef)  {}

    openModal() {
        this.modalService.open(ModalInModalSecondComponent, {
            width: '300px'
        });
    }
}
