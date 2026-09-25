import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Option } from '@fundamental-ngx/ui5-webcomponents/option';
import { OptionGroup } from '@fundamental-ngx/ui5-webcomponents/option-group';
import { Select } from '@fundamental-ngx/ui5-webcomponents/select';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-select-grouped-options-sample',
    templateUrl: './grouped-options-sample.html',
    imports: [Select, Option, OptionGroup]
})
export class GroupedOptionsSample {
    selectedCountry = signal('');

    onCountryChange(event: UI5WrapperCustomEvent<Select, 'ui5Change'>): void {
        this.selectedCountry.set(event.detail.selectedOption.value ?? '');
    }
}
