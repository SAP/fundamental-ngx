import { NgStyle } from '@angular/common';
import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Form } from '@fundamental-ngx/ui5-webcomponents/form';
import { FormGroup } from '@fundamental-ngx/ui5-webcomponents/form-group';
import { FormItem } from '@fundamental-ngx/ui5-webcomponents/form-item';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Link } from '@fundamental-ngx/ui5-webcomponents/link';
import { Slider } from '@fundamental-ngx/ui5-webcomponents/slider';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';
import { FormItemSpacing } from '@fundamental-ngx/ui5-webcomponents/types';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';

@Component({
    selector: 'ui5-form-layouts-sample',
    templateUrl: './layouts.html',
    styles: `
        ui5-form::part(column) {
            background: var(--sapHoverColor);
        }
    `,
    standalone: true,
    imports: [Form, FormGroup, FormItem, Label, Slider, Text, Link, NgStyle]
})
export class FormLayoutsSample {
    readonly sliderValue = signal(85);
    readonly containerWidth = signal('1250px');
    readonly pageSize = signal('L');

    readonly selectedLayout = signal<string>('S1 M1 L2 XL3');
    readonly selectedLabelSpan = signal<string>('S12 M4 L4 XL4');
    readonly selectedItemSpacing = signal<FormItemSpacing>(FormItemSpacing.Normal);

    readonly formFields = signal([
        {
            formGroupTitle: 'Address',
            formGroupItems: [
                { id: 'address_field1', label: 'Name:', value: 'Red Point Stores' },
                { id: 'address_field2', label: 'ZIP Code/City:', value: '411 Maintown' },
                { id: 'address_field3', label: 'Street:', value: 'Main St 1618' },
                { id: 'address_field4', label: 'Country:', value: 'Germany' },
                { id: 'address_field5', label: 'WebSite:', value: 'sap.com' }
            ]
        },
        {
            formGroupTitle: 'Contact',
            formGroupItems: [
                { id: 'contact_field1', label: 'Twitter:', value: '@sap' },
                { id: 'contact_field2', label: 'Email:', value: 'john.smith@sap.com' },
                { id: 'contact_field3', label: 'Tel:', value: '+49 6227 747474' },
                { id: 'contact_field4', label: 'SMS:', value: '+49 6227 747474' },
                { id: 'contact_field5', label: 'Mobile:', value: '+49 6227 747474' },
                { id: 'contact_field6', label: 'Pager:', value: '+49 6227 747474' },
                { id: 'contact_field7', label: 'Fax:', value: '+49 6227 747474' }
            ]
        },
        {
            formGroupTitle: 'Other info',
            formGroupItems: [
                { id: 'other_field1', label: 'Name:', value: 'Red Point Stores' },
                { id: 'other_field2', label: 'ZIP Code/City:', value: '411 Maintown' },
                { id: 'other_field3', label: 'Street:', value: 'Main St 1618' },
                { id: 'other_field4', label: 'Country:', value: 'Germany' },
                { id: 'other_field5', label: 'WebSite:', value: 'sap.com' }
            ]
        }
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

    isLinkField(label: string): boolean {
        const linkFields = ['WebSite:', 'Email:', 'Tel:', 'SMS:', 'Mobile:', 'Pager:', 'Fax:'];
        return linkFields.includes(label);
    }

    getLinkHref(label: string, value: string): string {
        switch (label) {
            case 'WebSite:':
                return value.startsWith('http') ? value : `https://${value}`;
            case 'Email:':
                return `mailto:${value}`;
            case 'Tel:':
            case 'SMS:':
            case 'Mobile:':
            case 'Pager:':
            case 'Fax:':
                return `tel:${value}`;
            default:
                return value;
        }
    }
}
