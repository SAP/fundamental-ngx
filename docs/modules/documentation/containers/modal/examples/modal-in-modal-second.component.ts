import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../../../library/src/lib/modal/modal.component';
import { ModalService } from '../../../../../../library/src/lib/modal/modal.service';

@Component({
    selector: 'fd-modal-in-modal-second',
    template: `
        <fd-modal-header>
            yooo
        </fd-modal-header>
        <fd-modal-body>
            This is the second modal! <br />
            It needs to be closed before the first modal is closed.
        </fd-modal-body>`
})
export class ModalInModalSecondComponent {

    @ViewChild('modal') modal: ModalComponent;


    constructor(public modalService: ModalService)  {}
}
