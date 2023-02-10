import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogOverlayContainer extends OverlayContainer {
    /**
     * This method returns the overlay container element. It will lazily
     * create the element the first time it is called to facilitate using
     * the container in non-browser environments.
     * @returns the container element
     */
    getContainerElement(): HTMLElement {
        const containerElement = super.getContainerElement();

        containerElement.classList.add('fd-dialog-overlay-container');

        return containerElement;
    }
}
