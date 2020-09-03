import { Component } from '@angular/core';

@Component({
    selector: 'fd-fixed-card-layout-disabled-drag',
    templateUrl: './fixed-card-layout-disabled-drag.component.html'
})
export class FixedCardLayoutDisabledDragExampleComponent {
    dragDisabled = false;

    constructor() {}

    public changeDragBehaviour(): void {
        this.dragDisabled = !this.dragDisabled;
    }
}
