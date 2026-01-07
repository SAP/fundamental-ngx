import { Component } from '@angular/core';
import { ComboBox } from '@fundamental-ngx/ui5-webcomponents/combo-box';
import { ComboBoxItem } from '@fundamental-ngx/ui5-webcomponents/combo-box-item';

@Component({
    selector: 'ui5-combo-box-clear-icon-sample',
    templateUrl: './clear-icon.html',
    standalone: true,
    imports: [ComboBox, ComboBoxItem]
})
export class ComboBoxClearIconSample {
    countries = [
        'Argentina',
        'Australia',
        'Brazil',
        'Canada',
        'China',
        'France',
        'Germany',
        'India',
        'Italy',
        'Japan',
        'Great Britain'
    ];
}
