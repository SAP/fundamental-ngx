import { Component, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { RangeSlider } from '@fundamental-ngx/ui5-webcomponents/range-slider';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-range-slider-disabled-sample',
    templateUrl: './disabled-sample.html',
    standalone: true,
    imports: [RangeSlider, Button]
})
export class DisabledSample {
    disabled = signal(false);

    toggleDisabled(): void {
        this.disabled.update((value) => !value);
    }
}
