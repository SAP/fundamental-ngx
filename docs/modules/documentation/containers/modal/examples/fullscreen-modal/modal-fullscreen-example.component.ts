import { Component } from '@angular/core';
import { ModalService } from '../../../../../../../library/src/lib/modal/modal-service/modal.service';

@Component({
    selector: 'fd-modal-fullscreen-example',
    templateUrl: './modal-fullscreen-example.component.html'
})
export class ModalFullscreenExampleComponent {

    constructor(public modalService: ModalService)  {}

    openModal(modalTemplate) {
        this.modalService.open(modalTemplate, {
            width: '100vw',
            height: '100vh'
        });
    }
}
