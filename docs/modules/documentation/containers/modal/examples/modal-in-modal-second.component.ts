import { Component, Input, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../../../library/src/lib/modal/modal.component';

@Component({
    selector: 'fd-modal-in-modal-second',
    template: `<fd-modal #modal>
        <fd-modal-header>
            {{title}}
        </fd-modal-header>
        <fd-modal-body>
            This is the second modal!
            <button fd-button (click)="modal.close()">Close</button>
        </fd-modal-body>
    </fd-modal>`
})
export class ModalInModalSecondComponent {

    @ViewChild('modal') modal: ModalComponent;

    @Input() title: string;

    constructor()  {}
}
