import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'fdp-platform-color-palette-popover-simple-example',
    templateUrl: './platform-color-palette-popover-simple-example.component.html'
})
export class PlatformColorPalettePopoverSimpleExampleComponent {
    @ViewChild('colorPalettePopover') popoverComponent: any;

    openPopover(event: PointerEvent): void {
        this.popoverComponent.showPopover(event.target);
    }
}
