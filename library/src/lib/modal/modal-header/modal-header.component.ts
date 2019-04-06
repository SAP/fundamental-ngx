import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'fd-modal-header',
    templateUrl: './modal-header.component.html',
    styles: [':host {display: block;}']
})
export class ModalHeaderComponent {
    @HostBinding('class.fd-modal__header') modalHeader = true;
}
