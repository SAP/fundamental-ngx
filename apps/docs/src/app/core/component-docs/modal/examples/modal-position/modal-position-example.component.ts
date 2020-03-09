import { Component } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core';

@Component({
  selector: 'fd-modal-position-example',
  templateUrl: './modal-position-example.component.html',
})
export class ModalPositionExampleComponent {

  constructor(public modalService: DialogService) { }

  openModal(template): void {
      this.modalService.open(template, {
          position: {bottom: '100px', right: '100px'}
      });
  }

}
