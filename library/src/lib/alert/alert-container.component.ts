import { Component } from '@angular/core';
import { alertContainerNgIf } from './alert-animations';

@Component({
    selector: 'fd-alert-container',
    template: ``,
    styles: [`
        :host {
            position: fixed;
            display: flex;
            flex-direction: column;
            z-index: 5000;
            align-items: center;
            top: 0;
            right: 50%;
            left: 50%;
        }
    `],
    host: {
        '[@alertContainerNgIf]': ''
    },
    animations: [
        alertContainerNgIf
    ]
})
export class AlertContainerComponent {}
