import { Component } from '@angular/core';
import { ModalService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-container',
    templateUrl: './container.component.html',
    styles: ['.modal-container-div {position: relative;width: 100%;height: 400px;}']
})
export class ContainerComponent {

    constructor(private modalService: ModalService) { }

    openModal(modal, element): void {
        this.modalService.open(modal, {
            container: element as HTMLElement,
            maxWidth: '400px'
        });
    }


}
