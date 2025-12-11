import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base/types';
import { RangeSlider } from '@fundamental-ngx/ui5-webcomponents/range-slider';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-range-slider-step-tickmarks-sample',
    templateUrl: './step-tickmarks-sample.html',
    standalone: true,
    imports: [RangeSlider]
})
export class StepTickmarksSample {
    startValue = signal(18);
    endValue = signal(24);

    onInput(event: UI5WrapperCustomEvent<RangeSlider, 'ui5Input'>): void {
        this.startValue.set(event.currentTarget.startValue);
        this.endValue.set(event.currentTarget.endValue);
    }

    onChange(event: UI5WrapperCustomEvent<RangeSlider, 'ui5Change'>): void {
        this.startValue.set(event.currentTarget.startValue);
        this.endValue.set(event.currentTarget.endValue);
    }
}
