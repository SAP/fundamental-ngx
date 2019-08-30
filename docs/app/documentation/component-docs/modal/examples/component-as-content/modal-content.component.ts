import { Component } from '@angular/core';
import { DynamicComponentRef } from '../../../../../../../library/src/lib/utils/dynamic-component/dynamic-component-ref';

@Component({
    selector: 'fd-modal-content',
    template: `
        <fd-modal-header>
            <h1 fd-modal-title>{{popupRef.data.title}}</h1>
            <button fd-modal-close-btn (click)="popupRef.dismiss('x')"></button>
        </fd-modal-header>
        <fd-modal-body style="max-height: 100px;">
            <p>{{popupRef.data.firstParagraph}}</p>
            <p>{{popupRef.data.secondParagraph}}</p>
            <p>{{popupRef.data.thirdParagraph}}</p>
        </fd-modal-body>
        <fd-modal-footer>
            <button class="action-button" fd-button [fdType]="'light'" (click)="popupRef.dismiss('cancel')">
                Cancel
            </button>
            <button class="action-button"  fd-button [options]="'emphasized'" (click)="popupRef.close('success')">
                Buy
            </button>
        </fd-modal-footer>
    `,
    styles: ['.action-button {margin-left: 12px}']
})
export class ModalContentComponent {

    constructor(public popupRef: DynamicComponentRef)  {}
}
