import { Component } from '@angular/core';
import { ModalInModalSecondComponent } from './modal-in-modal-second-example.component';
import { DialogRef, DialogService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-modal-in-modal-first',
    template: `
        <fd-dialog-header>
            <h1 fd-dialog-title>First Modal</h1>
            <button fd-dialog-close-btn (click)="modalRef.dismiss('x')"></button>
        </fd-dialog-header>
        <fd-dialog-body>
            This is the first modal! Click the button below to open the second modal.
        </fd-dialog-body>
        <fd-dialog-footer>
            <button fd-button (click)="openModal()" [fdType]="'emphasized'">Open Second Modal</button>
        </fd-dialog-footer>
`
})
export class ModalInModalFirstComponent {

    constructor(public modalService: DialogService, public modalRef: DialogRef) { }

    openModal() {
        this.modalService.open(ModalInModalSecondComponent, {
            width: '300px'
        });
    }
}
