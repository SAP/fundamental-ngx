import { Component } from '@angular/core';
import { ModalService } from '../../../../../../../library/src/lib/modal/modal-service/modal.service';

@Component({
    selector: 'fd-backdrop-examples',
    templateUrl: './backdrop-examples.component.html',
    styleUrls: ['./backdrop-examples.component.scss']
})
export class BackdropExamplesComponent {

    constructor(private modalService: ModalService) {}

    openDisabledBackdrop(modal): void {
        this.modalService.open(modal, {
            hasBackdrop: false,
            data: 'This modal does not have a backdrop!',
            maxWidth: '400px'
        });
    }

    openCustomBackdrop(modal): void {
        this.modalService.open(modal, {
            backdropClass: 'modal-custom-overlay-example',
            backdropClickCloseable: false,
            maxWidth: '400px',
            data: 'This modal has a custom backdrop! Classes applied to the backdrop' +
                ' must be in your global styles file. You may also need to override some properties using !important.'
        });
    }
}
