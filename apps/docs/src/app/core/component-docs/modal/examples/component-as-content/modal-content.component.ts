import { Component } from '@angular/core';
import { ModalRef } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-modal-content',
    template: `
        <fd-modal-header>
            <h1 fd-modal-title>{{modalRef.data.title}}</h1>
            <button fd-modal-close-btn (click)="modalRef.dismiss('x')"></button>
        </fd-modal-header>
        <fd-modal-body>
            <p>{{modalRef.data.firstParagraph}}</p>
            <p>{{modalRef.data.secondParagraph}}</p>
            <p>{{modalRef.data.thirdParagraph}}</p>
        </fd-modal-body>
        <fd-modal-footer>
            <button class="action-button" fd-button [fdType]="'transparent'" (click)="this.modalRef.dismiss('cancel')">
                Cancel
            </button>
            <button class="action-button"  fd-button [fdType]="'emphasized'" (click)="this.modalRef.close('success')">
                Buy
            </button>
        </fd-modal-footer>
    `,
    styles: ['.action-button {margin-left: 12px}']
})
export class ModalContentComponent {

    constructor(public modalRef: ModalRef) { }
}
