import { Component } from '@angular/core';

@Component({
    selector: 'fdp-platform-color-palette-popover-simple-example',
    templateUrl: './platform-color-palette-popover-simple-example.component.html',
    styleUrls: ['./platform-color-palette-popover-simple-example.component.scss']
})
export class PlatformColorPalettePopoverExamplesComponent {
    colorChanged(event): any {
        console.log(event);
    }
}
