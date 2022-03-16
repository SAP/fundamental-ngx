import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'fdp-platform-color-palette-popover-complex-example',
    templateUrl: './platform-color-palette-popover-complex-example.component.html'
})
export class PlatformColorPalettePopoverComplexExampleComponent {
    @ViewChild('colorPalettePopoverComplex') popoverComponent: any;

    openPopover(event: PointerEvent): void {
        this.popoverComponent.showPopover(event.target);
    }
}
