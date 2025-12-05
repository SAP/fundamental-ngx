import { Component } from '@angular/core';
import { Icon } from '@fundamental-ngx/ui5-webcomponents/icon';
import { OptionCustom } from '@fundamental-ngx/ui5-webcomponents/option-custom';
import { Select } from '@fundamental-ngx/ui5-webcomponents/select';

// Import icons
import '@ui5/webcomponents-icons/dist/employee.js';
import '@ui5/webcomponents-icons/dist/soccer.js';
import '@ui5/webcomponents/dist/OptionCustom.js';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-select-custom-options-sample',
    templateUrl: './custom-options-sample.html',
    styles: [
        `
            .optionContent {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
            }
        `
    ],
    standalone: true,
    imports: [Select, Icon, OptionCustom]
})
export class CustomOptionsSample {}
