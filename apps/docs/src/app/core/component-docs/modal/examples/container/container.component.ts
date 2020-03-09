import { Component } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-container',
    templateUrl: './container.component.html',
    styleUrls: ['container.component.scss']
})
export class ContainerComponent {

    constructor(private modalService: DialogService) { }

    openModal(modal, element): void {
        this.modalService.open(modal, {
            container: element as HTMLElement,
            maxWidth: '400px'
        });
    }


}
