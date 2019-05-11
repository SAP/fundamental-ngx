import { Component } from '@angular/core';
import { ModalService } from '../../../../../../../library/src/lib/modal/modal-service/modal.service';

@Component({
    selector: 'fd-popover-modal-example',
    templateUrl: './popover-modal-example.component.html'
})
export class PopoverModalExampleComponent {

    constructor(public modalService: ModalService) {}

}
