import { Component, HostBinding, Optional } from '@angular/core';
import { ModalRef } from '../modal-utils/modal-ref';

@Component({
    selector: 'fd-modal-header',
    templateUrl: './modal-header.component.html',
    styles: [':host {display: block;}']
})
export class ModalHeaderComponent {
    @HostBinding('class.fd-modal__header') modalHeader = true;
}
