import { Component } from '@angular/core';
import { ModalService } from '../../../../../../../library/src/lib/modal/modal-service/modal.service';
import { ModalInModalComponent } from './modal-in-modal.component';

@Component({
    selector: 'fd-modal-in-modal-example',
    template: `
        <button fd-button (click)="openModal()">Open First Modal</button>
    `,
})
export class ModalInModalExampleComponent {

    constructor(private modalService: ModalService) {}

    openModal(): void {
        this.modalService.open(ModalInModalComponent);
    }
}
