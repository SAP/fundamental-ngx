import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
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

    onColorChange(event: UI5WrapperCustomEvent<ColorPicker, 'ui5Change'>): void {
        const colorValue = event.target?.['value'];
        if (colorValue) {
            this.selectedColor.set(colorValue);
        }
    }
}
