import { Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class ModalService {
  modalRef;

  constructor(private modalService: NgbModal) {}

  close() {
    this.modalRef.close();
  }

  open(modalType) {
    this.modalRef = this.modalService.open(modalType);
  }
}
