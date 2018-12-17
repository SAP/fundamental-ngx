import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private modalRef: any;

    close() {
        this.modalRef.close();
    }

    dismiss() {
        this.modalRef.dismiss();
    }

    open(modalType) {
        this.modalRef = modalType;
        modalType.open();
    }
}
