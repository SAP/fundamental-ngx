import { Component, Input, ViewChild } from '@angular/core';
import { ModalService } from '../../../../../../library/src/lib/modal/modal.service';
import { ModalComponent } from '../../../../../../library/src/lib/modal/modal.component';

@Component({
    selector: 'fd-modal-content',
    template: `<fd-modal #modal>
        <fd-modal-header>
            {{title}}
        </fd-modal-header>
        <fd-modal-body>
            {{description}}
        </fd-modal-body>
    </fd-modal>`
})
export class ModalContentComponent {
    @ViewChild('modal') modal: ModalComponent;

    @Input() description: string;

    constructor(public modalService: ModalService)  {}
}
