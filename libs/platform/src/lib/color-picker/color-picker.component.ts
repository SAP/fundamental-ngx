import { Component, ViewEncapsulation } from '@angular/core';
import { BaseColorInput } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'fdp-color-picker',
    templateUrl: './color-picker.component.html',
    encapsulation: ViewEncapsulation.ShadowDom
})
export class ColorPickerComponent extends BaseColorInput {
    /** @hidden */
    colorChange(event: any): void {
        this.value = event.target.valueOf().color;
    }
}
