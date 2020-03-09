import { Component } from '@angular/core';
import { DialogRef } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-modal-in-modal-second',
    template: `
        <fd-dialog-header>
            <h1 fd-dialog-title>Second Modal</h1>
            <button fd-dialog-close-btn (click)="modalRef.dismiss()"></button>
        </fd-dialog-header>
        <fd-dialog-body>
            <p>This is the second modal!</p>
            <p>It is completely independent from the first modal and can be controlled separately!</p>
        </fd-dialog-body>
        <fd-dialog-footer>
            <button fd-button (click)="modalRef.close()" [fdType]="'emphasized'">Close</button>
        </fd-dialog-footer>
    `
})
export class ModalInModalSecondComponent {
    constructor(public modalRef: DialogRef) { }
}
