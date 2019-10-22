import { Component } from '@angular/core';
import { ModalInModalFirstComponent } from './modal-in-modal-first-example.component';
import { ModalService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-modal-in-modal-stacked-example',
    template: `
        <button fd-button (click)="openModal()">Open First Modal</button>
    `,
})
export class ModalInModalComponent {

    constructor(private modalService: ModalService) { }

    openModal(): void {
        this.modalService.open(ModalInModalFirstComponent);
    }
}
