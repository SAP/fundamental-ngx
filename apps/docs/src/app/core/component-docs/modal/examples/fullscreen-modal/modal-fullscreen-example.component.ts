import { Component } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-modal-fullscreen-example',
    templateUrl: './modal-fullscreen-example.component.html'
})
export class ModalFullscreenExampleComponent {

    constructor(public modalService: DialogService)  {}

    openModal(modalTemplate) {
        this.modalService.open(modalTemplate, {
            width: '100vw',
            height: '100vh'
        });
    }
}
