import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Icon } from '@fundamental-ngx/ui5-webcomponents/icon';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Option } from '@fundamental-ngx/ui5-webcomponents/option';
import { Select } from '@fundamental-ngx/ui5-webcomponents/select';
import { Slider } from '@fundamental-ngx/ui5-webcomponents/slider';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/paddings.css';

// Import the icon used in this example
import '@ui5/webcomponents-icons/dist/home.js';

@Component({
    selector: 'ui5-icon-customization-example',
    templateUrl: './customization.html',
    standalone: true,
    imports: [Icon, Label, Slider, Select, Option]
})
export class IconCustomizationExample {
    readonly selectedIcon = signal('home');
    readonly iconSize = signal(5);
    readonly selectedColor = signal('default');

    readonly colorOptions = signal([
        { value: 'default', label: 'Default', css: '' },
        { value: 'primary', label: 'Primary Blue', css: 'var(--sapButton_Emphasized_Background)' },
        { value: 'success', label: 'Success Green', css: 'var(--sapPositiveColor)' },
        { value: 'warning', label: 'Warning Orange', css: 'var(--sapCriticalColor)' },
        { value: 'error', label: 'Error Red', css: 'var(--sapNegativeColor)' },
        { value: 'info', label: 'Information Blue', css: 'var(--sapInformationColor)' },
        { value: 'neutral', label: 'Neutral Gray', css: 'var(--sapNeutralColor)' }
    ]);

    onSizeChange(event: UI5WrapperCustomEvent<Slider, 'ui5Change'>): void {
        const value = event.target?.['value'];
        this.iconSize.set(Number(value));
    }

    onColorChange(event: UI5WrapperCustomEvent<Select, 'ui5Change'>): void {
        const selectedValue = event.detail.selectedOption.value;
        if (selectedValue) {
            this.selectedColor.set(selectedValue);
        }
    }

    getIconStyle(): string {
        const colorOption = this.colorOptions().find((c) => c.value === this.selectedColor());
        const baseStyle = `height: ${this.iconSize()}rem; width: ${this.iconSize()}rem; `;
        return colorOption?.css ? `${baseStyle} color: ${colorOption.css};` : baseStyle;
    }
}
