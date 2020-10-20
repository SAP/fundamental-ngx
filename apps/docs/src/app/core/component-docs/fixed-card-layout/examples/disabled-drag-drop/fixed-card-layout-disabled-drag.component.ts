import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

@Component({
    selector: 'fd-fixed-card-layout-disabled-drag',
    templateUrl: './fixed-card-layout-disabled-drag.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixedCardLayoutDisabledDragExampleComponent {
    dragDisabled = false;

    constructor(private _changeDetectorRef: ChangeDetectorRef) {}

    public changeDragBehaviour(): void {
        this.dragDisabled = !this.dragDisabled;
    }

    public onResized(): void {
        this._changeDetectorRef.markForCheck();
    }
}
