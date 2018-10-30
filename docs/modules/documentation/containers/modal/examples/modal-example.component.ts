import { Component } from '@angular/core';
import { ModalService } from '../../../../../../projects/fundamental-ngx/src/lib/modal/modal.service';

@Component({
    selector: 'fd-modal-example',
    template: `<ng-template #informationalModal>
        <fd-modal>
            <fd-modal-header>
                Modal Header/Title
            </fd-modal-header>
            <fd-modal-body>
                Modal Body
            </fd-modal-body>
        </fd-modal>
    </ng-template>
    <button fd-button (click)="openInfoModal(informationalModal)">Launch Demo</button>`,
    providers: [ModalService]
})
export class ModalExampleComponent {
    openInfoModal(modalType) {
        this.modalService.open(modalType);
    }
    constructor(private modalService: ModalService) {}
}