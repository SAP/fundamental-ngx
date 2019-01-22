import { Component } from '@angular/core';
import { ModalService } from '../../../../../../library/src/lib/modal/modal.service';
import { ModalInModalComponent } from './modal-in-modal.component';

@Component({
    selector: 'fd-modal-in-modal-example',
    template: `
    <button fd-button (click)="openModal()">Launch First Modal</button>`,
})
export class ModalInModalExampleComponent {
    modalRef;

    constructor(private modalService: ModalService) {}

    openModal() {
        this.modalRef = this.modalService.open(ModalInModalComponent);
        this.modalRef.instance.title = 'First Modal';
    }
}
