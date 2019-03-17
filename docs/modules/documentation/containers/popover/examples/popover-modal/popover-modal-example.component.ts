import { Component } from '@angular/core';
import { ModalService } from '../../../../../../../library/src/lib/modal/modal-service/modal.service';
import { PopperOptions } from 'popper.js';

@Component({
    selector: 'fd-popover-modal-example',
    templateUrl: './popover-modal-example.component.html'
})
export class PopoverModalExampleComponent {

    options: PopperOptions = {
        modifiers: {
            preventOverflow: {
                boundariesElement: 'window'
            }
        }
    };

    constructor(public modalService: ModalService) {}

}
