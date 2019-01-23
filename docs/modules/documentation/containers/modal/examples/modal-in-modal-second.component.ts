import { Component, Input, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../../../library/src/lib/modal/modal.component';
import { ModalService } from '../../../../../../library/src/lib/modal/modal.service';

@Component({
    selector: 'fd-modal-in-modal-second',
    template: `<fd-modal #modal>
        <fd-modal-header>
            {{title}}
        </fd-modal-header>
        <fd-modal-body>
            This is the second modal! <br />
            It needs to be closed before the first modal is closed.
            <button fd-button (click)="modal.close()">Close</button>
        </fd-modal-body>
    </fd-modal>`
})
export class ModalInModalSecondComponent {

    @ViewChild('modal') modal: ModalComponent;

    @Input() title: string;

    constructor(public modalService: ModalService)  {}
}
