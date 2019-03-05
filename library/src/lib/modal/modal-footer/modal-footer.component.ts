import { Component } from '@angular/core';

@Component({
    selector: 'fd-modal-footer',
    templateUrl: './modal-footer.component.html',
    host: {
        class: 'fd-modal__footer'
    },
    styles: [`
        :host {
            display: block;
            border-top: 1px solid #eeeeef;
        }
    `]
})
export class ModalFooterComponent {}
