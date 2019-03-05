import { Component } from '@angular/core';

@Component({
    selector: 'fd-modal-body',
    templateUrl: './modal-body.component.html',
    host: {
        class: 'fd-modal__body'
    },
    styles: [`
        :host {
            display: block;
            overflow: auto;
        }
    `]
})
export class ModalBodyComponent {}
