import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Option } from '@fundamental-ngx/ui5-webcomponents/option';
import { Select } from '@fundamental-ngx/ui5-webcomponents/select';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-select-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [Select, Option]
})
export class BasicSample {
    selectedCountry = signal('');

    onCountryChange(event: UI5WrapperCustomEvent<Select, 'ui5Change'>): void {
        this.selectedCountry.set(event.detail.selectedOption.value ?? '');
    }
}
