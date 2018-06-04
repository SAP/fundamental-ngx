import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { NgModule } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from './modal.service';

@Component({
    selector: 'fd-modal',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['modal.component.scss'],
    templateUrl: './modal.component.html'
})
export class ModalComponent {
    constructor(@Inject(NgbModal) private modalService: NgbModal) {}

    open() {
        this.modalService.open(ModalComponent);
    }
}
