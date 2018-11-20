import { Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    modalRef;

    constructor(private modalService: NgbModal) {}

    close(): any {
        return this.modalRef.close();
    }

    dismiss(): any {
        return this.modalRef.dismiss();
    }

    open(modalType): any {
        this.modalRef = this.modalService.open(modalType);
        return this.modalRef;
    }
}
