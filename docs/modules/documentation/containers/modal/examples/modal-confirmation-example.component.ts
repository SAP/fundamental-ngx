import { Component } from '@angular/core';
import { ModalService } from '../../../../../../projects/fundamental-ngx/src/lib/modal/modal.service';

@Component({
    selector: 'fd-modal-confirmation-example',
    template: `<ng-template #confirmationModal>
        <fd-modal>
            <fd-modal-header>
                Modal Header/Title
            </fd-modal-header>
            <fd-modal-body>
                Modal Body
            </fd-modal-body>
            <fd-modal-footer>
                <button fd-button fd-modal-close="No" [fdType]="'secondary'">No</button>
                <button fd-button fd-modal-close="Yes" [fdType]="'main'">Yes</button>
            </fd-modal-footer>
        </fd-modal>
    </ng-template>
    <button fd-button (click)="openConfirmationModal(confirmationModal)">Launch Demo</button>
    <separator></separator>
    <span>{{confirmationReason}}</span>`,
    providers: [ModalService]
})
export class ModalConfirmationExampleComponent {
    confirmationReason: string;

    openConfirmationModal(modalType) {
        const modalRef = this.modalService.open(modalType);
        modalRef.afterClosed().subscribe(
            result => {
                console.log('confirmation closed ', result);
                if (result === 'Yes') {
                    this.confirmationReason = 'Modal closed with "Yes" button';
                } else if (result === 'No') {
                    this.confirmationReason = 'Modal closed with "No" button';
                } else if (result === 'X') {
                    this.confirmationReason = 'Modal dismissed with the "X" button';
                }
            }
        );
    }

    constructor(private modalService: ModalService) {}
}
