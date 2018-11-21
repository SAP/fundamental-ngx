import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'fd-modal',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['modal.component.scss'],
    templateUrl: './modal.component.html'
})
export class ModalComponent {
    constructor(@Inject(NgbModal) private modalService: NgbModal) {}

    open(): any {
        return this.modalService.open(ModalComponent);
    }
}
