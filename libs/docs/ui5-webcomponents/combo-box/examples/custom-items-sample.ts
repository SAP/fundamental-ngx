import { Component, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { ComboBox } from '@fundamental-ngx/ui5-webcomponents/combo-box';
import { ComboBoxItemCustom } from '@fundamental-ngx/ui5-webcomponents/combo-box-item-custom';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

interface Destination {
    city: string;
    country: string;
    code: string;
    flag: string;
    airportIcon: string;
    popular?: boolean;
}

@Component({
    selector: 'ui5-combo-box-custom-items-sample',
    templateUrl: './custom-items-sample.html',
    imports: [ComboBox, ComboBoxItemCustom]
})
export class ComboBoxCustomItemsSample {
    selectedDestination = signal<string>('');

    destinations: Destination[] = [
        { city: 'New York', country: 'USA', code: 'NYC', flag: '🇺🇸', airportIcon: '✈️', popular: true },
        { city: 'London', country: 'UK', code: 'LON', flag: '🇬🇧', airportIcon: '✈️', popular: true },
        { city: 'Tokyo', country: 'Japan', code: 'TYO', flag: '🇯🇵', airportIcon: '✈️', popular: true },
        { city: 'Paris', country: 'France', code: 'PAR', flag: '🇫🇷', airportIcon: '✈️' },
        { city: 'Berlin', country: 'Germany', code: 'BER', flag: '🇩🇪', airportIcon: '🏢' },
        { city: 'Sydney', country: 'Australia', code: 'SYD', flag: '🇦🇺', airportIcon: '🚆', popular: true }
    ];

    onChange(event: UI5WrapperCustomEvent<ComboBox, 'ui5Change'>): void {
        this.selectedDestination.set(event.currentTarget.value);
    }
}
