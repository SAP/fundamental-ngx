import { Component } from '@angular/core';
import { NumberInput } from '@fundamental-ngx/ui5-webcomponents/number-input';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-number-input-states-sample',
    templateUrl: './states-sample.html',
    imports: [NumberInput]
})
export class StatesSample {}
