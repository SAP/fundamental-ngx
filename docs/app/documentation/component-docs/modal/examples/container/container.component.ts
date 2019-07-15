import { Component } from '@angular/core';
import { ModalService } from '../../../../../../../library/src/lib/modal/modal-service/modal.service';

@Component({
    selector: 'fd-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.scss']
})
export class ContainerComponent {

    constructor(private modalService: ModalService) {}

    openModal(modal, element): void {
        this.modalService.open(modal, {
            container: element as HTMLElement,
            maxWidth: '400px'
        });
    }


}
