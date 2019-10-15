import { Component, TemplateRef } from '@angular/core';
import { ModalService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-modal-open-template-example',
    templateUrl: './modal-open-template-example.component.html',
    styleUrls: ['modal-open-template-example.component.scss']
})
export class ModalOpenTemplateExampleComponent {

    confirmationReason: string;

    constructor(private modalService: ModalService) { }

    openModal(modal: TemplateRef<any>): void {
        const modalRef = this.modalService.open(modal);

        modalRef.afterClosed.subscribe(result => {
            this.confirmationReason = 'Modal closed with result: ' + result;
        }, error => {
            this.confirmationReason = 'Modal dismissed with result: ' + error;
        });
    }
}
