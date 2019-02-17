import { Component } from '@angular/core';
import { ModalService } from '../../../../../../library/src/lib/modal/modal.service';

@Component({
    selector: 'fd-modal-fullscreen',
    template: `<fd-modal #modal [width]="'100vw'" [height]="'100vh'">
        <fd-modal-header>
            Full Screen Modal
        </fd-modal-header>
        <fd-modal-body>
            Using the units 'vw' and 'vh' can allow a full screen modal!
        </fd-modal-body>
    </fd-modal>
    <button fd-button (click)="openInfoModal(modal)">Open Modal</button>
    `
})
export class ModalFullscreenExampleComponent {

    constructor(public modalService: ModalService)  {}

    openInfoModal(modalType) {
        this.modalService.open(modalType);
    }
}
