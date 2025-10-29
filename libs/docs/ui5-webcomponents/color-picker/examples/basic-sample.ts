import { Component, signal } from '@angular/core';
import { ColorPicker } from '@fundamental-ngx/ui5-webcomponents/color-picker';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/paddings.css';

@Component({
    selector: 'ui5-color-picker-basic-example',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [ColorPicker, Label, Text]
})
export class ColorPickerBasicExample {
    readonly selectedColor = signal('rgba(255, 0, 0, 1)');

    onColorChange(event: CustomEvent): void {
        const colorValue = (event.target as any)?.value || event.detail?.color;
        if (colorValue) {
            this.selectedColor.set(colorValue);
        }
    }
}
