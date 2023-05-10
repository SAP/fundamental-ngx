import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';

/**
 * Custom overlay container for CDK Overlay.
 */
@Injectable()
export class BaseToastOverlayContainer extends OverlayContainer {
    /**
     * This method returns the overlay container element. It will lazily
     * create the element the first time it is called to facilitate using
     * the container in non-browser environments.
     * @returns the container element
     */
    override getContainerElement(): HTMLElement {
        const containerElement = super.getContainerElement();

        containerElement.classList.add('fn-toast-overlay-container');

        return containerElement;
    }
}
