import { Component, ViewEncapsulation } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
    selector: 'fd-modal, [fd-modal]',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['modal.component.scss'],
    templateUrl: './modal.component.html'
})
export class ModalComponent {
    // TODO: add directive for adding config in HTML and give it to modalService on open
    constructor(private modalService: ModalService) { }

    open(): any {
        return this.modalService.open(ModalComponent);
    }
}
