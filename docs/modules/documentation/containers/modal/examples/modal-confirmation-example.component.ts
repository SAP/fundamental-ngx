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
            <button fd-button (click)="closeConfirmationModal('No')" [options]="'light'">No</button>
            <button fd-button (click)="closeConfirmationModal('Yes')" [fdType]="'main'">Yes</button>
        </fd-modal-footer>
    </fd-modal>
    <button fd-button (click)="openConfirmationModal(confirmationModal)">Launch Demo</button>
    <separator *ngIf="confirmationReason"></separator>
    <span>{{confirmationReason}}</span>`,
    providers: [ModalService]
})
export class ModalConfirmationExampleComponent {
    confirmationReason: string;

    closeConfirmationModal(reason) {
        this.modalService.close();
        if (reason === 'Yes') {
            this.confirmationReason = 'Modal closed with "Yes" button';
        } else if (reason === 'No') {
            this.confirmationReason = 'Modal closed with "No" button';
        }
    }

    openConfirmationModal(modalType) {
        this.modalService.open(modalType);
    }

    constructor(private modalService: ModalService) {}
}
