import { Component } from '@angular/core';

@Component({
    selector: 'fd-modal-container',
    template: ``,
    styles: [`
        :host {
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    `]
})
export class ModalContainerComponent {}
