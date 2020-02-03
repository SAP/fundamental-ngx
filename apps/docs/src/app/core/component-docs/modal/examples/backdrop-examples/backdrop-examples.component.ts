import { Component } from '@angular/core';
import { ModalService } from '@fundamental-ngx/core';

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
            backdropClickCloseable: false,      // <-- False by default if no backdrop is added
            data: 'This modal does not have a backdrop!',
            maxWidth: '400px',
            modalPanelClass: 'modal-no-backdrop-custom-shadow'
        });
    }

    openCustomBackdrop(modal): void {
        this.modalService.open(modal, {
            backdropClass: 'modal-custom-overlay-example',
            backdropClickCloseable: false,
            maxWidth: '400px',
            data: 'This modal has a custom backdrop! Classes applied to the backdrop' +
                ' do not have to be in your global styles file.'
        });
    }

    openModifiedContainer(modal): void {
        this.modalService.open(modal, {
            maxWidth: '400px',
            backdropClickCloseable: false,
            data: 'This modal has modified container! ' +
                'It sets z-index to 0, which keeps side-navigation enabled, when modal is opened',
            containerClass: 'custom-container-class'
        });
    }
}
