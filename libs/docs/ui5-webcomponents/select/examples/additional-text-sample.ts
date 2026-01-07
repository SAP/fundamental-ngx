import { Component } from '@angular/core';
import { Option } from '@fundamental-ngx/ui5-webcomponents/option';
import { Select } from '@fundamental-ngx/ui5-webcomponents/select';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-select-additional-text-sample',
    templateUrl: './additional-text-sample.html',
    standalone: true,
    imports: [Select, Option]
})
export class AdditionalTextSample {}
