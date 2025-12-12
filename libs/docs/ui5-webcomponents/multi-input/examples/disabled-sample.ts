import { Component, signal } from '@angular/core';
import { MultiInput } from '@fundamental-ngx/ui5-webcomponents/multi-input';
import { Token } from '@fundamental-ngx/ui5-webcomponents/token';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-multi-input-disabled-sample',
    templateUrl: './disabled-sample.html',
    standalone: true,
    imports: [MultiInput, Token]
})
export class DisabledSample {
    disabledTokens = signal<string[]>(['Disabled', 'Token']);
    readonlyTokens = signal<string[]>(['ReadOnly', 'Token']);
}
