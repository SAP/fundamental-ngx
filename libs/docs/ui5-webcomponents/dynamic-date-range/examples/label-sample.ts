import { Component, signal } from '@angular/core';
import { DynamicDateRange } from '@fundamental-ngx/ui5-webcomponents/dynamic-date-range';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';

import '@ui5/webcomponents/dist/dynamic-date-range-options/DateRange.js';
import '@ui5/webcomponents/dist/dynamic-date-range-options/Today.js';
import '@ui5/webcomponents/dist/dynamic-date-range-options/Tomorrow.js';
import '@ui5/webcomponents/dist/dynamic-date-range-options/Yesterday.js';
import 'fundamental-styles/dist/form-group.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-dynamic-date-range-label-sample',
    templateUrl: './label-sample.html',
    imports: [DynamicDateRange, Label]
})
export class LabelSample {
    options = signal('TODAY, TOMORROW, YESTERDAY, DATERANGE');
}
