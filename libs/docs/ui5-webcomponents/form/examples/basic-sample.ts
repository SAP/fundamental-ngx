import { JsonPipe, NgStyle } from '@angular/common';
import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Form } from '@fundamental-ngx/ui5-webcomponents/form';
import { FormGroup } from '@fundamental-ngx/ui5-webcomponents/form-group';
import { FormItem } from '@fundamental-ngx/ui5-webcomponents/form-item';
import { Input } from '@fundamental-ngx/ui5-webcomponents/input';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Slider } from '@fundamental-ngx/ui5-webcomponents/slider';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';
import { TextArea } from '@fundamental-ngx/ui5-webcomponents/text-area';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/paddings.css';

@Component({
    selector: 'ui5-form-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [Form, FormGroup, FormItem, Slider, Text, Label, Input, TextArea, Button, JsonPipe, NgStyle]
})
export class FormBasicSample {
    readonly sliderValue = signal(85);
    readonly containerWidth = signal('1250px');
    readonly pageSize = signal('L');
    readonly formData = signal({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        notes: ''
    });

    onSubmit(): void {
        console.log('Form submitted:', this.formData());
    }

    onReset(): void {
        this.formData.set({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            notes: ''
        });
    }

    onSliderChange(event: UI5WrapperCustomEvent<Slider, 'ui5Change'>): void {
        const width = (event.currentTarget.value / 100) * 1500;
        this.containerWidth.set(`${width}px`);
        this.pageSize.set(this.getLayoutByWidth(width));
    }

    updateFormField(
        field: keyof ReturnType<typeof this.formData>,
        event: UI5WrapperCustomEvent<Input | TextArea, 'ui5Input'>
    ): void {
        this.formData.update((data) => ({
            ...data,
            [field]: event.currentTarget.value
        }));
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
