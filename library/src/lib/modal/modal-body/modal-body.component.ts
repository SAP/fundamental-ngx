import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'fd-modal-body',
    templateUrl: './modal-body.component.html',
    styles: [`
        :host {
            display: block;
            overflow: auto;
            flex-grow: 1;
        }
    `]
})
export class ModalBodyComponent {
    @HostBinding('class.fd-modal__body') modalBody = true;
}
