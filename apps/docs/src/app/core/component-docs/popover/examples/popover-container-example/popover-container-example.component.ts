import { Component, Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable()
export class CustomOverlayContainer extends OverlayContainer {

    public myCreateContainer(element: HTMLElement): void {
        const container = document.createElement('div');
        container.classList.add('custom-overlay-container-class');

        element.appendChild(container);
        this._containerElement = container;
    }

    /** Prevent creation of the HTML element, use custom method above */
    protected _createContainer(): void {
        return;
    }
}

@Component({
    selector: 'fd-popover-container-example',
    templateUrl: './popover-container-example.component.html',
    styleUrls: ['./popover-container-example.component.scss'],
    providers: [
        { provide: OverlayContainer, useClass: CustomOverlayContainer }
    ]
})
export class PopoverContainerExampleComponent {
    constructor(
        private _overlay: OverlayContainer
    ) {
        console.log(this._overlay);
    }
}
