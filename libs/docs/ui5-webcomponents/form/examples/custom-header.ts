import { Component, signal } from '@angular/core';
import { Bar } from '@fundamental-ngx/ui5-webcomponents/bar';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Form } from '@fundamental-ngx/ui5-webcomponents/form';
import { FormItem } from '@fundamental-ngx/ui5-webcomponents/form-item';
import { Input } from '@fundamental-ngx/ui5-webcomponents/input';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Title } from '@fundamental-ngx/ui5-webcomponents/title';

@Component({
    selector: 'ui5-form-custom-header-sample',
    templateUrl: './custom-header.html',
    styles: `
        ui5-bar {
            box-shadow: none;
        }
    `,
    standalone: true,
    imports: [Form, FormItem, Label, Input, Bar, Title, Button]
})
export class FormCustomHeaderSample {
    formItems = signal([
        { id: 'field1', label: 'Name:', value: 'Red Point Stores' },
        { id: 'field2', label: 'ZIP Code/City:', value: '411 Maintown' },
        { id: 'field3', label: 'Street:', value: 'Main St 1618' },
        { id: 'field4', label: 'Country:', value: 'Germany' },
        { id: 'field5', label: 'WebSite:', value: 'sap.com' },
        { id: 'field6', label: 'Delivery Address:', value: 'Newtown' }
    ]);
}
