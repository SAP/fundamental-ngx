import { Component } from '@angular/core';
import { ModalService } from '../../../../../../library/src/lib/modal/modal.service';
import { ModalInModalComponent } from './modal-in-modal.component';

@Component({
    selector: 'fd-modal-in-modal-example',
    template: `
    <button fd-button (click)="openComponentAsContentModal()">Launch First Modal</button>`,
    providers: [ModalService]
})
export class ModalInModalExampleComponent {
    modalRef;

    openComponentAsContentModal() {
        this.modalRef = this.modalService.open(ModalInModalComponent);
        this.modalRef.instance.title = 'First Modal'
    }
    constructor(private modalService: ModalService) {}
}
