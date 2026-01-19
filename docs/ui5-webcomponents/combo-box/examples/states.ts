import { Component } from '@angular/core';
import { ComboBox } from '@fundamental-ngx/ui5-webcomponents/combo-box';
import { ComboBoxItem } from '@fundamental-ngx/ui5-webcomponents/combo-box-item';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-combo-box-states-sample',
    templateUrl: './states.html',
    standalone: true,
    imports: [ComboBox, ComboBoxItem]
})
export class ComboBoxStatesSample {
    countries = ['Argentina', 'Australia', 'Brazil', 'Canada', 'China'];
}
