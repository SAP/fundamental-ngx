import { Component } from '@angular/core';
import { ComboBox } from '@fundamental-ngx/ui5-webcomponents/combo-box';
import { ComboBoxItem } from '@fundamental-ngx/ui5-webcomponents/combo-box-item';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-combo-box-filter-sample',
    templateUrl: './filter.html',
    standalone: true,
    imports: [ComboBox, ComboBoxItem]
})
export class ComboBoxFilterSample {
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
