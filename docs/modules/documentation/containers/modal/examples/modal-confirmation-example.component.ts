import { Component } from '@angular/core';
import { ModalService } from '../../../../../../projects/fundamental-ngx/src/lib/modal/modal.service';

@Component({
    selector: 'fd-modal-confirmation-example',
    template: `<ng-template #confirmationModal let-c="close">
        <fd-modal>
            <fd-modal-header>
                Modal Header/Title
            </fd-modal-header>
            <fd-modal-body>
                Modal Body
            </fd-modal-body>
            <fd-modal-footer>
                <button fd-button (click)="c('No')" [fdType]="'secondary'">No</button>
                <button fd-button (click)="c('Yes')" [fdType]="'main'">Yes</button>
            </fd-modal-footer>
        </fd-modal>
    </ng-template>
    <button fd-button (click)="openConfirmationModal(confirmationModal)">Launch Demo</button>
    <separator *ngIf="confirmationReason"></separator>
    <span>{{confirmationReason}}</span>`,
    providers: [ModalService]
})
export class ModalConfirmationExampleComponent {
    confirmationReason: string;

    openConfirmationModal(modalType) {
        this.modalService.open(modalType).result.then(
            result => {
                if (result === 'Yes') {
                    this.confirmationReason = 'Modal closed with "Yes" button';
                } else if (result === 'No') {
                    this.confirmationReason = 'Modal closed with "No" button';
                }
            },
            () => {
                this.confirmationReason = 'Modal dismissed with the "X" button';
            }
        );
    }
    constructor(private modalService: ModalService) {}
}