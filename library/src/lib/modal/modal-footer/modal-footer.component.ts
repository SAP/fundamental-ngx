import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'fd-modal-footer',
    templateUrl: './modal-footer.component.html',
    styles: [`
        :host {
            display: block;
            border-top: 1px solid #eeeeef;
        }
    `]
})
export class ModalFooterComponent {
    @HostBinding('class.fd-modal__footer') modalFooter = true;
}
