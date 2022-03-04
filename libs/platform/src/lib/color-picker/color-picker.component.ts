import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { BaseComponent } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'fdp-color-picker',
    templateUrl: './color-picker.component.html'
})
export class ColorPickerComponent extends BaseComponent {
    @Input()
    color: string;

    constructor(_cd: ChangeDetectorRef) {
        super(_cd);
    }
}
