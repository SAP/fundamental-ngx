import { Component } from '@angular/core';
import { DialogRef } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-modal-content',
    template: `
        <fd-dialog-header>
            <h1 fd-dialog-title>{{modalRef.data.title}}</h1>
            <button fd-dialog-close-btn (click)="modalRef.dismiss('x')"></button>
        </fd-dialog-header>
        <fd-dialog-body>
            <p>{{modalRef.data.firstParagraph}}</p>
            <p>{{modalRef.data.secondParagraph}}</p>
            <p>{{modalRef.data.thirdParagraph}}</p>
        </fd-dialog-body>
        <fd-dialog-footer>
            <button class="action-button" fd-button [fdType]="'transparent'" (click)="this.modalRef.dismiss('cancel')">
                Cancel
            </button>
            <button class="action-button"  fd-button [fdType]="'emphasized'" (click)="this.modalRef.close('success')">
                Buy
            </button>
        </fd-dialog-footer>
    `,
    styles: ['.action-button {margin-left: 12px}']
})
export class ModalContentComponent {

    constructor(public modalRef: DialogRef) {}
}
