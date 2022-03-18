import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'fdp-platform-color-palette-popover-reactive-form-example',
    templateUrl: './platform-color-palette-popover-reactive-form-example.component.html'
})
export class PlatformColorPalettePopoverReactiveFormExampleComponent {
    customForm: FormGroup = new FormGroup({
        colorPalette3: new FormControl('rgba(45, 98, 225, 1)')
    });

    @ViewChild('colorPalettePopoverReactive') popoverComponent: any;

    openPopover(event: PointerEvent): void {
        this.popoverComponent.showPopover(event.target);
    }
}
