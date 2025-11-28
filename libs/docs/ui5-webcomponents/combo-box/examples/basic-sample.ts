import { Component, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
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

    onChange(event: UI5WrapperCustomEvent<ComboBox, 'ui5Change'>): void {
        this.selectedValue.set((event.target as any)?.value);
    }
}
