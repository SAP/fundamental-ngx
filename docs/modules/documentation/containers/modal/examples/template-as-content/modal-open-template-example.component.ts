import { Component, TemplateRef } from '@angular/core';
import { ModalService } from '../../../../../../../library/src/lib/modal/modal-service/modal.service';

@Component({
    selector: 'fd-modal-open-template-example',
    templateUrl: './modal-open-template-example.component.html',
    styles: ['.action-button {margin-left: 12px;}']
})
export class ModalOpenTemplateExampleComponent {
    confirmationReason: string;

    constructor(private modalService: ModalService) {}

    openModal(modal: TemplateRef<any>): void {
        const modalRef = this.modalService.open(modal);

        modalRef.afterClosed.subscribe(result => {
            this.confirmationReason = 'Modal closed with result: ' + result;
        }, error => {
            this.confirmationReason = 'Modal dismissed with result: ' + error;
        });
    }
}
