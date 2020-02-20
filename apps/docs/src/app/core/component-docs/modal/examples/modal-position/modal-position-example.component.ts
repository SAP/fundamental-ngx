import { Component } from '@angular/core';
import { ModalService } from '@fundamental-ngx/core';

@Component({
  selector: 'fd-modal-position-example',
  templateUrl: './modal-position-example.component.html',
})
export class ModalPositionExampleComponent {

  constructor(public modalService: ModalService) { }

  openModal(template): void {
      this.modalService.open(template, {
          position: {bottom: '100px', right: '100px'}
      });
  }

}
