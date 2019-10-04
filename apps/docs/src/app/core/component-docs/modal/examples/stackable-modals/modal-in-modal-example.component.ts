import { Component } from '@angular/core';
import { ModalInModalComponent } from './modal-in-modal.component';
import { ModalService } from '@fundamental-ngx/core';

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
