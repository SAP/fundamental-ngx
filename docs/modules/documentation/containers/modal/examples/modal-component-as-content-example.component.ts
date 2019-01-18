import { Component } from '@angular/core';
import { ModalService } from '../../../../../../library/src/lib/modal/modal.service';
import { ModalContentComponent } from './modal-content.component';

@Component({
    selector: 'fd-modal-component-as-content-example',
    template: `
    <button fd-button (click)="openComponentAsContentModal()">Launch Component As Content Modal</button>`
})
export class ModalComponentAsContentExampleComponent {
    modalRef;

    openComponentAsContentModal() {
        this.modalRef = this.modalService.open(ModalContentComponent);
        this.modalRef.instance.title = 'Modal Title'
    }
    constructor(private modalService: ModalService) {}
}
