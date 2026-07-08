import { Component, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { MultiComboBox } from '@fundamental-ngx/ui5-webcomponents/multi-combo-box';
import { MultiComboBoxItemCustom } from '@fundamental-ngx/ui5-webcomponents/multi-combo-box-item-custom';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

interface TravelDestination {
    city: string;
    country: string;
    value: string;
    flag: string;
    airportIcon: string;
    popular?: boolean;
}

@Component({
    selector: 'ui5-multi-combobox-custom-items-sample',
    templateUrl: './custom-items-sample.html',
    imports: [MultiComboBox, MultiComboBoxItemCustom]
})
export class MultiComboBoxCustomItemsSample {
    selectedCodes = signal<string[]>([]);

    destinations: TravelDestination[] = [
        { city: 'New York', country: 'USA', value: 'NYC', flag: '🇺🇸', airportIcon: '✈️', popular: true },
        { city: 'London', country: 'UK', value: 'LON', flag: '🇬🇧', airportIcon: '✈️', popular: true },
        { city: 'Tokyo', country: 'Japan', value: 'TYO', flag: '🇯🇵', airportIcon: '✈️', popular: true },
        { city: 'Paris', country: 'France', value: 'PAR', flag: '🇫🇷', airportIcon: '✈️' },
        { city: 'Berlin', country: 'Germany', value: 'BER', flag: '🇩🇪', airportIcon: '🚆' },
        { city: 'Sydney', country: 'Australia', value: 'SYD', flag: '🇦🇺', airportIcon: '🏖️', popular: true }
    ];

    /**
     * Use ui5-mcb-item-custom to create rich dropdown items
     * with complex layouts, multiple icons, images, or any HTML content.
     */
    onSelectionChange(event: UI5WrapperCustomEvent<MultiComboBox, 'ui5SelectionChange'>): void {
        const items = event.currentTarget.selectedItems || [];
        const codes = items.map((item) => item.text?.split(', ')[0] || '');
        this.selectedCodes.set(codes);
    }
}
