import { Component } from '@angular/core';
import { ComboBox } from '@fundamental-ngx/ui5-webcomponents/combo-box';
import { ComboBoxItem } from '@fundamental-ngx/ui5-webcomponents/combo-box-item';

@Component({
    selector: 'ui5-combo-box-additional-text-sample',
    templateUrl: './additional-text.html',
    standalone: true,
    imports: [ComboBox, ComboBoxItem]
})
export class ComboBoxAdditionalTextSample {
    products = [
        { name: 'Laptop', code: 'LAP-001' },
        { name: 'Monitor', code: 'MON-002' },
        { name: 'Keyboard', code: 'KEY-003' },
        { name: 'Mouse', code: 'MOU-004' },
        { name: 'Headphones', code: 'HEA-005' }
    ];
}
