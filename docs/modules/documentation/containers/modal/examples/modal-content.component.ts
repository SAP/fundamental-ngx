import { Component, ViewChild } from '@angular/core';
import { ModalService } from '../../../../../../library/src/lib/modal/modal.service';
import { ModalComponent } from '../../../../../../library/src/lib/modal/modal.component';

@Component({
    selector: 'fd-modal-content',
    template: `<fd-modal #modal>
        <fd-modal-header>
            Modal Component
        </fd-modal-header>
        <fd-modal-body>
            This modal was opened by passing the component to the modal open function.
        </fd-modal-body>
    </fd-modal>`
})
export class ModalContentComponent {
    @ViewChild('modal') modal: ModalComponent;

    constructor(public modalService: ModalService)  {}
}
