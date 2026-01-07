import { Component } from '@angular/core';
import { ComboBox } from '@fundamental-ngx/ui5-webcomponents/combo-box';
import { ComboBoxItem } from '@fundamental-ngx/ui5-webcomponents/combo-box-item';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-combo-box-value-state-sample',
    templateUrl: './value-state.html',
    standalone: true,
    imports: [ComboBox, ComboBoxItem]
})
export class ComboBoxValueStateSample {
    countries = ['Argentina', 'Australia', 'Brazil', 'Canada', 'China'];
}
