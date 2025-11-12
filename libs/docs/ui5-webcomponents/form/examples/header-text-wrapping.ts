import { Component, signal } from '@angular/core';
import { Form } from '@fundamental-ngx/ui5-webcomponents/form';
import { FormItem } from '@fundamental-ngx/ui5-webcomponents/form-item';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';

@Component({
    selector: 'ui5-form-header-text-wrapping-sample',
    templateUrl: './header-text-wrapping.html',
    standalone: true,
    imports: [Form, FormItem, Text, Label]
})
export class FormHeaderTextWrappingSample {
    formItems = signal([
        { id: 'field1', label: 'Name:', value: 'Red Point Stores' },
        { id: 'field2', label: 'ZIP Code/City:', value: '411 Maintown' },
        { id: 'field3', label: 'Street:', value: 'Main St 1618' },
        { id: 'field4', label: 'Country:', value: 'Germany' }
    ]);
}
