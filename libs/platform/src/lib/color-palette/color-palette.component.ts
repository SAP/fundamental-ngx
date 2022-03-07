import { Component, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'fdp-color-palette',
    templateUrl: './color-palette.component.html'
})
export class ColorPaletteComponent extends BaseComponent {
    constructor(_cd: ChangeDetectorRef) {
        super(_cd);
    }
}
