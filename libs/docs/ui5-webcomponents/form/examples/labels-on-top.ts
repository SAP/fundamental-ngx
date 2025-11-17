import { NgStyle } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Form } from '@fundamental-ngx/ui5-webcomponents/form';
import { FormItem } from '@fundamental-ngx/ui5-webcomponents/form-item';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Slider } from '@fundamental-ngx/ui5-webcomponents/slider';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';

@Component({
    selector: 'ui5-form-labels-on-top-sample',
    templateUrl: './labels-on-top.html',
    standalone: true,
    imports: [Form, FormItem, Slider, Text, Label, NgStyle]
})
export class FormLabelsOnTopSample {
    readonly sliderValue = signal(85);
    readonly containerWidth = signal('1250px');
    readonly pageSize = signal('L');

    formItems = signal([
        { id: 'address_field1', label: 'Name:', value: 'Red Point Stores' },
        { id: 'address_field2', label: 'ZIP Code/City:', value: '411 Maintown' },
        { id: 'address_field3', label: 'Street:', value: 'Main St 1618' },
        { id: 'address_field4', label: 'Country:', value: 'Germany' },
        { id: 'address_field5', label: 'WebSite:', value: 'sap.com' },
        { id: 'address_field6', label: 'Delivery Address:', value: 'Newtown' }
    ]);

    onSliderChange(event: CustomEvent): void {
        const width = (event.target?.['value'] / 100) * 1500;
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
