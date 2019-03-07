import { Component } from '@angular/core';
import { ModalRef } from '../modal-ref';

@Component({
    selector: 'fd-modal-header',
    templateUrl: './modal-header.component.html',
    host: {
        class: 'fd-modal__header'
    },
    styles: [':host {display: block;}']
})
export class ModalHeaderComponent {
    constructor(private modalRef: ModalRef) {}

    dismiss(): void {
        this.modalRef.dismiss('x');
    }
}
