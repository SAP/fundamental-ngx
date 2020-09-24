import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-fixed-card-layout-disabled-drag',
    templateUrl: './fixed-card-layout-disabled-drag.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixedCardLayoutDisabledDragExampleComponent {
    dragDisabled = false;

    public changeDragBehaviour(): void {
        this.dragDisabled = !this.dragDisabled;
    }
}
