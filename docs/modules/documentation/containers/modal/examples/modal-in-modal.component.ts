import { Component, Input, ViewChild } from '@angular/core';
import { ModalService } from '../../../../../../library/src/lib/modal/modal.service';
import { ModalInModalSecondComponent } from './modal-in-modal-second.component';
import { ModalComponent } from '../../../../../../library/src/lib/modal/modal.component';

@Component({
    selector: 'fd-modal-in-modal',
    template: `
        <fd-modal-header>
            hello buddy
        </fd-modal-header>
        <fd-modal-body>
            This is the first modal! Click the button to open the second modal.
            <button fd-button (click)="openModal()" style="margin-right: 10px">Open Second Modal</button>
        </fd-modal-body>
`
})
export class ModalInModalComponent {
    @ViewChild('modal') modal: ModalComponent;

    @Input() title: string;

    modalRef;

    constructor(public modalService: ModalService)  {}

    openModal() {
        this.modalRef = this.modalService.open(ModalInModalSecondComponent);
    }
}
