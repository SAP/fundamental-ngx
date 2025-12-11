import { Component } from '@angular/core';
import { RadioButton } from '@fundamental-ngx/ui5-webcomponents/radio-button';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-radio-button-text-wrapping-sample',
    templateUrl: './text-wrapping-sample.html',
    standalone: true,
    imports: [RadioButton]
})
export class TextWrappingSample {}
