import { NgStyle } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Option } from '@fundamental-ngx/ui5-webcomponents/option';
import { Select } from '@fundamental-ngx/ui5-webcomponents/select';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-select-disabled-readonly-sample',
    templateUrl: './disabled-readonly-sample.html',
    standalone: true,
    imports: [Select, Option, NgStyle]
})
export class DisabledReadonlySample {
    disabled = signal(true);
    readonly = signal(true);
}
