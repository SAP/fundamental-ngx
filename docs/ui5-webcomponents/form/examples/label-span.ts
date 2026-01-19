import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Form } from '@fundamental-ngx/ui5-webcomponents/form';
import { FormItem } from '@fundamental-ngx/ui5-webcomponents/form-item';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Slider } from '@fundamental-ngx/ui5-webcomponents/slider';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';

@Component({
    selector: 'ui5-form-label-span-sample',
    templateUrl: './label-span.html',
    standalone: true,
    imports: [Form, FormItem, Slider, Text, Label]
})
export class FormLabelSpanSample {
    readonly sliderValue = signal(85);
    readonly containerWidth = signal('1250px');
    readonly pageSize = signal('L');

    formItems = signal([
        { id: 'field1', label: 'Name:', value: 'Red Point Stores' },
        { id: 'field2', label: 'ZIP Code/City:', value: '411 Maintown' },
        { id: 'field3', label: 'Street:', value: 'Main St 1618' },
        { id: 'field4', label: 'Country:', value: 'Germany' }
    ]);

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
