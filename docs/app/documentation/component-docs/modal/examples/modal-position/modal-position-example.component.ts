import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../../../../library/src/lib/modal';

@Component({
  selector: 'fd-modal-position-example',
  templateUrl: './modal-position-example.component.html',
  styleUrls: ['./modal-position-example.component.scss']
})
export class ModalPositionExampleComponent implements OnInit {

  constructor(public modalService: ModalService) { }

  ngOnInit() {
  }

  openModal(template): void {
      this.modalService.open(template, {
          position: {bottom: '100px', right: '100px'}
      });
  }

}
