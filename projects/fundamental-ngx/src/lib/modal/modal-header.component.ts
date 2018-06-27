import { Component, Inject } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
    selector: 'fd-modal-header',
    templateUrl: './modal-header.component.html'
})
export class ModalHeaderComponent {
    constructor(@Inject(ModalService) public modalService: ModalService) {}
}
