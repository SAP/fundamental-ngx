import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Form } from '@fundamental-ngx/ui5-webcomponents/form';
import { FormItem } from '@fundamental-ngx/ui5-webcomponents/form-item';
import { Input as UI5Input } from '@fundamental-ngx/ui5-webcomponents/input';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Option } from '@fundamental-ngx/ui5-webcomponents/option';
import { Select } from '@fundamental-ngx/ui5-webcomponents/select';
import { Slider } from '@fundamental-ngx/ui5-webcomponents/slider';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';

@Component({
    selector: 'ui5-form-empty-span-sample',
    templateUrl: './empty-span.html',
    standalone: true,
    styles: `
        ui5-form-item::part(layout) {
            background: var(--sapHoverColor);
        }
        ui5-form-item::part(content) {
            background: var(--sapAvatar_1_Background);
        }
    `,
    imports: [Form, FormItem, Slider, Text, Label, Select, Option, UI5Input]
})
export class FormEmptySpanSample {
    readonly sliderValue = signal(85);
    readonly containerWidth = signal('1250px');
    readonly pageSize = signal('L');

    onSliderChange(event: UI5WrapperCustomEvent<Slider, 'ui5Change'>): void {
        const width = (event.currentTarget.value / 100) * 1500;
        this.containerWidth.set(`${width}px`);
        this.pageSize.set(this.getLayoutByWidth(width));
    }

    private getLayoutByWidth(width: number): string {
        if (width > 599 && width <= 1023) {
            return 'M';
        } else if (width >= 1024 && width <= 1439) {
            return 'L';
        } else if (width >= 1440) {
            return 'XL';
        }
        return 'S';
    }
}
