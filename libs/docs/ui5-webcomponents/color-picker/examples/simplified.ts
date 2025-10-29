import { Component, signal } from '@angular/core';
import { ColorPicker } from '@fundamental-ngx/ui5-webcomponents/color-picker';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/paddings.css';

@Component({
    selector: 'ui5-color-picker-simplified-example',
    templateUrl: './simplified.html',
    standalone: true,
    imports: [ColorPicker, Label, Text]
})
export class ColorPickerSimplifiedExample {
    readonly selectedColor = signal('rgba(0, 128, 255, 1)');
    readonly isSimplified = signal(true);

    onColorChange(event: CustomEvent): void {
        const colorValue = (event.target as any)?.value || event.detail?.color;
        if (colorValue) {
            this.selectedColor.set(colorValue);
        }
    }
}
