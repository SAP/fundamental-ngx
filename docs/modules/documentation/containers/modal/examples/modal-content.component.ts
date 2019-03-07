import { Component, Input } from '@angular/core';
import { ModalService } from '../../../../../../library/src/lib/modal/modal.service';
import { ModalRef } from '../../../../../../library/src/lib/modal/modal-ref';

@Component({
    selector: 'fd-modal-content',
    template: `
        <fd-modal-header>
            {{modalRef.data.title}}
        </fd-modal-header>
        <fd-modal-body>
            oh hi :D
            <separator></separator>
            <button fd-button>button 1</button>
            <button fd-button>button 2</button>
            <button fd-button>button 3</button>
            <button fd-button (click)="modalRef.close()">Close Modal</button>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
        </fd-modal-body>
        <fd-modal-footer><button fd-button [options]="'emphasized'" (click)="this.modalRef.close()">Close Modal</button></fd-modal-footer>
    `
})
export class ModalContentComponent {

    @Input() description: string;

    @Input() title = 'Modal Content';

    constructor(public modalRef: ModalRef)  {}
}
