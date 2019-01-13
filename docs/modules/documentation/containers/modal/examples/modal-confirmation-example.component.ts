import { Component } from '@angular/core';
import { ModalService } from '../../../../../../library/src/lib/modal/modal.service';

@Component({
    selector: 'fd-modal-confirmation-example',
    template: `
    <fd-modal #confirmationModal>
        <fd-modal-header>
            Modal Header/Title
        </fd-modal-header>
        <fd-modal-body>
            Modal Body
        </fd-modal-body>
        <fd-modal-footer>
            <button fd-button (click)="confirmationModal.close('No')" [options]="'light'">No</button>
            <button fd-button (click)="confirmationModal.close('Yes')" [fdType]="'main'">Yes</button>
        </fd-modal-footer>
    </fd-modal>
    <button fd-button (click)="openConfirmationModal(confirmationModal)">Launch Demo</button>
    <separator *ngIf="confirmationReason"></separator>
    <span>{{confirmationReason}}</span>`
})
export class ModalConfirmationExampleComponent {
    confirmationReason: string;

    openConfirmationModal(modalType) {
        this.modalService.open(modalType).result.then((result) => {
            this.confirmationReason = 'Modal closed with: ' + result;
        }, (reason) => {
            this.confirmationReason = 'Modal dismissed with: ' + reason;
        });
    }

    constructor(private modalService: ModalService) {}
}
