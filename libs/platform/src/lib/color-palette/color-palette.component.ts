import { Component, ViewEncapsulation } from '@angular/core';
import { BaseColorInput } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'fdp-color-palette',
    templateUrl: './color-palette.component.html',
    encapsulation: ViewEncapsulation.ShadowDom
})
export class ColorPaletteComponent extends BaseColorInput {}
