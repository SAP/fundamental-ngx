import { Component, signal } from '@angular/core';
import { RadioButton } from '@fundamental-ngx/ui5-webcomponents/radio-button';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-radio-button-value-state-sample',
    templateUrl: './value-state-sample.html',
    standalone: true,
    imports: [RadioButton]
})
export class ValueStateSample {
    selectedState = signal<string>('');

    onStateChange(state: string): void {
        this.selectedState.set(state);
    }
}
