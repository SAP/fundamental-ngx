import { Component, signal } from '@angular/core';
import { ComboBox } from '@fundamental-ngx/ui5-webcomponents/combo-box';
import { ComboBoxItem } from '@fundamental-ngx/ui5-webcomponents/combo-box-item';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-combo-box-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [ComboBox, ComboBoxItem]
})
export class ComboBoxBasicSample {
    selectedValue = signal<string>('');

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
        'Mexico',
        'Spain',
        'United Kingdom',
        'United States'
    ];

    onChange(event: any): void {
        this.selectedValue.set(event.target.value);
    }
}
