import { Component } from '@angular/core';
import { ModalService } from '../../../../../../library/src/lib/modal/modal.service';

@Component({
    selector: 'fd-modal-confirmation-example',
    template: `
    <ng-template let-modal #confirmationModal>
        <fd-modal-header>
            Are you sure?
        </fd-modal-header>
        <fd-modal-body>
            This action is permanent and cannot be undone. Do you wish to continue?
        </fd-modal-body>
        <fd-modal-footer>
            <button fd-button (click)="modal.close('No')" [options]="'light'">No</button>
            <button fd-button (click)="modal.close('Yes')" [fdType]="'main'">Yes</button>
        </fd-modal-footer>
    </ng-template>
    <button fd-button (click)="openModal(confirmationModal)">Open from Template</button>
    <separator *ngIf="confirmationReason"></separator>
    <span>{{confirmationReason}}</span>`
})
export class ModalConfirmationExampleComponent {
    confirmationReason: string;

    constructor(private modalService: ModalService) {}

    openModal(modal): void {
        const modalRef = this.modalService.open(modal);

        modalRef.afterClosed.subscribe(result => {
            this.confirmationReason = 'Modal closed with result: ' + result;
        }, error => {
            this.confirmationReason = 'Modal dismissed with result: ' + error;
        });
    }
}
