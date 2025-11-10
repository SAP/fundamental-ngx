import { Component, computed, signal } from '@angular/core';
import { Form } from '@fundamental-ngx/ui5-webcomponents/form';
import { FormItem } from '@fundamental-ngx/ui5-webcomponents/form-item';
import { Input } from '@fundamental-ngx/ui5-webcomponents/input';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { SegmentedButton } from '@fundamental-ngx/ui5-webcomponents/segmented-button';
import { SegmentedButtonItem } from '@fundamental-ngx/ui5-webcomponents/segmented-button-item';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';
import { FormItemSpacing } from '@fundamental-ngx/ui5-webcomponents/types';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';

@Component({
    selector: 'ui5-form-edit-sample',
    templateUrl: './edit.html',
    standalone: true,
    imports: [Form, FormItem, SegmentedButton, SegmentedButtonItem, Text, Label, Input]
})
export class FormEditSample {
    readonly editable = signal(false);
    readonly itemSpacing = computed(() => (this.editable() ? FormItemSpacing.Normal : FormItemSpacing.Large));

    formItems = signal([
        { id: 'field1', label: 'Name:', value: 'Red Point Stores' },
        { id: 'field2', label: 'ZIP Code/City:', value: '411 Maintown' },
        { id: 'field3', label: 'Street:', value: 'Main St 1618' },
        { id: 'field4', label: 'Country:', value: 'Germany' },
        { id: 'field5', label: 'WebSite:', value: 'sap.com' },
        { id: 'field6', label: 'Delivery Address:', value: 'Newtown' }
    ]);

    toggleSelection(event: CustomEvent): void {
        if (event.detail.selectedItems[0].id === 'edit') {
            this.editable.set(true);
        } else {
            this.editable.set(false);
        }
    }
}
